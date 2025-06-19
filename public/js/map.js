var key = mapToken; //Insert your LocationIQ access token here

var styleJson =
  "https://tiles-staging.locationiq.com/v3/streets/vector.json?key=" + key;

const map = new ol.Map({
  target: "map",
  view: new ol.View({
    center: ol.proj.fromLonLat([long, lat]),
    zoom: 12,
  }),
});

var marker = new ol.Feature({
  geometry: new ol.geom.Point(ol.proj.fromLonLat([long, lat])),
  name: "marker",
});

//to enhance style and add icon to the map
marker.setStyle(
  new ol.style.Style({
    image: new ol.style.Icon({
      scale: 0.5, //scale to adjust the proportion of the icon
      src: "https://tiles.locationiq.com/static/images/marker.png", //link of the icon
    }),
  })
);

//Let’s include the markers and create a vector source with it
var vectorSource = new ol.source.Vector({
  features: [marker],
});

//Let’s create a vector layer, with a source created above
var vectorLayer = new ol.layer.Vector({
  source: vectorSource,
  zIndex: 1,
});

map.addLayer(vectorLayer);

olms.apply(map, styleJson);
console.log(mapToken);