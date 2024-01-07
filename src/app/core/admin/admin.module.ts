import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatrialListModule } from '../../matrial-list.module';
import { PrimengListModule } from '../../primeng-list.module';
import { AdminRoutingModule } from './admin-routing.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { AdministratorsComponent } from './administrators/administrators.component';
import { AdministratorAddComponent } from './administrators/administrator-add/administrator-add.component';
import { AdministratorEditComponent } from './administrators/administrator-edit/administrator-edit.component';
import { AdministratorDetailsComponent } from './administrators/administrator-details/administrator-details.component';
import { AdministratorSecurityComponent } from './administrators/administrator-security/administrator-security.component';
import { OrderComponent } from './order/order.component';
import { AddOrderComponent } from './order/add-order/add-order.component';
import { FaqsComponent } from './faqs/faqs.component';
import { FaqAddComponent } from './faqs/faq-add/faq-add.component';
import { ProductsComponent } from './products/products.component';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { ContactComponent } from './contact/contact.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryAddDialogComponent } from './categories/category-add-dialog/category-add-dialog.component';
import { CategoryEditDialogComponent } from './categories/category-edit-dialog/category-edit-dialog.component';
import { EditOrderComponent } from './order/edit-order/edit-order.component';

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryAddDialogComponent,
    CategoryEditDialogComponent,
    AdminComponent,
    LoginComponent,
    DashboardComponent,
    UsersComponent,
    AddUserComponent,
    AdministratorsComponent,
    AdministratorAddComponent,
    AdministratorEditComponent,
    AdministratorDetailsComponent,
    AdministratorSecurityComponent,
    OrderComponent,
    AddOrderComponent,
    FaqsComponent,
    FaqAddComponent,
    ProductsComponent,
    ProductAddComponent,
    ContactComponent,
    ProductEditComponent,
    EditOrderComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    PrimengListModule,
    MatrialListModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }
