//create map in leaflet and tie it to the div called 'theMap'
let config = {
  minZoom: 7,
  maxZoom: 18,
};
let zoom = 16;
var map = L.map("theMap", config).setView([44.650627, -63.59714], zoom);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

let selectedTrip = {}; //the trip selected from selector
let busRuningData = {}; //bus running data fetch from online
let tripsRuning = []; //trip shape points
let tripSelected = -1; //

const geoShape = {
  type: "FeatureCollection",
  generator: "Jerry Ren",
  copyright:
    "The data included in this document is made by Jerry Ren fetched from Halifax Transit.",
  features: [],
};
let shapePoints = [];
const geoStop = {
  type: "FeatureCollection",
  generator: "Jerry Ren",
  copyright:
    "The data included in this document is made by Jerry Ren fetched from Halifax Transit.",
  features: [],
};

const transLatLonToFeature = (lat, lon) => {
  const template_Feature = {
    type: "Feature",
    id: "node/500129236",
    properties: {
      name: "template'",
    },
    geometry: {
      type: "Point",
      coordinates: [21.0, 52.0],
    },
  };
  template_Feature.geometry.coordinates = [lat, lon];
  return template_Feature;
};

let oldLat = 0;
let timerCount = 0;

const funny = L.icon({
  iconUrl: "./bus.png",
  iconSize: [25, 25], // size of the icon
  iconAnchor: [12.5, 12.5], // changed marker icon position
  popupAnchor: [0, 0], // changed popup position
});

const busLocation = []; //the bus selected by active trip, here store its location list
let lastTripSelected = -1;
const runningBusMarkerArr = [];
let vehicleInfo={};
const customPopup = (vehicleInfo)=>{ return`
<div class="customPopup">
    <ul class="tabs-e" data-tabs>
      <li><a data-tabby-default href="#static-data">Static Data</a></li>
      <li><a href="#running-data">Running Data</a></li>
    </ul>
    <div id="static-data">
      <div>
        <label>Vehicle Id:</label>
        <label>${vehicleInfo.vehicle.vehicle.id}</label>
      </div>
      <div>
        <label>Vehicle Label:</label>
        <label>${vehicleInfo.vehicle.vehicle.label}</label>
      </div>
      <div>
        <label>Trip Id:</label>
        <label>${vehicleInfo.vehicle.trip.tripId}</label>
      </div>
    </div>
    <div id="running-data">
      <div>
        <label>Location Latitude:</label>
        <label>${vehicleInfo.vehicle.position.latitude}</label>
      </div>
      <div>
        <label>Location Longitude:</label>
        <label>${vehicleInfo.vehicle.position.longitude}</label>
      </div>
    </div>
</div>`}

// specify popup options
const customOptions = {
  minWidth: "220", // set max-width
  keepInView: true, // Set it to true if you want to prevent users from panning the popup off of the screen while it is open.
};
const renderMap = function (dataFiltered) {
  // console.log(tripSelected);
  if (tripSelected == -1) return;
  if (lastTripSelected != tripSelected) {
    //Changed trip, refresh show elements
    runningBusMarkerArr.map((m) => map.removeLayer(m));
    busLocation.length = 0;
  }

  lastTripSelected = tripSelected;
  const { latitude, longitude } = dataFiltered[0].vehicle.position;
  // console.dir(dataFiltered[0])
  vehicleInfo=dataFiltered[0]
  timerCount++;
  if (oldLat != latitude) {
    busLocation.push([latitude, longitude]);
    if (busLocation.length < 2) return;
    setTimerVisibility("visible");
    aMarker = L.marker([latitude, longitude], { icon: funny });
    map.addLayer(aMarker);
    map.setView(aMarker.getLatLng(), zoom);
    runningBusMarkerArr.push(aMarker);
    aMarker.bindPopup(customPopup(vehicleInfo), customOptions).on("click", runTabs);
    function runTabs() {
      const tabs = new Tabby("[data-tabs]");
    }
    adjustMarker(aMarker);

    lastTripSelected = tripSelected;
    oldLat = latitude;
    console.log("timerCount:", timerCount);
    timerCount = 0;
  }
};

function adjustMarker(aMarker) {
  const arrLen = busLocation.length;
  const P1 = busLocation[arrLen - 1];
  const P2 = busLocation[arrLen - 2];
  const angle = (Math.atan((P1[1] - P2[1]) / (P1[0] - P2[0])) / Math.PI) * 180;
  console.log("angle:", angle);
  const add180 = P1[1] - P2[1] > 0 ? 0 : 0;
  if (angle) aMarker.options.rotationAngle = angle + add180;
  aMarker.update();
}

const fetchData = async () => {
  // const url = "https://hrmbuses.azurewebsites.net";
  const url = "https://hrmbusapi.onrender.com/";
  const data = await fetch(url).then((p) => p.json());
  busRuningData = data.entity;
  tripsRuning = busRuningData.map((p) => 1 * p.vehicle.trip.tripId);
  // console.log("tripRunning", tripsRuning);
  return data.entity;
};

const filterData = async (data) => {
  const dataFiltered = data.filter(
    (p) => p.vehicle.trip.tripId == tripSelected
  );
  return dataFiltered;
};

const step = async () => {
  const data = await fetchData();
  // console.log("realData", data);
  const dataFiltered = await filterData(data);

  renderMap(dataFiltered);
};

step();

async function fetchBusData(
  url,
  optionsObj = { "Content-Type": "application/json" }
) {
  const dataRows = await fetch(url, {
    method: "get",
    headers: optionsObj,
  }).then((p) => p.json());
  return dataRows;
}

async function fillBusHeadSign() {
  const data = await fetchBusData(
    "http://localhost:8090/busTrip/all_bus_trip_headsign"
  );
  for (const d of data) {
    const url = `http://localhost:8090/busTrip/get_trip_ids_from_headsign?headsign=${d.DISTINCT}`;
    const rzlt = await fetch(url).then((p) => p.json());
    const trip_list_related = rzlt.map((p) => p.trip_id); //tripsRuning
    d.hasActiveTrip = false;
    for (let tripId of trip_list_related) {
      if (tripsRuning.includes(tripId)) {
        d.hasActiveTrip = true;
        break;
      }
    }
  }
  // console.dir(data)
  return data;
}

new Autocomplete("input-head-sign", {
  cache: true,
  selectFirst: true,

  onSearch: async ({ currentValue }) => {
    let places = []; // array of places

    places = await fillBusHeadSign();

    // console.dir(places);
    // filter places by currentValue
    return places
      .sort((a, b) => a.DISTINCT.localeCompare(b.DISTINCT))
      .filter((element) =>
        element.DISTINCT.match(new RegExp(currentValue, "i"))
      );
  },

  // render the list of places
  onResults: ({ currentValue, matches, template }) => {
    // checking if we have results if we don't
    // take data from the noResults method

    return matches === 0
      ? template
      : matches
          .map((element) => {
            // console.log(element)
            const isActive = element.hasActiveTrip
              ? "has-active-trip"
              : "no-active-trip";
            return `
              <li class="place ${isActive}">
                <div>${element.DISTINCT.replace(
                  new RegExp(currentValue, "i"),
                  (str) => `<mark>${str}</mark>`
                )}</div>
              </li> `;
          })
          .join("");
  },

  // fly to the place and open popup
  onSubmit: async ({ object }) => {
    // console.dir(object.DISTINCT);
    const url = `http://localhost:8090/busTrip/get_trip_ids_from_headsign?headsign=${object.DISTINCT}`;
    const rzlt = await fetch(url).then((p) => p.json());
    const optionSelTag = document.getElementById("trip-id");
    while (optionSelTag.firstChild)
      optionSelTag.removeChild(optionSelTag.firstChild);
    let hasOption = false;
    rzlt.forEach((p) => {
      // console.log(tripsRuning.includes(p.trip_id))
      if (tripsRuning.includes(p.trip_id)) {
        const optionTag = document.createElement("option");
        optionSelTag.appendChild(optionTag);
        optionTag.value = p.trip_id;
        optionTag.innerHTML = p.trip_id;
        hasOption = true;
      } else {
      }
    });
    if (hasOption) {
      const tripSelectTag = document.getElementById("trip-id");
      const event = new Event("change");
      tripSelectTag.dispatchEvent(event);
    } else {
      alert("No avtive trip is running on this route!");
    }
  },

  // no results
  noResults: ({ currentValue, template }) =>
    template(`<li>No results found: "${currentValue}"</li>`),
});

const execSelectedTripID = async (tripId) => {
  const url = `http://localhost:8090/shape/get-shapes?tripId=${tripId}`;
  const rzlt = await fetch(url).then((p) => p.json());
  geoShape.features = [];
  shapePoints = [];
  rzlt.forEach((p) => {
    shapePoints.push([p.shape_pt_lat, p.shape_pt_lon]);
    transLatLonToFeature(
      geoShape.features.push(p.shape_pt_lat, p.shape_pt_lon)
    );
  });
  // let group = new L.featureGroup(shapePoints);
  map.fitBounds(shapePoints, {
    padding: [50, 50], // adding padding to map
  });
  console.log("Shape GeoJson:", geoShape);
  tripSelected = tripId;
  step();
  setInterval(step, 7000);
  setTimerVisibility('visible')
  // console.log("tripId", tripId);
};

let timer30s = 30;
const addTimer30s = () => {
  const timerTag = document.getElementById("timer-30s");
  timerTag.innerHTML = `<span>${timer30s}s</span>`;
  // timerTag.innerHTML=`<span class="tooltip"><span class="tooltiptext">Bus will refresh in </span>${timer30s}s</span>`
  timer30s--;
  if (timer30s < 0) timer30s = 0;
};
setInterval(addTimer30s, 1000);
setTimerVisibility("hidden");
function setTimerVisibility(val) {
  timer30s = 30;
  const timerTag = document.getElementById("timer-30s");
  timerTag.style.visibility = val;
}

let selRouteShape = {};
const AddListenEvents = () => {
  const tripSelectTag = document.getElementById("trip-id");
  // console.dir(tripSelectTag);
  const selectTripId = async () => {
    await execSelectedTripID(tripSelectTag.value);
    map.removeLayer(selRouteShape);
    selRouteShape = L.polyline(shapePoints, {
      color: "blue",
      opacity: 0.5,
      weight: 10,
    });
    selRouteShape.bindPopup(
      `<h2>Trip ID: <span style="color:red"> ${tripSelectTag.value}</span></h2>`
    );
    selRouteShape.addTo(map);
  };
  tripSelectTag.addEventListener("change", selectTripId);
};

AddListenEvents();
