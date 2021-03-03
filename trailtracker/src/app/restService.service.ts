import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const DISCOVERY_URL = 'https://api.us-south.discovery.watson.cloud.ibm.com/instances/beff1375-93ea-4b19-b90a-10fbf38f45fd';
const ENVIRONMENT_ID = '35ef0ced-f8c5-4f16-a57c-098c66505472';
const COLLECTION_ID = 'c7bf0198-9e14-40db-9e96-2b4d348585c1';

const headerDict = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Headers': '*',
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

  query_url = DISCOVERY_URL + '/v1/environments/' + ENVIRONMENT_ID + '/collections/' + COLLECTION_ID + '/query?version=2018-12-03&count=10&deduplicate=false&highlight=true&passages=true&passages.count=20&natural_language_query=';
  getResults(query: String) {
    var i = 0;
    var query_url = "";
    if (query != undefined) {
      for (i = 0; i < query.length; i++) {
        if (query[i] == ' ') {
          query_url += '%20';
        } else {
          query_url += query[i];
        }
      }
    }
    console.log(this.query_url + query_url)
    return this.httpClient.get(this.query_url + query_url, requestOptions)
  }
}
