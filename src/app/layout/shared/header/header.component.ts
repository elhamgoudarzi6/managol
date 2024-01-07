import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ViewportScroller } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { MegaMenuItem } from 'primeng/api';
import { LayoutService } from './../../layout.service';
import * as Globals from '../../../config';
import { LocalStorageService } from './../../../auth/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {
  items2: MegaMenuItem[] | any;
  megaMenu: MegaMenuItem[] = [];
  panelMenu: MenuItem[] = [];
  items: MenuItem[] | any;
  display = false;
  currentLang: any;
  langs: any[] = [];
  state: any;
  currentUser: boolean = false;
  type: any;
  cats: any[] = [];
  switchLanguage(lang: any) {
    this.translate.use(lang);
    this.currentLang = lang;
    this.state = {
      'lang': this.currentLang,
    }
  }

  constructor(
    private localStorage: LocalStorageService,
    private service: LayoutService,
    private router: Router,
    private viewportScroller: ViewportScroller,
    public translate: TranslateService) {
    translate.addLangs(['fa', 'en', 'ru', 'ar']);
    //  translate.setDefaultLang('fa');
    this.langs = [{ title: 'fa' }, { title: 'en' }, { title: 'ru' }, { title: 'ar' }];

  }

  setPanelMenu() {
    let subList: MenuItem[];
    this.panelMenu.push({
      label: 'همه محصولات',
      command: () => this.router.navigateByUrl('/products')
    });
    this.cats.forEach((cat: any) => {
      subList = [];
      if (cat.SubCategory.length > 0) {
        subList.push({
          label: 'همه',
          command: () => this.router.navigateByUrl('/products', { state: { catID: cat._id } })
        });
        cat.SubCategory.forEach((sub: any) => {
          subList.push({
            label: sub.title,
            command: () => this.router.navigateByUrl('/products', { state: { catID: cat._id, subID: sub._id } })
          });
        });
        this.panelMenu.push({
          label: cat.title,
          items: subList,
        });
      } else {
        this.panelMenu.push({
          label: cat.title,
          command: () => this.router.navigateByUrl('/products', { state: { catID: cat._id } })
        });
      }
    });
  }

  setMegaMenu() {
    let subList: MenuItem[][];
    this.megaMenu.push({
      label: 'همه محصولات',
      command: () => this.router.navigateByUrl('/products')
    });
    this.cats.forEach((cat: any) => {
      subList = [];
      if (cat.SubCategory.length > 0) {
        subList.push([{
          label: 'همه',
          command: () => this.router.navigateByUrl('/products', { state: { catID: cat._id } })
        }]);
        cat.SubCategory.forEach((sub: any) => {
          subList.push([{
            label: sub.title,
            command: () => this.router.navigateByUrl('/products', { state: { catID: cat._id, subID: sub._id } })
          }]);
        });
        this.megaMenu.push({
          label: cat.title,
          items: subList,
        });
      } else {
        this.megaMenu.push({
          label: cat.title,
          command: () => this.router.navigateByUrl('/products', { state: { catID: cat._id } })
        });
      }
    });
  }
  ngOnInit(): void {
    this.service.getAllCategory().subscribe((response: any) => {
      if (response.success === true) {
        this.cats = response.data;
        this.setPanelMenu();
        this.setMegaMenu();
      }
    });
    console.log(this.megaMenu);

    this.items = [
      {
        label: 'صفحه اصلی',
        icon: 'pi pi-pw pi-home',
        command: () => this.onClick('hero')
      },
      {
        label: 'محصولات',
        items: this.panelMenu,
        icon: 'pi pi-fw pi-shopping-bag',
      },
      {
        label: 'سوالات متداول',
        icon: 'pi pi-fw pi-question-circle',
        command: () => this.router.navigateByUrl('/faq', { state: { lang: this.currentLang } })
      },
      {
        label: 'درباره ما',
        icon: 'pi pi-fw pi-info-circle',
        command: () => this.onClick('about')
      },
      {
        label: 'تماس با ما',
        icon: 'pi pi-fw pi-phone',
        command: () => this.onClick('contact')
      },
    ];

    this.items2 = [
      {
        label: 'صفحه اصلی',
        // icon: 'pi pi-fw pi-home',
        command: () => this.onClick('hero')
      },
      {
        label: 'محصولات',
        // icon: 'pi pi-fw pi-list',
        items: this.megaMenu
      },
      {
        label: 'سوالات متداول',
        // icon: 'pi pi-fw pi-home',
        command: () => this.router.navigateByUrl('/faq', { state: { lang: this.currentLang } })
      },
      {
        label: 'درباره ما',
        // icon: 'pi pi-info-circle',
        command: () => this.onClick('about')
      },
      {
        label: 'تماس با ما',
        // icon: 'pi pi-fw pi-phone',
        command: () => this.onClick('contact')
      },
    ];
    console.log(this.items2);


    this.currentUser = this.localStorage.getCurrentUser();
    this.type = this.localStorage.userType;
    this.state = {
      'lang': this.currentLang,
    }
    var pc = window.document.getElementById('scroll')!;
    var pcSticky = 0;
    if (pc !== null) {
      pcSticky = pc.offsetTop;
    }
    window.addEventListener('scroll', scroll, true);
    function scroll() {
      if (pc !== undefined) {
        if (window.pageYOffset > pcSticky) {
          pc.classList.add('sticky');
        } else {
          pc.classList.remove('sticky');
        }
      }
    }
  }

  redirect() {
    this.router.navigateByUrl('/faq', { state: { lang: this.currentLang } });
  }

  showMenu(): void {
    this.display = true;
  }

  onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
    if (this.display === true) {
      this.display = false;
    }
  }

}
