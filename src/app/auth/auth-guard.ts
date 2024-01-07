import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private userType: any;
  private accessLevel: any;
  result: boolean = false;
  title: any;

  constructor(private localstorage: LocalStorageService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.localstorage.getCurrentUser() === true) {
      this.userType = this.localstorage.userJson['type'];
      this.accessLevel = this.localstorage.userJson['accessLevel'];
      // console.log(route['routeConfig']?.path)
      if (this.userType === 'admin') {
        switch (state.url.replace("/admin/", "")) {
          case "orders":
            this.title = 'لیست سفارشات';
            break;
          case "products":
            this.title = 'لیست محصولات';
            break;
          case "users":
            this.title = "کاربران";
            break;
          case "contact":
            this.title = 'مدیریت پیام ها';
            break;
          case "faqs":
            this.title = 'سوالات متداول';
            break;
          case "config":
            this.title = 'مدیران';
            break;
          case "category":
            this.title = 'دسته بندی محصول';
            break;
        }

        this.result = this.accessLevel.filter((item: any) =>
          item.title === this.title).length > 0
        if (this.result === true) return true;
        this.router.navigate(['/panel']);
        return false;
      }
    }
    else {
      this.router.navigate(['/']);
      return false;
    }
    throw new Error('Method not implemented.');
  }

}
