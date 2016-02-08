require('./leaflet');

function Tracker(map,options){
    this.options = options || Tracker.DEFAULT_OPTIONS;

    this._locationMarker = L.marker([0,0],{icon:this.options.locationMarkerIcon});
    this._locationRadius = L.circle([0,0], 10);
    this._firstLocation = true;

    this.map = map;

    this._firstLocation = true;
    this._gotoMyLocation = this.options.gotoMyLocation;

    map.on('locationfound',onLocationFound.bind(this));
    map.on('locationerror',onLocationError.bind(this));
    
    if(this.options.track) {
        this.startTracking();
    }
    
}
Tracker.prototype = Object.create(Object.prototype);
Tracker.prototype.constructor = Tracker;
Tracker.DEFAULT_OPTIONS = {
    gotoMyLocation: false,
    track: true,
    locationMarkerIcon: new L.Icon.Default(),
    zoom: 15
};

Tracker.prototype.startTracking = function() {
    this.options.track = true;
    this.map.locate({
        watch:true
    });
};

Tracker.prototype.stopTracking = function() {
    this.options.track = false;
    this.map.stopLocate();
};

function onLocationFound(e) {
  if(this._gotoMyLocation) {
      this._gotoMyLocation = false;
      this.map.setView(e.latlng,this.options.zoom,{reset:true});
  }

  if(this._firstLocation) {
    this._firstLocation = false;
    this._locationMarker.addTo(this.map);
    this._locationRadius.addTo(this.map);
  }

  var radius = e.accuracy / 2;
  this._locationMarker.setLatLng(e.latlng);
  this._locationRadius.setLatLng(e.latlng);
  this._locationRadius.setRadius(radius);
}

function onLocationError(e) {
  console.error(e.message);
}

module.exports = Tracker;