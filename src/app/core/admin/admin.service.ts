import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = 'https://api.pethos.app/api/v1/admin/';

  constructor(private http: HttpClient) { }

  login(data: any): any {
    return this.http.post(this.baseUrl + 'loginAdmin', data);
  }
}
