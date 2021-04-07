import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from 'app/restService.service';
import { Config } from 'protractor';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import {FormsModule,NgForm} from '@angular/forms';

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";}

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
  favorites: string;
  pack: string;
  test: boolean;

  constructor(
    private restService: RestService, 
    private route: ActivatedRoute,   
    private _api: ApiService,
    private _auth: AuthService,) { }

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



  checkDupes(): boolean {
    this.test = false;
    var id = this.route.snapshot.queryParamMap.get('id')
    this._api.postTypeRequest('user/favorites/:' + getCookie('username'), '').subscribe((res: any) => {
      
      if (res.status) { 

        var favList = JSON.stringify(res.data).slice(15).split(',')
        console.log(favList);
        console.log(id);
        if (favList.every( async function check(value) {console.log( value + "=" + id + ":" + (value == id)); return (id !== value);} )) {
          
        } else {
        console.log("thats already favorited!")
          
          this.test = true;
          return true;

        }
         
          
        } 
        
     });

  if (this.test) {return true}

    return false
  }

  public addFavorite(): void {
  //first, check for dupe favorites:
    //if (this.checkDupes()) {

    
   
    //Then add the id to database.
    this._api.postTypeRequest('user/addfav/:' + getCookie('username') + '&:' + this.route.snapshot.queryParamMap.get('id'), '').subscribe((res: any) => {
      if (res.status) {
        console.log(res)    }});

    this.selected = !this.selected;
    this.selectedChange.emit(this.selected)
     }

   // }

    

  

  loggedIn() {
    return this._auth.loggedIn();
  }

  loggedOut() {
    return this._auth.loggedOut();
  }

}
