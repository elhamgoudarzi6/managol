import { Component,OnInit } from '@angular/core';
import { LayoutService } from '../../layout.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  
  Products:any[] |any;
  
  constructor(private service: LayoutService ){

  }
  ngOnInit(): void {

    // this.Products=[{image:"../../../../assets/images/mobile.png",title:"گوشی موبایل",price:100000},
    //                {image:"../../../../assets/images/digital.png",title:"کالای دیجیتال",price:50000},
    //                {image:"../../../../assets/images/sport.png",title: "ورزشی",price:100000},
    //                {image:"../../../../assets/images/book.png",title:"کتاب",price:100000},
    //                ]
    
 this.getproperty();
  }
 
  getproperty(){
    this.service.getAllproperties().subscribe((response: any) => {

      if(response.success === true){
        console.log(response)
        this.Products = response.data;
      }else{
        console.log('eror')
      }
    }
    );
  }
}

