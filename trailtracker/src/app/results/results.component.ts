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

  constructor(private restService: RestService) { }

  ngOnInit(): void {
  }

  showResults() {
<<<<<<< HEAD
    this.restService.getResults().subscribe((data: Config) => {
      this.config = { ...data}
      console.log(this.config.results)});
    //this.printToConsole(this.config.results);
  }

  printToConsole(str: string) {
    console.log(str);
=======
    this.restService.getResults('runs by waterfalls').subscribe((data: Config) => this.config = { ...data});
    console.log(this.config)
>>>>>>> 37feceb26d6650b0127c2b55bd88e1985165c263
  }

}
