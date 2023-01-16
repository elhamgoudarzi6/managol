import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/auth/local-storage.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  mobile: any;
  items: MenuItem[];
    constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    private service: UserService
  ) {
    this.items = [
      {
        label: 'داشبورد',
        routerLink: '/admin',
      },
      {
        label: 'کاربران',
        routerLink: '/admin/users',
      },
      {
        label: 'مدیران',
        routerLink: '/admin/administrators',
      },
      {
        label: 'نمایندگان',
        routerLink: '/admin/agents',
      }];
   }


  ngOnInit(): void {
    if (!this.localStorage.getCurrentUser() || this.localStorage.userType != 'user') {
      this.router.navigateByUrl('/login');
    } else {
      // this.service.getToken(this.localStorage.userID).subscribe((result: { success: boolean; }) => {
      //   if (result.success === false) {
      //     this.localStorage.removeCurrentUser();
      //     this.router.navigateByUrl('/login');
      //   }
      // });
    }

    this.mobile = this.localStorage.userMobile;

  }

  logOut() {
    this.localStorage.removeCurrentUser();
    this.router.navigateByUrl('/');
  }
}
