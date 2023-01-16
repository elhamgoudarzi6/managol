import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/auth/local-storage.service';
import { AdminService } from './admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  showFiller = false;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private localStorage: LocalStorageService,
    private router: Router,
    private service: AdminService
  ) { }

  ngOnInit(): void {
    if (!this.localStorage.getCurrentUser() || this.localStorage.userType != 'admin') {
      this.router.navigateByUrl('/admin');
    } else {
      // this.service.getToken(this.localStorage.userID).subscribe((result: { success: boolean; }) => {
      //   if (result.success === false) {
      //     this.localStorage.removeCurrentUser();
      //     this.router.navigateByUrl('/login');
      //   }
      // });
    }

  }



}
