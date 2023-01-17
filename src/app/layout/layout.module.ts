import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroComponent } from './home/hero/hero.component';
import { ProductsComponent } from './home/products/products.component';
import { LoginComponent } from './login/login.component';
import { ServiceComponent } from './home/service/service.component';
import { AboutComponent } from './home/about/about.component';
import { PrimengListModule } from '../primeng-list.module';
@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    HeroComponent,
    ProductsComponent,
    LoginComponent,
    ServiceComponent,
    AboutComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengListModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutModule { }
