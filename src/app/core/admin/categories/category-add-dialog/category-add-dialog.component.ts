import { AdminService } from './../../admin.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LocalStorageService } from '../../../../auth/local-storage.service';

@Component({
  selector: 'app-category-add-dialog',
  templateUrl: './category-add-dialog.component.html',
  styleUrls: ['./category-add-dialog.component.scss'],
  providers: [
    MessageService
  ]
})
export class CategoryAddDialogComponent implements OnInit {

 form: FormGroup | any;
  errorMessages = {
    title: [
      { type: 'required', message: 'عنوان دسته بندی را وارد کنید.' },
      { type: 'maxlength', message: 'عنوان دسته بندی نمی تواند از 500 کاراکتر بیشتر باشد.' }
    ]
  };

  constructor(private formBuilder: FormBuilder,
    private service: AdminService,
    private ref: DynamicDialogRef,
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.createform();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      title: new FormControl(null, Validators.required),
      image: new FormControl(null),
      metaData: new FormControl(null),
      keywords: new FormControl(null),
    });
  }

  submitForm(): void {
    this.service.addCategory(this.localStorage.userToken,this.form.value).subscribe((response: any) => {
      if (response.success === true) {
        this.ref.close(true);
      } else {
        this.messageService.add({ severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data });
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
