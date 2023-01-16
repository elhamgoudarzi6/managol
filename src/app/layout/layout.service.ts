import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  [x: string]: any;

  constructor(private http: HttpClient) { }

  getAllproperties(): any{
    return this.http.get('https://api.pethos.app/api/v1/User/getAllproperty')
  }
  loginUser(data:any): any{
    return this.http.post('https://api.pethos.app/api/v1/User/authUser',data);
  }


}
