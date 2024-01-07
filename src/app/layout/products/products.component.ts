import { Component, OnInit } from '@angular/core';
import { LayoutService } from './../layout.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})

export class ProductsComponent implements OnInit {
  cats: any[] = [];
  products: any[] = [];
  displayFilter = false;
  index: number = 0;
  keywords: any;
  metaData: any;
  constructor(
    private service: LayoutService,
    private route: ActivatedRoute) { }

  resetIndex(i: any): void {
    this.index = i;
  }

  ngOnInit(): void {
    // this.route.paramMap.subscribe((params) => { this.categoryId = params.get('id') });
    // [queryParams]="{id:product._id}"
    this.getCat();
    this.getProducts();
    console.log(this.keywords, this.metaData);

  }

  openFilter(): void {
    this.displayFilter = true;
  }

  getProducts() {
    let data;
    if (window.history.state.catID != undefined) {
      this.keywords = window.history.state.keywords;
      this.metaData = window.history.state.metaData;
      data = {
        categoryID: window.history.state.catID,
        updatedAt: -1,
      };
    } else if (window.history.state.catID == undefined) {
      data = {
        updatedAt: -1,
      };
    }
    else {
      data = {
        updatedAt: -1,
      };
    }
    this.service.advanceSearchProduct(data).subscribe((response: any) => {
      if (response.success === true) {
        this.products = response.data;
      }
    });
  }

  getCat() {
    this.service.getAllCategory().subscribe((response: any) => {
      if (response.success === true) {
        this.cats = response.data;
      }
    });
  }

  goProduct(catId: any): any {
    let data;
    if (catId == '0') {
      data = {
        updatedAt: -1,
      };
    } else if (catId !== '0') {
      let cat = this.cats.filter((item) => item._id == catId)[0];
      this.keywords = cat.keywords;
      this.metaData = cat.metaData;
      data = {
        categoryID: catId,
        updatedAt: -1,
      };
    }
    this.service.advanceSearchProduct(data).subscribe((response: any) => {
      if (response.success === true) {
        this.products = response.data;
      }
    });
  }
}
