import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
  providers: [MessageService]
})
export class ProductEditComponent implements OnInit {
  form: FormGroup | any;
  product: any;
  category: any[] = [];
  subCategory: any[] = [];
  constructor(
    private service: AdminService,
    private localStorage: LocalStorageService,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig

  ) { }

  ngOnInit(): void {
    this.product = this.config.data.product;
    this.getCategory();
    this.getSubCategory();
    this.createForm();
  }
  getCategory(): any {
    this.service.getAllCategories(this.localStorage.userToken).subscribe((response: any) => {
      if (response.success === true) {
        this.category = response.data;
      } else {
      }
    });
  }
  getSubCategory(): any {
    this.service.getAllSubCategory(this.product.categoryID).subscribe((response: any) => {
      if (response.success === true) {
        this.subCategory = response.data;
      } else {
      }
    });
  }
  createForm() {
    this.form = new FormGroup({
      categoryID: new FormControl(this.product.categoryID),
    //  subCategoryID: new FormControl(this.product.subCategoryID),
      info: new FormControl(this.product.info),
      title: new FormControl(this.product.title),
      description: new FormControl(this.product.description),
      image: new FormControl(this.product.image),
      gallery: new FormControl(this.product.gallery),
      metaData: new FormControl(this.product.metaData),
      keywords: new FormControl(this.product.keywords),
    });
  }

  onSelectCat(event: any) {
    this.service.getAllSubCategory(event.value).subscribe((response: any) => {
      if (response.success === true) {
        this.subCategory = response.data;
      } else {
      }
    });
  }

  submitForm(): void {
    this.service.updateProduct(this.localStorage.userToken, this.product._id, this.form.value).subscribe((response: any) => {
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
