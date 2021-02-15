import { RestService } from './../restService.service';
import { Component, OnInit } from '@angular/core';
import {MatCardHarness} from '@angular/material/card/testing';
import { Config } from 'protractor';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  headers: string[];
  config: Config;
  searchTerm: string;

  constructor(private restService: RestService) { }

  ngOnInit(): void {
  }

  showResults(searchTerm: string) {
    this.restService.getResults(searchTerm).subscribe((data: Config) => {
      this.config = { ...data}
      console.log(this.config.results)});
  }

}
