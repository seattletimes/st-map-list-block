/******/ (() => { // webpackBootstrap
/*!***************************************!*\
  !*** ./src/st-map-list-block/view.js ***!
  \***************************************/
/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */

document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('generate-btn');
  const result = document.getElementById('result');
  if (button) {
    button.addEventListener('click', function () {
      const randomNum = Math.floor(Math.random() * 100);
      result.textContent = randomNum;
      console.log('Generated:', randomNum);
    });
  }
});

// console.log("data-sheet-id", block.data-sheet-id)
const myData = document.getElementById("my-data");
const sheetId = myData.getAttribute('data-sheet-id');
const sheetName = 'map-module'; // or your actual tab name
const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?sheet=${sheetName}`;

// console.log("myData:", myData)
// console.log("DATA SHEET ID:", sheetId)
// console.log("url", url)

// clean json
fetch(url).then(response => response.text()).then(text => {
  const jsonText = text.substring(47, text.length - 2);
  const json = JSON.parse(jsonText);
  // console.log(json);

  const rows = json.table.rows;
  const headers = json.table.cols.map(col => col.label);

  // console.log(rows)
  const data = json.table.rows.map(r => {
    const obj = {};
    headers.forEach((header, i) => {
      var _r$c$i$v;
      obj[header] = (_r$c$i$v = r.c[i]?.v) !== null && _r$c$i$v !== void 0 ? _r$c$i$v : '';
    });
    return obj;
  });

  // console.log("clean data", data);
  // console.log(data[1].name);
  // console.log(data.length);
  addMarkers(data);
  addSidebarItem(data);
});
const map = L.map('map');
map.setView([47.6108, -122.3307], 11);
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  crossOrigin: 'anonymous'
}).addTo(map);
let markersArray = [];

// L.marker([47.661269, -122.342919], {
//   title: "Meowtropolitan Cafe",
// }).bindPopup('<h2>Meowtropolitan Cafe</h2>').addTo(map)

// // Populate sidebar

function addSidebarItem(locations) {
  sidebar = document.getElementById("sidebar-ul");
  for (let i = 0; i < locations.length; i++) {
    var listItem = document.createElement("li");
    listItem.dataset.index = i;
    listItem.dataset.place = locations[i].name;
    listItem.classList.add("sidebar-li");
    sidebar.appendChild(listItem);

    // Location title
    var listItemTitle = document.createElement("h3");
    listItemTitle.classList.add("place-title");
    listItem.appendChild(listItemTitle);
    listItemTitle.innerText = locations[i].name;

    // Location details
    var listItemDetails = document.createElement("p");
    listItem.appendChild(listItemDetails);
    listItemDetails.innerText = locations[i].address;
  }
}
function addMarkers(data) {
  markersArray = data.map(item => {
    const marker = L.circleMarker([item.lat, item.long], {
      radius: 8,
      // Size of the circle
      fillColor: "#a1bca7",
      color: "#6a9c75",
      // Border color
      weight: 2,
      // Border width
      opacity: 1,
      fillOpacity: 0.7,
      title: item.name
    }).bindPopup(`<p class="popup-title">${item.name}</p>
        <div class="popup-details">
        ${item.blurb ? `<p>${item.blurb}</p>` : ''}
        ${item.address ? `<p>${item.address}</p>` : ''}
        ${item.price ? `<p>${item.price}</p>` : ''}
        ${item.website ? `<a href="${item.website}">Website</a>` : ''}
        </div>`).addTo(map);

    // click listener
    marker.on("click", function (e) {
      const clickedMarker = e.target; // currently clicked marker
      clickedMarker.openPopup(); // open popup

      const clickedListItem = document.querySelector(`.sidebar-li[data-place="${item.name}"]`); // find list item with same. name

      document.querySelectorAll('.sidebar-li').forEach(item => item.classList.remove('active'));
      clickedListItem.classList.add("active");
      // clickedListItem.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
      // console.log("listItem- marker function", clickedListItem)
      const listItemTop = clickedListItem.offsetTop;
      // console.log("listItemTop", listItemTop)
      // console.log("listItemTop bounding client rect", clickedListItem.getBoundingClientRect().top)

      const mapSidebar = document.getElementById('map-sidebar');
      const sidebarRect = mapSidebar.getBoundingClientRect();
      const listItemRect = clickedListItem.getBoundingClientRect();
      const mapContainer = document.getElementById('map-container');
      // console.log("mapContainer bounding client rect top", mapContainer.getBoundingClientRect().top);
      // console.log("mapContainer offsettop", mapContainer.offsetTop);

      const scrollAmount = listItemRect.top - mapContainer.top;
      // console.log("scrollAmount", scrollAmount)
      // console.log("mapSidebar bounding client rect top", mapSidebar.getBoundingClientRect().top)
      // console.log("mapContainer bounding client rect top", mapContainer.getBoundingClientRect().top)

      // Scroll the sidebar (not the whole page)
      // mapSidebar.scrollTo({
      //   top: scrollAmount,
      //   behavior: 'smooth'
      // });

      clickedListItem.scrollIntoView({
        block: "center",
        behavior: "smooth"
      });
    });
    return {
      name: item.name,
      marker
    };
  });
}

// Handle user interaction
function onListItemClick(e) {
  const listItem = e.target.closest('.sidebar-li');
  if (!listItem) return; // if you click somewhere besides a list item, do nothing
  // console.log("listItem", listItem)

  // if list item is clicked, remove active class from everything and add it to the one that was clicked  
  document.querySelectorAll('.sidebar-li').forEach(item => item.classList.remove('active'));
  listItem.classList.add('active');

  // Get list item placename 
  const placeName = listItem.dataset.place;
  console.log("active item:", placeName);
  map.closePopup();

  // Find the corresponding marker and open its popup
  const match = markersArray.find(m => m.name === placeName);
  if (match) {
    match.marker.openPopup();
  }
}
window.addEventListener("click", onListItemClick);
/******/ })()
;
//# sourceMappingURL=view.js.map