import React from "react";

async function main() {
  const bar = document.querySelector(".playback-bar .progress-bar");
  if (!(bar && Spicetify.React)) {
    setTimeout(main, 100);
    return;
  }

  const style = document.createElement("style");
  style.innerHTML = `
  #best-moment-start, #best-moment-end {
      position: absolute;
      font-weight: bolder;
      font-size: 16px;
      top: -6px;
  }
  
  #best-moment-start {
      color: #1dcd5b;
  }

  #best-moment-end {
      color: #e64a19;
  }
  `;
  document.head.appendChild(style);

  const startMark = document.createElement("div");
  startMark.id = "best-moment-start";
  startMark.innerText = "[";
  const endMark = document.createElement("div");
  endMark.id = "best-moment-end";
  endMark.innerText = "]";
  startMark.style.position = endMark.style.position = "absolute";
  startMark.hidden = endMark.hidden = true;

  bar.append(startMark);
  bar.append(endMark);

  let start: number | null = null;
  let end: number | null = null;

  function drawOnBar() {
    if (start === null) startMark.hidden = true;
    if (end === null) endMark.hidden = true;

    if (start !== null) {
      startMark.hidden = false;
      startMark.style.left = `${start * 100}%`;
    }
    if (end !== null) {
      endMark.hidden = false;
      endMark.style.left = `${end * 100}%`;
    }
  }

  function reset() {
    start = null;
    end = null;
    drawOnBar();
  }

  function setStart() {
    let percent = Spicetify.Player.getProgressPercent()
    if (end !== null && percent > end) {
      return;
    }
    start = percent;
    drawOnBar();
  }

  function setEnd() {
    let percent = Spicetify.Player.getProgressPercent()
    if (start !== null && percent < start) {
      return;
    }
    end = percent;
    drawOnBar();
  }

  Spicetify.Player.addEventListener("onprogress", () => {
    if (start !== null && end !== null) {
      const percent = Spicetify.Player.getProgressPercent();
      if (percent < start) {
        Spicetify.Player.seek(start);
      } else if (percent >= end) {
        Spicetify.Player.next();
      }
    }
  });

  Spicetify.Player.addEventListener("songchange", reset);

  const widget = new Spicetify.Playbar.Widget(
    "Best Moment",
    "clock",
    () => {
      const ModalContent = () => (
        <div>
          <button
            className="custom-button"
            onClick={() => {
              Spicetify.PopupModal.hide();
              setStart();
            }}
          >
            Set start
          </button>
          <button
            className="custom-button"
            onClick={() => {
              Spicetify.PopupModal.hide();
              setEnd();
            }}
          >
            Set end
          </button>
          <br />
          <button
            className="custom-button"
            onClick={() => {
              Spicetify.PopupModal.hide();
              reset();
            }}
            style={{ backgroundColor: "#b10f1d" }}
          >
            Reset
          </button>
        </div>
      );

      const container = document.createElement("div");
      Spicetify.ReactDOM.render(<ModalContent />, container);

      const style = document.createElement("style");
      style.innerHTML = `
            .custom-button {
                padding: 8px 16px;
                border: none;
                border-radius: 50px;
                background-color: #1DB954;
                color: #FFFFFF;
                cursor: pointer;
                font-size: 14px;
                margin-right: 10px;
                margin-top: 8px;
            }
        `;
      document.head.appendChild(style);

      Spicetify.PopupModal.display({
        title: 'Best Moment',
        content: container,
      });
    },
    false,
    false
  );

  widget.register();
}

export default main;
