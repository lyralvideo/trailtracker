import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

//const DiscoveryV1 = require('ibm-watson/discovery/v1');
//const { BearerTokenAuthenticator } = require('ibm-watson/auth');
//const fs = require('fs');

const DISCOVERY_IAM_APIKEY= 'o2AHBjAYfudK0mXXt7dFmQFx8oaldIae5oG3du2iIf9K';
const DISCOVERY_URL= 'https://api.us-south.discovery.watson.cloud.ibm.com/instances/beff1375-93ea-4b19-b90a-10fbf38f45fd';

//const headers = new HttpHeaders().set('Content-Type', 'application/json')
//.set('apikey', 'o2AHBjAYfudK0mXXt7dFmQFx8oaldIae5oG3du2iIf9K')
//.set('Authorization', 'o2AHBjAYfudK0mXXt7dFmQFx8oaldIae5oG3du2iIf9K')
//.set('Access-Control-Allow-Headers', 'Content-Type')
//.set('Access-Control-Allow-Methods', 'GET')
//.set('Access-Control-Allow-Origin', '*');

const headerDict = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Headers': '*',
  //'Authorization': 'apikey:o2AHBjAYfudK0mXXt7dFmQFx8oaldIae5oG3du2iIf9K'
  'Authorization': 'Basic YXBpa2V5Om8yQUhCakFZZnVkSzBtWFh0N2RGbVFGeDhvYWxkSWFlNW9HM2R1MmlJZjlL'
}

const requestOptions = {
  headers: new HttpHeaders(headerDict)
}

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private httpClient: HttpClient) { }

  test_url = 'https://api.us-south.discovery.watson.cloud.ibm.com/instances/beff1375-93ea-4b19-b90a-10fbf38f45fd/v1/environments/35ef0ced-f8c5-4f16-a57c-098c66505472/collections/07e3efcb-0f5e-46ed-b59d-161a27ab0c61/query?version=2018-12-03&deduplicate=false&highlight=true&passages=true&passages.count=5&query=';
  getResults() {

    return this.httpClient.get(this.test_url, requestOptions)
  }
}
