import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { MapsAPILoader } from '@agm/core'
import { LocationService } from 'app/location.service';

@Component({
  selector: 'app-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css'],
})
export class MapComponent {
  latitude = 40.0017;
  longitude = -83.0197;
  markerDraggable = true;
  zoom = 15;
  address: string;
  private geoCoder;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private locationService: LocationService
  ) { }

  ngOnInit() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  markerDragEnd($event: google.maps.MouseEvent) {
    this.latitude = $event.latLng.lat();
    this.longitude = $event.latLng.lng();
    this.locationService.setLat(this.latitude);
    this.locationService.setLng(this.longitude);
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.locationService.setLat(this.latitude);
        this.locationService.setLng(this.longitude);
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
}

