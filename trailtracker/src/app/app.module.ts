import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResultsComponent } from './results/results.component';
import { TrailComponent } from './trail/trail.component';
<<<<<<< HEAD
import { FormsModule } from '@angular/forms'; 
import { NgSelectModule } from '@ng-select/ng-select'; 
=======
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
>>>>>>> 0f5f5db53955a474417e6bcf844c410ea63881a9

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ResultsComponent,
    TrailComponent,
  ],
  imports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatCardModule,
    BrowserModule,
    FormsModule,
    NgSelectModule,
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'trail',
        component: TrailComponent
      },
      {
        path: 'results',
        component: ResultsComponent
      },
      {
        path: '',
        component: HomeComponent
      },
      {path: 'results', component: ResultsComponent},
      {path: 'trail', component: TrailComponent}
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
