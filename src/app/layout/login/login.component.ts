import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LayoutService } from '../layout.service';
import { LocalStorageService } from 'src/app/auth/local-storage.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private service: LayoutService
    ,private router : Router,
    private localStorage: LocalStorageService, ){

  }
  ngOnInit(): void {
    // if (this.localStorage.getCurrentUser() && this.localStorage.userType == 'admin') {
    //   this.router.navigateByUrl('/panel');
    // }
    this.createform();
  }
  form: FormGroup | any;
  errorMessages = {
    mobile: [{ type: 'required', message: ' شماره همراه را وارد کنید.' },
   { type: 'maxlength', message: ' شماره موبایل باید 11 رقم باشد'},
   { type: 'minlength', message: ' شماره موبایل باید 11 رقم باشد' }]
  };
  login() {
    this.service.loginUser(this.form.value).subscribe((result: any) => {
      if(result.success === true){
        this.localStorage.removeCurrentUser();
        this.localStorage.saveCurrentUser(JSON.stringify(result.data));
        this.router.navigateByUrl('/user');
        console.log(this.localStorage.getCurrentUser());
      }else{
        console.log('eror')
      }
    }
    );
  }
  createform(){
    this.form = new FormGroup({
      mobile: new FormControl(null,Validators.compose([Validators.required]))
    })
  }
}
