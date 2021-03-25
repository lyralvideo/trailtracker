import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  latitude: number;
  longitude: number;

  constructor() { }

  setLat(lat: number): void {
    this.latitude = lat;
  }

  setLng(lng: number): void {
    this.longitude = lng;
  }

  getLat(): number {
    return this.latitude;
  }

  getLng(): number {
    return this.longitude;
  }
}
