import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
  providers: [MessageService]
})
export class AddOrderComponent implements OnInit {
  form: FormGroup | any;
  products: any[] = [];
  category: any[] = [];
  subCategory: any[] = [];
  users: any[] = [];
  status = [{ title: "در حال بررسی" }, { title: "تایید شد" }, { title: "در حال آماده سازی" }, { title: "ارسال شد" }, { title: "تحویل داده شد" }, { title: "عدم پذیرش" }]
  displayCustom: boolean | any;
  constructor(
    private service: AdminService,
    private localStorage: LocalStorageService,
    private messageService: MessageService,
    private router: Router,
    public ref: DynamicDialogRef

  ) { }

  onSelectCat(event: any) {
    this.service.getAllSubCategory(event.value).subscribe((response: any) => {
      if (response.success === true) {
        this.subCategory = response.data;
      } else {
      }
    });
  }

  onSelectSubCat(event: any) {    
    this.service.getAllProductBySubCat(event.value).subscribe((response: any) => {
      if (response.success === true) {
        this.products = response.data;
      } else {
      }
    });
  }


  ngOnInit(): void {
    if (this.localStorage.getCurrentUser()) {
      this.createForm();
      this.getCategory();
      this.getUsers();
    } else {
      this.localStorage.removeCurrentUser();
      this.router.navigateByUrl('/admin');
    }
  }
  getUsers(): any {
    this.service.getAllUsers(this.localStorage.userToken).subscribe((response: any) => {
      if (response.success === true) {
        this.users = response.data;
      } else {
        //  this.token.checkTokenExamination(response.data, 'admin');
      }
    });
  }

  getCategory(): any {
    this.service.getAllCategories(this.localStorage.userToken).subscribe((response: any) => {
      if (response.success === true) {
        this.category = response.data;
      } else {
        //  this.token.checkTokenExamination(response.data, 'admin');
      }
    });
  }

  createForm() {
    this.form = new FormGroup({
      userID: new FormControl(null),
      productID: new FormControl(null),
      title: new FormControl(null),
      number: new FormControl(3),
      status: new FormControl('در حال بررسی'),
      description: new FormControl(null),
      designCode: new FormControl(null),
      file: new FormControl(null),
    });
  }

  resetInput() {
    this.form.controls['productID'].reset();
    this.form.controls['title'].reset();
    this.form.controls['number'].reset();
    this.form.controls['description'].reset();
    this.form.controls['file'].reset();
  }

  submitForm(): void {
    this.service.registerOrder(this.localStorage.userToken, this.form.value).subscribe((response: any) => {
      if (response.success === true) {
        this.ref.close(true);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'خطا',
        });
      }
    });
  }

  onFileUpload(event: any) {
    const formData = new FormData();
    formData.append('file', event.files[0], event.files[0].name);
    this.service
      .uploadFile(formData)
      .subscribe((response: any) => {
        if (response.success === true) {
          this.form.controls.file.setValue(response.imagePath);
          this.messageService.add({
            severity: 'success',
            summary: 'آپلود فایل',
            detail: 'آپلود شد.',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'آپلود فایل',
            detail: response.data,
          });
        }
      });
  }


}
