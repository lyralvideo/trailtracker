import { Component, NgModule, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AppComponent } from 'app/app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [MatButtonModule, MatFormFieldModule],
  providers: [],
  bootstrap: [AppComponent]

}) export class AppModule { }


//const modules = [
//  MatButtonModule,
//  MatFormFieldModule,
//];
/*
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

} */
