import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  categories = [
    {id: 1, name: 'Length', disabled: true},
    {id: 2, name: 'Short'},
    {id: 3, name: 'Medium'},
    {id: 4, name: 'Long'},
    {id: 5, name: 'Elevation Gain', disabled: true},
    {id: 6, name: 'Low'},
    {id: 7, name: 'Medium'},
    {id: 8, name: 'High'},
  ];
    
  selected = [
    {id: 2, name: 'Short'},
    {id: 3, name: 'Medium'},
    {id: 4, name: 'Long'},
    {id: 6, name: 'Low'},
    {id: 7, name: 'Medium'},
    {id: 8, name: 'High'}
  ];
   
  getSelectedValue(){
    console.log(this.selected);
  }
  ngOnInit(): void {
  }

}
