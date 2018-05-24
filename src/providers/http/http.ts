import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const url = 'http://ec2-13-127-19-135.ap-south-1.compute.amazonaws.com/olx/';

@Injectable()
export class HttpProvider {

  constructor(public http: HttpClient) {
    console.log('Hello HttpProvider Provider');
  }

  get(endpoint) {
    return this.http.get(url+endpoint);
  }

  post(endpoint:string, params:any){
    return this.http.post(url+endpoint, params);
  }

  
}
