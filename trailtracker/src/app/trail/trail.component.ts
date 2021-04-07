import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from 'app/restService.service';
import { Config } from 'protractor';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import {FormsModule,NgForm, SelectMultipleControlValueAccessor} from '@angular/forms';

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
  timer: number;

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

 
  public addFavorite() {
  //first, check for dupe favorites:
  var id = this.route.snapshot.queryParamMap.get('id')
  this._api.postTypeRequest('user/favorites/:' + getCookie('username'), '').subscribe((res: any) => {
      
    if (res.status) { 

      var favList = JSON.stringify(res.data)
      //
      //console.log(favList);
      if (favList.search(id) !== -1) {
        this.test = true;
        console.log("thats already favorited!")
        this.test = true;
        return true;
      }  else {
        this.addFavPart2()
        return false;
      }
      
      } 
      
   });

    this.selected = !this.selected;
    this.selectedChange.emit(this.selected)
    // this.test = false;
   // await this.checkDupes()      
   // console.log(this.test)
   // if (this.test) {return false}

    
   
    //Then add the id to database.
    
     }
    
   addFavPart2() {
      this._api.postTypeRequest('user/addfav/:' + getCookie('username') + '&:' + this.route.snapshot.queryParamMap.get('id'), '').subscribe((res: any) => {
      if (res.status) {
        console.log(res)    }});



   }

    

  

  loggedIn() {
    return this._auth.loggedIn();
  }

  loggedOut() {
    return this._auth.loggedOut();
  }

}
