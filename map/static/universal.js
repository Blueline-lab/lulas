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
          center: [0, 0],
          zoom: 2,
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

var OpacityLayers = L.Layer.extend({
          // delegate opacity to multiple layers so we can use opacity controls on multiple maps
          initialize: function (layers) {
            this.layers = layers;
            this.options = {
              opacity: layers[0].options.opacity
            };
          },
setOpacity: function (opacity) {
            this.options.opacity = opacity;
            for (i = 0, len = this.layers.length; i < len; i++) {
                this.layers[i].setOpacity(opacity);
            }
            return this;
          }
        });

var higherOpacity = new L.Control.higherOpacity({
          position: 'bottomright'
        });
var lowerOpacity = new L.Control.lowerOpacity({
        position: 'bottomright'
        });
        map.addControl(lowerOpacity);
        map.addControl(higherOpacity);
        higherOpacity.setOpacityLayer(new OpacityLayers([toner, satellite]));

 L.simpleMapScreenshoter().addTo(map)
