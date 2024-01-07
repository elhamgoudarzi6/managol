import { AdminService } from './../admin.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoryEditDialogComponent } from './category-edit-dialog/category-edit-dialog.component';
import { Component, OnInit } from '@angular/core';
import { CategoryAddDialogComponent } from './category-add-dialog/category-add-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { LocalStorageService } from '../../../auth/local-storage.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [
    MessageService, ConfirmationService, DialogService
  ]
})
export class CategoriesComponent implements OnInit {
  categories: any[] | any;
  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private dialogService: DialogService,
    private localStorage: LocalStorageService,
    private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): any {
    this.service.getAllCategories(this.localStorage.userToken,).subscribe((response: any) => {
      if (response.success === true) {
        this.categories = response.data;

      } else {
        this.messageService.add({ severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data });
      }
    });
  }

  showEditCategoryDialog(cat:any): void {
    const ref = this.dialogService.open(CategoryEditDialogComponent, {
      data: {
        cat
      },
      header: 'ویرایش دسته بندی',
      width: '70%',
      style: { "font-family": "IRANSans_Light" },
    });

    ref.onClose.subscribe(res => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ویرایش اطلاعات ',
          detail: 'اطلاعات با موفقیت ویرایش شد.'
        });
        this.getCategories();
      }
    });
  }

  

  showAddCategoryDialog(): void {
    const ref = this.dialogService.open(CategoryAddDialogComponent, {
      header: 'ثبت دسته بندی',
      width: '80%',
      style: { "font-family": "IRANSans_Light" },
    });

    ref.onClose.subscribe(res => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت اطلاعات ',
          detail: 'اطلاعات با موفقیت ثبت شد.'
        });
        this.getCategories();
      }
    });
  }

  
  deleteCategory(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
        this.service.deleteCategory(this.localStorage.userToken, id).subscribe((response: any) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({ severity: 'success', summary: ' حذف اطلاعات ', detail: response.data });
            this.getCategories();
          } else {
            this.messageService.add({ severity: 'error', summary: ' حذف اطلاعات ', detail: response.data });
          }
        });
      },
      reject: () => {
        // close
        this.confirmationService.close();
      }
    });
  }

  deleteSubCategory(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
        this.service.deleteSubCategory(this.localStorage.userToken, id).subscribe((response: any) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({ severity: 'success', summary: ' حذف اطلاعات ', detail: response.data });
            this.getCategories();
          } else {
            this.messageService.add({ severity: 'error', summary: ' حذف اطلاعات ', detail: response.data });
          }
        });
      },
      reject: () => {
        // close
        this.confirmationService.close();
      }
    });
  }

}
