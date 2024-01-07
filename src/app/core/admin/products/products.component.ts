import { AdminService } from './../admin.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { LocalStorageService } from '../../../auth/local-storage.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class ProductsComponent implements OnInit {

  products: any[] | any;

  constructor(private messageService: MessageService,
    private localStorage: LocalStorageService,
    private service: AdminService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): any {
    this.service.getAllProduct(this.localStorage.userToken).subscribe((response: any) => {
      if (response.success === true) {
        this.products = response.data;
      } else {
        this.messageService.add({ severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data });
      }
    });
  }

  showEditProductDialog(id: string): void {
    let product = this.products.filter((x: any) => x._id == id)[0];
    const ref = this.dialogService.open(ProductEditComponent, {
      data: {
        product
      },
      header: 'ویرایش محصول',
      width: '90%',
      style: { "font-family": "IRANSans_Light" },
    });

    ref.onClose.subscribe(res => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ویرایش شد ',
        });
        this.getProducts();
      }
    });
  }


  showAddProductDialog(): void {
    const ref = this.dialogService.open(ProductAddComponent, {
      header: 'ثبت محصول',
      width: '90%',
      style: { "font-family": "IRANSans_Light" },
    });

    ref.onClose.subscribe(res => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت شد ',
        });
        this.getProducts();
      }
    });
  }

  deleteProduct(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
        this.service.deleteProduct(this.localStorage.userToken, id).subscribe((response: any) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({ severity: 'success', summary:response.data });
            this.getProducts();
          } else {
            this.messageService.add({ severity: 'error', summary: response.data });
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
