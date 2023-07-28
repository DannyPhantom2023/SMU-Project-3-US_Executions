


  
  function doWork() {
    
    // make request to flask
    // d3.json(url).then(function (data) {
    //   console.log(data);
    //   });
    console.log(fixed_coors);
    createMap(fixed_coors);
  }
  
  function createMap(data) {
  
    // STEP 1: CREATE THE BASE LAYERS
  
    // Create the base layers.
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
  
    // STEP 2: CREATE THE OVERLAY LAYERS
  
    // function markerColor(Method) {
    //   let color = "";
    //   if (Method == "Electrocution") {
    //     color = "yellow";
    //   } else if (Method == "Firing Squad") {
    //     color = "blue";
    //   } else if (Method == "Gas Chamber") {
    //     color = "green";
    //   } else if (Method == "Hanging") {
    //     color = "red";
    //   } else {
    //     color = "violet";
    //   }
    
    //   return color;
    // }



    // Create an overlays object.
    let markers = L.markerClusterGroup();
    let coords = [];
    for (let i = 0; i < data.length; i++){
        let inmate = data[i];
        let location = inmate.Coordinates;
  
      if (location) {
        let coord = location;
        let marker = L.marker(coord).bindPopup(`${inmate.Name}<hr>${inmate.Age}`);
        markers.addLayer(marker);
  
        coords.push(coord);
      }
    }
  
    // create heatmap layer
    let heatLayer = L.heatLayer(coords, {
      radius: 25,
      blur: 2
    });
  

  
    // STEP 3: Build the Layer Controls
  
    // Create a baseMaps object.
    let baseMaps = {
      "Street Map": street,
      "Topographic Map": topo
    };
  
    let overlayMaps = {
      "Executions": markers,
      "Heat Map": heatLayer
    };
  
    // STEP 4: Init the Map
  
    // Create a new map.
    // Edit the code to add the earthquake data to the layers.
    let myMap = L.map("map", {
      center: [38.5820, -96.4617],
      zoom: 5.49,
      layers: [street, markers]
    });
  
    // STEP 5: Add the Layer Controls/Legend to the map
    // Create a layer control that contains our baseMaps.
    // Be sure to add an overlay Layer that contains the earthquake GeoJSON.
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);
  }
  
 
  // on page load
  doWork();
  