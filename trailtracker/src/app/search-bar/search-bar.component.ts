import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  
  constructor() { }
  categories = [
    {id: 1, name: 'Length', disabled: true},
    {id: 2, name: 'Short'},
    {id: 3, name: 'Medium'},
    {id: 4, name: 'Long'},
    {id: 5, name: 'Elevation Gain', disabled: true},
    {id: 6, name: 'Low'},
    {id: 7, name: 'Moderate'},
    {id: 8, name: 'High'},
  ];
    
  selected = [
    {id: 2, name: 'Short'},
    {id: 3, name: 'Medium'},
    {id: 4, name: 'Long'},
    {id: 6, name: 'Low'},
    {id: 7, name: 'Moderate'},
    {id: 8, name: 'High'}
  ];
   
  getSelectedValue(){
    console.log(this.selected);
  }

  onSubmit(f: NgForm) {
    console.log(f.value)
  }

  ngOnInit(): void {
  }

}
