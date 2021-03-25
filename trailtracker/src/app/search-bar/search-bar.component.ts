import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from 'app/location.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor(private router: Router, private locationService: LocationService) { }
  categories = [
    { id: 1, name: 'Length', disabled: true },
    { id: 2, name: 'Short' },
    { id: 3, name: 'Medium' },
    { id: 4, name: 'Long' },
    { id: 5, name: 'Elevation Gain', disabled: true },
    { id: 6, name: 'Low' },
    { id: 7, name: 'Moderate' },
    { id: 8, name: 'High' },
  ];

  selected = [
    { id: 2, name: 'Short' },
    { id: 3, name: 'Medium' },
    { id: 4, name: 'Long' },
    { id: 6, name: 'Low' },
    { id: 7, name: 'Moderate' },
    { id: 8, name: 'High' }
  ];

  getSelectedValue(): void {
    console.log(this.selected);
  }

  onSubmit(data: string): void {
    console.log(data.search);
    const lat = this.locationService.getLat();
    const lng = this.locationService.getLng();
    this.router.navigate(['/results'], { queryParams: { search: data.search, latitude: lat, longitude: lng } });

  }

  ngOnInit(): void {
  }

}
