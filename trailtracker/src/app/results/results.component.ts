import { RestService } from './../restService.service';
import { Component, OnInit } from '@angular/core';
import { MatCardHarness } from '@angular/material/card/testing';
import { Config } from 'protractor';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { LocationService } from 'app/location.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  headers: string[];
  config: Config;
  searchTerm: string;
  term: string;
  lat: Number;
  lng: Number;

  constructor(private restService: RestService,
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService) { }

  ngOnInit(): void {
    this.searchTerm = this.route.snapshot.queryParamMap.get('search');
    this.lat = Number(this.route.snapshot.queryParamMap.get('latitude'));
    this.lng = Number(this.route.snapshot.queryParamMap.get('longitude'));
    this.showResults(this.searchTerm, this.lat, this.lng);
  }

  showResults(searchTerm: string, lat: Number, lng: Number) {
    this.restService.getDiscResultsBackend(searchTerm, lat, lng).subscribe((data: Config) => {
      console.log("test1")
      this.config = { ...data }
      console.log(this.config)
    });
  }

  showUpdatedResults(term: string) {
    this.searchTerm = term;
    this.showResults(this.searchTerm, this.lat, this.lng)
    this.router.navigate(['/results'], { queryParams: { search: this.searchTerm } });
  }

  onSubmit(id: string) {
    console.log(name);
    this.router.navigate(['/trail'], { queryParams: { id: id } });

  }
}
