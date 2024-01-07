import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = 'https://api.managol.co/admin/';

  constructor(private http: HttpClient) { }

  multiUpload(data: any): any {
    return this.http.post(this.baseUrl + 'multiUpload', data);
  }
  uploadFile(data: any): any {
    return this.http.post(this.baseUrl + 'upload', data);
  }
  deleteFile(data: any): any {
    return this.http.post(this.baseUrl + 'deleteFile', data);
  }
  login(data: any): any {
    return this.http.post(this.baseUrl + 'loginAdmin', data);
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

  getAllUsers(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllUser', { params });
  }
  getAllOrder(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllOrder', { params });
  }
  getAllProduct(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllProduct', { params });
  }
  registerProduct(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerProduct', data, { params });
  }
  updateProduct(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'updateProduct/' + id, data, { params });
  }
  registerOrder(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerOrder', data, { params });
  }

  updateOrder(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'updateOrder/' + id, data, { params });
  }
  deleteOrder(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteOrder/' + id, { params });
  }
  registerUser(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerUser', data, { params });
  }
  registerFaq(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerFaq', data, { params });
  }
  updateUser(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'updateUser/' + id, data, { params });
  }
  updateFaq(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'updateFaq/' + id, data, { params });
  }
  deleteFaq(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteFaq/' + id, { params });
  }
  getAllFaq(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllFaq', { params });
  }
  deleteProduct(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteProduct/' + id, { params });
  }
  getAllContactUs(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllContactUs', { params });
  }
  deleteContactUs(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteContactUs/' + id, { params });
  }
  deleteUser(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteUser/' + id, { params });
  }


  //#region Admins
  getAllAdmins(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllAdmin', { params });
  }
  getAdmin(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAdmin/' + id, { params });
  }
  addAdmin(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerAdmin', data, { params });
  }
  updateAdmin(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'updateAdmin/' + id, data, { params });
  }
  deleteAdmin(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteAdmin/' + id, { params });
  }
  changePassword(token: string, id: any, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'changePassword/' + id, data, { params });
  }
  changeUsername(token: string, id: any, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'changeUsername/' + id, data, { params });
  }
  resetPassword(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + '/resetPassword', data, { params });
  }
  //#endregion


  //#region Categories
  getAllCategories(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllCategory', { params });
  }

  addCategory(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerCategory', data, { params });
  }

  editCategory(token: string, id: any, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'updateCategory/' + id, data, { params });
  }

  deleteCategory(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteCategory/' + id, { params });
  }
  addSubCategory(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + '/registerSubCategory', data, { params });
  }
  editSubCategory(token: string, id: any, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'updateSubCategory/' + id, data, { params });
  }
  deleteSubCategory(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteSubCategory/' + id, { params });
  }
  //#endregion


}
