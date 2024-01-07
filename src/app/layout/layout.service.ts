import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LayoutService {
  baseUrl = 'https://api.managol.co/user/';

  constructor(private http: HttpClient) { }

  sendSms(data: any): any {
    const headers = {
      'X-API-KEY': 'OEib74WVGhsSmthSz121cpOPdvMCnbfabHKdGRUh6ACQwY9II4kTBksqVIPlneEz',
      'Content-Type': 'application/json',
      'ACCEPT': 'text/plain'
    };
    return this.http.post('https://api.sms.ir/v1/send/verify', data, { 'headers': headers });
  }

  getUser(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getUser/' + id, { params });
  }

  loginUser(data: any): any {
    return this.http.post(this.baseUrl + 'authUser', data);
  }

  getAllproduct(): any {
    return this.http.get(this.baseUrl + 'getAllproduct')
  }
  getProduct(id: string): any {
    return this.http.get(this.baseUrl + 'getProduct/' + id);
  }
  getAllFaq(lang: string): any {
    const params = new HttpParams().set('lang', lang);
    return this.http.get(this.baseUrl + 'getAllFaq', { params })
  }
  getAllCategory(): any {
    return this.http.get(this.baseUrl + 'getAllCategory');
  }
  getAllSubCategory(id: string): any {
    return this.http.get(this.baseUrl + 'getAllSubCategory/' + id);
  }
  getAllProductBySubCat(id: string): any {
    return this.http.get(this.baseUrl + 'getAllProductBySubCat/' + id);
  }
  advanceSearchProduct(data:any): any {
    return this.http.post(this.baseUrl + 'advanceSearchProduct',data);
  }
  uploadFile(data: any): any {
    return this.http.post(this.baseUrl + 'upload', data);
  }

  registerOrder(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerOrder', data, { params });
  }

  updateUser(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'updateUser/' + id, data, { params });
  }

  registerContactUs(data: any): any {
    return this.http.post(this.baseUrl + 'registerContactUs', data);
  }

}

