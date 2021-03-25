import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from 'app/restService.service';
import { Config } from 'protractor';

@Component({
  selector: 'app-trail',
  templateUrl: './trail.component.html',
  styleUrls: ['./trail.component.css']
})
export class TrailComponent implements OnInit {

  @Input() selected: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();

  config: Config;
  trailName: string;

  constructor(private restService: RestService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.trailName = this.route.snapshot.queryParamMap.get('id');
    this.getResults(this.trailName);
  }

  getResults(searchTerm: string): void {
    this.restService.getTrailBackend(searchTerm).subscribe((data: Config) => {
      this.config = { ...data };
      console.log(this.config.results[0]);
    });
  }

  public toggleFavorite(): void {
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }

}
