import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ViewportScroller } from '@angular/common';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];
  display:boolean | any;
  constructor(private viewportScroller: ViewportScroller) {
    this.items = [
      {
        label: 'صفحه اصلی',
        icon: 'pi pi-pw pi-home',
        command: event => this.onClick('home-sec')
      },
      {
        label: 'درباره ما',
        icon: 'pi pi-fw pi-info-circle',
        command: event => this.onClick('about-sec')
      },
      {
        label: 'خدمات',
        icon: 'pi pi-fw pi-th-large',
        command: event => this.onClick('services-sec')
      },
      {
        label: 'تماس با ما',
        icon: 'pi pi-fw pi-phone',
        command: event => this.onClick('contact-sec')
      },
    ];
  }

  ngOnInit(): void {
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

  showMenu(): void {
    this.display = true;
  }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);

    if (this.display === true) {
      this.display = false;
    }
  }

}
