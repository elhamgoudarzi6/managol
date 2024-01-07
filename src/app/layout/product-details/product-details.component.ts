import { Component, OnInit } from '@angular/core';
import { LayoutService } from './../layout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/auth/local-storage.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  responsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];
  product: any;
  id: any;
  currentUser: boolean=false;
  constructor(
    private router: Router,
    private service: LayoutService,
    private localStorage:LocalStorageService,
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.subscribe((params) => (this.id = params.get('id')));
  }

  ngOnInit(): void {
    this.currentUser=this.localStorage.getCurrentUser();
    this.service.getProduct(this.id).subscribe((response: any) => {
      if (response.success === true) {
        this.product = response.data;
      }
    });
  }

}


