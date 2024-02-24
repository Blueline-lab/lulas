var toner = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          opacity: 1.0,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          maxZoom: 20
        });        
        
var satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          opacity: 0.2,
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        });
                
var mapdata = L.tileLayer('/tiles/{z}/{x}/{y}.png', {
            minZoom: 1,
            maxZoom: 20,
            attribution: 'Map Data'
        });

var map = L.map('map', {
          center: [48.866667, 2.333333],
          zoom: 3,
          minZoom: 1,
          maxZoom: 20,
          layers: [toner]
        });

var baseMaps = {
            "Terrain": toner,
            "Satellite": satellite
        };

var overlayMaps = {
          "Data": mapdata
        };

L.control.layers(baseMaps, overlayMaps).addTo(map);




document.getElementById('map').style.cursor = 'crosshair';


map.on('click', (event)=> {
  console.log(event.latlng.lat , event.latlng.lng);
  window.open('http://localhost:8080/charter/' + String(event.latlng.lat) +'/'+ String(event.latlng.lng));

})

var legend = L.control({ position: "bottomright" });
var legend2 = L.control({ position: "bottomleft" });
legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Ping Level</h4>";
  div.innerHTML += '<i style="background: #46cd10"></i><span>0-30</span><br>';
  div.innerHTML += '<i style="background: #5dade2"></i><span>30-60</span><br>';
  div.innerHTML += '<i style="background: #035fac"></i><span>60-100</span><br>';
  div.innerHTML += '<i style="background: #f4d03f"></i><span>100-150</span><br>';
  div.innerHTML += '<i style="background: #f5b041"></i><span>150-200</span><br>';
  div.innerHTML += '<i style="background: #FFA07A"></i><span>200-250</span><br>';
  div.innerHTML += '<i style="background: #ac6203"></i><span>250-300</span><br>';
  div.innerHTML += '<i style="background: #b4350c"></i><span>300-400</span><br>';
  div.innerHTML += '<i style="background: #7f0cb4"></i><span>400-600</span><br>';
  div.innerHTML += '<i style="background: #e74c3c"></i><span>600-800</span><br>';
  div.innerHTML += '<i style="background: #7f8c8d"></i><span>+800</span><br>';
  div.innerHTML += '<i style="background: black"></i><span>Down</span><br>';

  return div;
};
legend2.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend2");
    div.innerHTML += "<h4>https://github.com/Blueline-lab/lulas</h4>";
  

  return div;
};

legend.addTo(map);
legend2.addTo(map);

L.simpleMapScreenshoter().addTo(map)
