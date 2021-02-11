import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import DiscoveryV2 from 'ibm-watson/discovery/v2';
import { IamAuthenticator } from 'ibm-watson/auth';
import fs from 'fs';

//const discovery = require('./discovery.js');
//const discovery = new DiscoveryV2({version: '2019-11-22'});
@Injectable({
  providedIn: 'root'
})
export class DiscoveryService {
  querySource = new BehaviorSubject('');
  currentQuery = this.querySource.asObservable();
  
constructor() {
  
 }

changeQuery(query: string) {
  console.log('testing string ' + query);
  this.querySource.next(query)
}

onResults() {
  return this.querySource.asObservable();
}

queryDisc(query: string){
  this.querySource.next(query)
  console.log('testing query ' + this.querySource);
}

}
