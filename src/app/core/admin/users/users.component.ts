import { Component, OnInit } from '@angular/core';
import { TokenService } from './../../../auth/token.service';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { AdminService } from './../admin.service';
import { DialogService } from 'primeng/dynamicdialog';
import { AddUserComponent } from './add-user/add-user.component';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  cols: any[] | any;
  form: FormGroup | any;

  constructor(
    private messageService: MessageService,
    private dialogService: DialogService,
    private service: AdminService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private confirmationService: ConfirmationService
  ) { }


  ngOnInit(): void {
    this.getUsers();
    this.createForm();
    this.cols = [
      { field: 'mobile', header: 'موبایل' },
      { field: 'companyName', header: 'شرکت' },
      { field: 'email', header: 'ایمیل' },
      { field: 'country', header: 'کشور' },
      { field: 'city', header: 'شهر' },
      { field: 'address', header: 'آدرس' },
      { field: 'birthDate', header: 'تاریخ تولد' },

    ];
  }

  createForm() {
    this.form = new FormGroup({
      mobile: new FormControl(null),
      companyName: new FormControl(null),
      city: new FormControl(null),
      country: new FormControl(null),
      address: new FormControl(null),
      email: new FormControl(null),
      birthDate: new FormControl(null),
    });
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


  show() {
    const ref = this.dialogService.open(AddUserComponent, {
      header: 'افزودن کاربر',
      width: '90%',
      style: { "font-family": "IRANSans_Light" },
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت اطلاعات ',
          detail: 'اطلاعات با موفقیت ثبت شد.',
        });
        this.getUsers();
      }
    });
  }

  updateUser(id: any) {
    this.service.updateUser(this.localStorage.userToken, id, this.form.value).subscribe((response: any) => {
      if (response.success === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت شد ',
        });
        this.getUsers();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' ثبت اطلاعات ',
          detail: response.data,
        });
      }
    });
  }

  deleteUser(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        this.service.deleteUser(this.localStorage.userToken, id).subscribe((response: any) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({
              severity: 'success',
              summary: ' حذف اطلاعات ',
              detail: response.data,
            });
            this.getUsers();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: ' حذف اطلاعات ',
              detail: response.data,
            });
          }
        });
      },
      reject: () => {
        // close
        this.confirmationService.close();
      },
    });
  }



}
