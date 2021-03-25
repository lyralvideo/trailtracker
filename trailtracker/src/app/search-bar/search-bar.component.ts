import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LocationService } from 'app/location.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor(private router: Router, private locationService: LocationService) {
    // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
       return false;
    }

    this.router.events.subscribe((evt) => {
       if (evt instanceof NavigationEnd) {
          // trick the Router into believing it's last link wasn't previously loaded
          this.router.navigated = false;
          // if you need to scroll back to top, here is the right place
          window.scrollTo(0, 0);
       }
   });

}
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

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
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
