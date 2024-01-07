import { TokenService } from '../../../auth/token.service';
import { AddOrderComponent } from './add-order/add-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { LocalStorageService } from '../../../auth/local-storage.service';
import { AdminService } from '../admin.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class OrderComponent implements OnInit {
  orders: any[] = [];
  cols: any[] | any;

  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getOrders();
    this.cols = [
      { field: 'code', header: 'کد سفارش' },
      { field: 'title', header: 'عنوان' },
      { field: 'number', header: 'تعداد' },
      { field: 'description', header: 'توضیحات' },
    ];
  }

  getOrders(): any {
    this.service.getAllOrder(this.localStorage.userToken).subscribe((response: any) => {
      if (response.success === true) {
        this.orders = response.data;
      } else {
        this.token.checkTokenExamination(response.data, 'admin');
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت اطلاعات ',
          detail: response.data,
        });
      }
    });
  }

  showAddOrderDialog(): void {
    const ref = this.dialogService.open(AddOrderComponent, {
      header: 'ثبت سفارش جدید',
      width: '95%',
      style: { "font-family": "IRANSans_Light" },
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت اطلاعات ',
          detail: 'با موفقیت ثبت شد.',
        });
        this.getOrders();
      }
    });
  }



  showEditOrderDialog(order: any): void {
    const ref = this.dialogService.open(EditOrderComponent, {
      data: {
        order
      },
      header: 'ویرایش سفارش',
      width: '90%',
      style: { "font-family": "IRANSans_Light" },
    });

    ref.onClose.subscribe(res => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ویرایش شد ',
        });
        this.getOrders();
      }
    });
  }


  deleteOrder(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
        this.service.deleteOrder(this.localStorage.userToken, id).subscribe((response: any) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({ severity: 'success', summary: ' حذف اطلاعات ', detail: response.data });
            this.getOrders();
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
