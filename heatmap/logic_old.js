// Creating our initial map object:
// We set the longitude, latitude, and starting zoom level.
// This gets inserted into the div with an id of "map".
let myMap = L.map("map", {
  center: [38.5820, -96.4617],
  zoom: 5.49
});

// Adding a tile layer (the background map image) to our map:
// We use the addTo() method to add objects to our map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


// Define a markerSize() function that will give each inmate a different radius based on their Age.
function markerSize(Age) {
  return Math.sqrt(Age) * 705000;
}


function markerColor(Method) {
  let color = "";
  if (Method == "Electrocution") {
    color = "yellow";
  } else if (Method == "Firing Squad") {
    color = "blue";
  } else if (Method == "Gas Chamber") {
    color = "green";
  } else if (Method == "Hanging") {
    color = "red";
  } else {
    color = "violet";
  }

  return color;
}


// Loop through the inmates in data_fixed.js array
for (let i = 0; i < fixed_coors.length; i++) {
  let inmate = fixed_coors[i];

  console.log(inmate.Name);
  console.log(markerSize(inmate.Age));

  // create circle
  L.circle(inmate.Coordinates, {
    fillOpacity: 0.75,
    color: "red",
    fillColor: markerColor(inmate.Age),
    radius: markerSize(inmate.Age)
  }).bindPopup(`<h1>${inmate.Name}</h1> <hr> <h3>Age: $${inmate.Age.toLocaleString()}</h3>`).addTo(myMap);
}













