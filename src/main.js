var LocationTracker = require('./LocationTracker');
require('./leaflet');
require('./leaflet.awesome-markers');

function createMap(mapId) {
    var bounds = [
        [51.8402270441, 5.8423449514],
        [51.854623722, 5.875381031]
    ];
    var maxBounds = [
        [51.836      , 5.8423449514],
        [51.858      , 5.875381031]
    ];
    var position = [
      0.5*(bounds[0][0]+bounds[1][0]),
      0.5*(bounds[0][1]+bounds[1][1])
    ];

    L.Icon.Default.imagePath = '';

    var map = L.map(mapId,{
        center: position,
        zoom: 14,
        minZoom: 13,
        maxZoom: 17,
        zoomControl: false,
        attributionControl: false,
        maxBounds: maxBounds,
        layers: [L.imageOverlay(require("./map.svg"), bounds, {
          attribution: 'Powered by Leaflet'
        })]
      });

    var tracker = new LocationTracker(map,{
        track: true,
        gotoMyLocation: false,
        locationMarkerIcon: L.AwesomeMarkers.icon({
            icon: 'person',
            iconColor: 'white',
            markerColor: 'blue',
            prefix: 'ion'
        })
    });
}

module.exports = createMap;