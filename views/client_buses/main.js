//create map in leaflet and tie it to the div called 'theMap'
var map = L.map("theMap").setView([44.650627, -63.59714], 12);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

let oldLat = 0;
let timerCount=0;
const renderMap = function (dataFiltered) {
  console.log(dataFiltered[0].vehicle.position);
  const { latitude, longitude } = dataFiltered[0].vehicle.position;
  timerCount++
  if (oldLat != latitude) {
    L.marker([latitude, longitude]).addTo(map).openPopup('Bus is here');
    oldLat = latitude;
    console.log("timerCount:",timerCount)
    timerCount=0;
  }
  //   L.marker([44.65069, -63.596537]).addTo(map)
};

const fetchData = async () => {
  const url = "https://hrmbuses.azurewebsites.net";
  const data = await fetch(url).then((p) => p.json());

  return data.entity;
};

const filterData = async (data) => {
  const dataFiltered = data.filter((p) => p.vehicle.vehicle.id == 2735);
  return dataFiltered;
};

const step = async () => {
  const data = await fetchData();
  const dataFiltered = await filterData(data);

  renderMap(dataFiltered);
};

step();
setInterval(step,28000);
