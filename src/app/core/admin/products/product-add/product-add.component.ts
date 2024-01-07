import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  form: FormGroup | any;
  category: any[] = [];
  subCategory: any[] = [];
  constructor(
    private service: AdminService,
    private localStorage: LocalStorageService,
    private messageService: MessageService,
    private router: Router,
    public ref: DynamicDialogRef

  ) { }

  ngOnInit(): void {
    if (this.localStorage.getCurrentUser()) {
      this.getCategory();
      this.createForm();
    } else {
      this.localStorage.removeCurrentUser();
      this.router.navigateByUrl('/admin');
    }
  }
  onSelectCat(event: any) {
    this.service.getAllSubCategory(event.value).subscribe((response: any) => {
      if (response.success === true) {
        this.subCategory = response.data;
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
      categoryID: new FormControl(null),
     // subCategoryID: new FormControl(null),
      info: new FormControl(null),
      title: new FormControl(null),
      description: new FormControl(null),
      image: new FormControl(null),
      gallery: new FormControl(null),
      metaData: new FormControl(null),
      keywords: new FormControl(null),
    });
  }


  submitForm(): void {
    this.service.registerProduct(this.localStorage.userToken, this.form.value).subscribe((response: any) => {
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

  onFilesUpload(event: any): void {
    const formData = new FormData();
    for (let i = 0; i < event.files.length; i++) {
      formData.append('files', event.files[i], event.files[i].name);
    }
    this.service.multiUpload(formData).subscribe((response: any) => {
      if (response.success === true) {
        this.form.controls.gallery.setValue(response.data);        
        this.messageService.add({
          severity: 'success',
          summary: 'با موفقیت آپلود شد.',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'خطا در آپلود فایل',
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
          this.form.controls.image.setValue(response.imagePath);
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
