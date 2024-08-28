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
      font-size: 15px;
      top: -7px;
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

  let start = null;
  let end = null;

  function drawOnBar() {
    if (start === null && end === null) {
      startMark.hidden = endMark.hidden = true;
      return;
    }
    startMark.hidden = endMark.hidden = false;
    startMark.style.left = `${start * 100}%`;
    endMark.style.left = `${end * 100}%`;
  }

  function reset() {
    start = null;
    end = null;
    drawOnBar();
  }

  function setMarker(event) {
    const { x, width } = bar.getBoundingClientRect();
    const percent = (event.clientX - x) / width;

    if (start === null) {
      start = percent;
      startMark.style.left = `${start * 100}%`;
    } else {
      end = percent;
      if (start > end) {
        [start, end] = [end, start];
        startMark.style.left = `${start * 100}%`;
        endMark.style.left = `${end * 100}%`;
      }
      bar.removeEventListener("click", setMarker);
    }
    drawOnBar();
  }

  function startCapture() {
    startMark.hidden = endMark.hidden = false;
    bar.addEventListener("click", setMarker);
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

  function MenuItem({ title, onClick }) {
    return Spicetify.React.createElement(
      Spicetify.ReactComponent.MenuItem,
      { onClick },
      title
    );
  }

  const contextMenu = document.createElement("div");
  contextMenu.id = "best-moment-context-menu";
  contextMenu.style.position = "absolute";
  contextMenu.hidden = true;
  document.body.appendChild(contextMenu);

  function openContextMenu(event) {
    const { x, y } = event;
    contextMenu.style.transform = `translate(${x}px, ${y}px)`;
    contextMenu.hidden = false;
    event.preventDefault();
  }

  function closeContextMenu() {
    contextMenu.hidden = true;
  }

  function createMenu() {
    const menu = Spicetify.React.createElement(
      "ul",
      { className: "main-contextMenu-menu" },
      Spicetify.React.createElement(MenuItem, {
        title: "Best Moment: Capture",
        onClick: () => {
          closeContextMenu();
          startCapture();
        },
      }),
      Spicetify.React.createElement(MenuItem, {
        title: "Best Moment: Reset",
        onClick: () => {
          closeContextMenu();
          reset();
        },
      })
    );

    Spicetify.ReactDOM.render(menu, contextMenu);
  }

  createMenu();

  bar.oncontextmenu = openContextMenu;
  window.addEventListener("click", closeContextMenu);

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
              startCapture();
            }}
          >
            Capture
          </button>
          <button
            className="custom-button"
            onClick={() => {
              Spicetify.PopupModal.hide();
              reset();
            }}
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
}

export default main;
