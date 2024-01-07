import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent {
  form: FormGroup | any;
  products: any[] = [];
  category: any[] = [];
  subCategory: any[] = [];
  users: any[] = [];
  order: any;
  status = [{ title: "در حال بررسی" }, { title: "تایید شد" }, { title: "در حال آماده سازی" }, { title: "ارسال شد" }, { title: "تحویل داده شد" }, { title: "عدم پذیرش" }]
  displayCustom: boolean | any;
  activeIndex: number = 0;

  constructor(
    private service: AdminService,
    private localStorage: LocalStorageService,
    private messageService: MessageService,
    private router: Router,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig

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

  getAllProduct() {
    this.service.getAllProduct(this.localStorage.userToken).subscribe((response: any) => {
      if (response.success === true) {
        this.products = response.data;
      } else {
      }
    });
  }


  ngOnInit(): void {
    if (this.localStorage.getCurrentUser()) {
      this.order = this.config.data.order;
      this.getCategory();
      this.getUsers();
      this.getAllProduct();
      this.createForm();
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
      }
    });
  }

  getCategory(): any {
    this.service.getAllCategories(this.localStorage.userToken).subscribe((response: any) => {
      if (response.success === true) {
        this.category = response.data;
      } else {
      }
    });
  }

  createForm() {
    this.form = new FormGroup({
      userID: new FormControl(this.order.userID),
      productID: new FormControl(this.order.productID),
      title: new FormControl(this.order.title),
      number: new FormControl(this.order.number),
      status: new FormControl(this.order.status),
      description: new FormControl(this.order.description),
      file: new FormControl(this.order.file),
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
    this.service.updateOrder(this.localStorage.userToken, this.order._id, this.form.value).subscribe((response: any) => {
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
