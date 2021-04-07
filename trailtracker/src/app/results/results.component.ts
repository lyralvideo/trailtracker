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
  lat: number;
  lng: number;
  totalResultPages: number;
  currentPageIndex: number;

  constructor(
    private restService: RestService,
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService) { }

  ngOnInit(): void {
    console.log("resultsComp - ngOnInit called")
    this.searchTerm = this.route.snapshot.queryParamMap.get('search');
    this.lat = Number(this.route.snapshot.queryParamMap.get('latitude'));
    this.lng = Number(this.route.snapshot.queryParamMap.get('longitude'));
    this.currentPageIndex = Number(this.route.snapshot.queryParamMap.get('page'))
    this.showResults(this.searchTerm, this.currentPageIndex, this.lat, this.lng);
  }

  showResults(searchTerm: string, page: number, lat: number, lng: number): void {
    this.restService.getDiscResultsBackend(searchTerm, page, lat, lng).subscribe((data: Config) => {
      this.config = { ...data };
      console.log(this.config);
      this.totalResultPages = Math.ceil(this.config["matching_results"]/10)
    });
  }

  showUpdatedResults(term: string): void {
    if (this.searchTerm != term){
      this.currentPageIndex = 1;
    }
    this.searchTerm = term;
    this.showResults(this.searchTerm, this.currentPageIndex, this.lat, this.lng);
    this.router.navigate(['/results'], { queryParams: { search: this.searchTerm, page: this.currentPageIndex, latitude: this.lat, longitude: this.lng } });
  }

  onSubmit(id: string): void {
    this.router.navigate(['/trail'], { queryParams: { id } });
  }

  pageDecrement(): void {
    if(this.currentPageIndex>1){
      this.currentPageIndex--;
      this.showUpdatedResults(this.searchTerm);
      window.scrollTo(0,0);
    }
  }

  pageIncrement(): void {
    if(this.currentPageIndex<this.totalResultPages){
      this.currentPageIndex++;
      this.showUpdatedResults(this.searchTerm);
      window.scrollTo(0,0);
    }
  }
}
