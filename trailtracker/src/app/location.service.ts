import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  latitude: Number;
  longitude: Number;

  constructor() { }

  setLat(lat: Number) {
    this.latitude = lat;
  }

  setLng(lng: Number) {
    this.longitude = lng;
  }

  getLat() {
    return this.latitude;
  }

  getLng() {
    return this.longitude;
  }
}
