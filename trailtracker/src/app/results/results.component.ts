import { RestService } from './../restService.service';
import { Component, OnInit } from '@angular/core';
import { MatCardHarness } from '@angular/material/card/testing';
import { Config } from 'protractor';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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

  constructor(private restService: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.searchTerm = this.route.snapshot.queryParamMap.get('search');
    this.showResults(this.searchTerm);
  }

  showResults(searchTerm: string) {
    this.restService.getDiscResultsBackend(searchTerm).subscribe((data: Config) => {
      console.log("test1")
      this.config = { ...data }
      console.log(this.config)
    });
  }

  showUpdatedResults(term: string) {
    this.searchTerm = term;
    this.showResults(this.searchTerm)
    this.router.navigate(['/results'], { queryParams: { search: this.searchTerm } });
  }

  onSubmit(id: string) {
    console.log(name);
    this.router.navigate(['/trail'], { queryParams: { id: id } });

  }
}
