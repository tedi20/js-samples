import html2canvas from "html2canvas";

/**
 * @license
 * Copyright 2021 Google LLC.
 * SPDX-License-Identifier: Apache-2.0
 */

function downloadPhoto(url) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'blob';

  xhr.onload = function() {
    if (xhr.status === 200) {
      var blob = xhr.response;
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'photo.jpg';

      // Диспетчеризація події "click" для посилання
      var clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      });
      link.dispatchEvent(clickEvent);
    }
  };

  xhr.send();
}

function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      center: {
        lat: 48.62,
        lng: 22.28,
      },
      zoom: 14,
      mapId: "90f87356969d889c",
    }
  );
  let position = {
    lat: 48.62,
    lng: 22.28,
  }
  // const[marker, setMarker] = useState(null);

  const pointDiv = document.createElement("div");
  const pointUI = document.createElement("img");
  pointUI.width = 25;
  pointUI.height = 40;
  pointUI.style.marginBottom = "40px";
  pointUI.src="marker.png";
  pointDiv.appendChild(pointUI);
  map.controls[google.maps.ControlPosition.CENTER].push(pointDiv);



  //
  const controlDiv = document.createElement("div");
  const controlUI = document.createElement("button");
  controlUI.classList.add("ui-button");
  controlUI.innerText = `Загрузити`;
  controlUI.addEventListener("click", () => {
    adjustMap();
  });
  controlDiv.appendChild(controlUI);
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(controlDiv);
let cnt = 0;
  const adjustMap = function () {
    let position = map.getCenter();
    const url = `https://maps.googleapis.com/maps/api/staticmap?center=${position!.lat()},${position!.lng()}&size=640x640&zoom=${map.getZoom()}&maptype=terrain&key=AIzaSyCKaQFawb4S96ARx1w188cJrPU0Q5h8KfI`;
    downloadPhoto(url);
  };
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
