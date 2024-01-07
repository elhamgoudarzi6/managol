import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../layout.service';

@Component({
  selector: 'app-products-cat',
  templateUrl: './products-cat.component.html',
  styleUrls: ['./products-cat.component.scss']
})

export class ProductsCatComponent implements OnInit {
  products: any[] = [];
  responsiveOptions: any[] | any;
  constructor(
    private service: LayoutService,
  ) {

  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.service.getAllCategory().subscribe((response: any) => {
      if (response.success === true) {
        this.products = response.data;
      } else {
        console.log('eror')
      }
    });
  }
}


