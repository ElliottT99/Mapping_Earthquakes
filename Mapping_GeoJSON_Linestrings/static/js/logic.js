console.log("yo whaszzzzuuupppp?");

// Create the map object with center and zoom level.
//let map = L.map('mapid').setView([30, 30], 2);
//let map = L.map('mapid').setView([40.7, -94.5], 4);



// We create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  Light: light,
  Dark: dark
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [44.0, -80.0],
  zoom: 2,
  layers: [light]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
let torontoData = "https://raw.githubusercontent.com/ElliottT99/Mapping_Earthquakes/main/torontoRoutes.json";

// Create a style for the lines.
let myStyle = {
  color: "#ffffa1",
  weight: 2
}

// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
/*
L.geoJson(data, {
  onEachFeature: function(feature, layer){
    layer.bindPopup("<h2>Airport Code: "+ feature.properties.faa + "</h2> <hr> <h3>Airport name: " + feature.properties.name + "</h3>")
  }})
.addTo(map);
*/
L.geoJson(data, {
  style: myStyle,
  onEachFeature: function(feature, layer){
    layer.bindPopup("<h2>Airline: "+ feature.properties.airline + "</h2> <hr> <h3>Destination: " + feature.properties.dst + "</h3>")
  }
}).addTo(map);
});

// Then we add our 'graymap' tile layer to the map.
light.addTo(map);
