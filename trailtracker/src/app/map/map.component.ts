import { Component } from '@angular/core';
import { MapsAPILoader } from '@agm/core'

@Component({
  selector: 'app-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css'],
})
export class MapComponent {
  latitude = 40.0017;
  longitude = -83.0197;
  markerDraggable = true;

  markerDragEnd($event: google.maps.MouseEvent) {
    this.latitude = $event.latLng.lat();
    this.longitude = $event.latLng.lng();
  }

  getLat() {
    return this.latitude;
  }

  getLng() {
    return this.longitude;
  }
}

