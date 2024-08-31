(async()=>{for(;!Spicetify.React||!Spicetify.ReactDOM;)await new Promise(e=>setTimeout(e,10));var e=Object.create,r=Object.defineProperty,i=Object.getOwnPropertyDescriptor,l=Object.getOwnPropertyNames,t=Object.getPrototypeOf,c=Object.prototype.hasOwnProperty;n={"external-global-plugin:react"(e,t){t.exports=Spicetify.React}},o=function(){return a||(0,n[l(n)[0]])((a={exports:{}}).exports,a),a.exports}(),e=null!=o?e(t(o)):{};var n,a,o,d,m=((t,n,a,o)=>{if(n&&"object"==typeof n||"function"==typeof n)for(let e of l(n))c.call(t,e)||e===a||r(t,e,{get:()=>n[e],enumerable:!(o=i(n,e))||o.enumerable});return t})(!d&&o&&o.__esModule?e:r(e,"default",{value:o,enumerable:!0}),o),s=async function e(){var r=document.querySelector(".playback-bar .progress-bar");if(r&&Spicetify.React){var i=document.createElement("style");i.innerHTML=`
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
  `,document.head.appendChild(i);let e=document.createElement("div"),t=(e.id="best-moment-start",e.innerText="[",document.createElement("div")),n=(t.id="best-moment-end",t.innerText="]",e.style.position=t.style.position="absolute",e.hidden=t.hidden=!0,r.append(e),r.append(t),null),a=null,o=0;function l(){null===n&&(e.hidden=!0),null===a&&(t.hidden=!0),null!==n&&(e.hidden=!1,e.style.left=100*n+"%"),null!==a&&(t.hidden=!1,t.style.left=100*a+"%")}function c(){n=a=null,l()}Spicetify.Player.addEventListener("onprogress",e=>{o?1e3<e.timeStamp-o&&(o=0):null===n&&null===a||(e=Spicetify.Player.getProgressPercent(),null!==n&&e<n?Spicetify.Player.seek(n):null!==a&&e>=a&&(c(),Spicetify.Player.next()))}),Spicetify.Player.addEventListener("songchange",e=>{c();var t=Spicetify.Platform.LocalStorageAPI.getItem(e.data.item.uid+"-best-moment-start"),e=Spicetify.Platform.LocalStorageAPI.getItem(e.data.item.uid+"-best-moment-end");"number"==typeof t&&(n=t),"number"==typeof e&&(a=e),l()}),new Spicetify.Playbar.Widget("Best Moment","clock",()=>{var e=()=>m.default.createElement("div",null,m.default.createElement("button",{className:"custom-button",onClick:()=>{var e;Spicetify.PopupModal.hide(),e=Spicetify.Player.getProgressPercent(),null!==a&&e>a||(n=e,Spicetify.Platform.LocalStorageAPI.setItem(Spicetify.Player.data.item.uid+"-best-moment-start",n),l())}},"Set start"),m.default.createElement("button",{className:"custom-button",onClick:()=>{var e;Spicetify.PopupModal.hide(),e=Spicetify.Player.getProgressPercent(),null!==n&&e<n||(a=e,Spicetify.Platform.LocalStorageAPI.setItem(Spicetify.Player.data.item.uid+"-best-moment-end",a),l())}},"Set end"),m.default.createElement("br",null),m.default.createElement("button",{className:"custom-button",onClick:()=>{Spicetify.PopupModal.hide(),Spicetify.Platform.LocalStorageAPI.clearItem(Spicetify.Player.data.item.uid+"-best-moment-start"),Spicetify.Platform.LocalStorageAPI.clearItem(Spicetify.Player.data.item.uid+"-best-moment-end"),c()},style:{backgroundColor:"#b10f1d"}},"Reset")),t=document.createElement("div");Spicetify.ReactDOM.render(m.default.createElement(e,null),t),(e=document.createElement("style")).innerHTML=`
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
        `,document.head.appendChild(e),Spicetify.PopupModal.display({title:"Best Moment",content:t})},!1,!1).register()}else setTimeout(e,100)};(async()=>{await s()})()})();