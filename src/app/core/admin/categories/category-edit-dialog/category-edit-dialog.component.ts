import { AdminService } from './../../admin.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LocalStorageService } from '../../../../auth/local-storage.service';

@Component({
  selector: 'app-category-edit-dialog',
  templateUrl: './category-edit-dialog.component.html',
  styleUrls: ['./category-edit-dialog.component.scss'],
  providers: [MessageService]
})
export class CategoryEditDialogComponent implements OnInit {

 form: FormGroup | any;

  errorMessages = {
    title: [{ type: 'required', message: 'عنوان دسته بندی را وارد کنید.' },]
  };
  cat: any;

  constructor(private formBuilder: FormBuilder,
    private service: AdminService,
    public messageService: MessageService,
    public ref: DynamicDialogRef,
    private localStorage: LocalStorageService,
    public config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.cat=this.config.data.cat;
    this.createform();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      title: new FormControl(this.cat.title, Validators.required),
      image: new FormControl(this.cat.image),
      metaData: new FormControl(this.cat.metaData),
      keywords: new FormControl(this.cat.keywords),
    });
  }

  submitForm(): void {
    this.service.editCategory(this.localStorage.userToken, this.cat._id, this.form.value).subscribe((response: any) => {
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
    this.service.uploadFile(formData).subscribe((response: any) => {
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
