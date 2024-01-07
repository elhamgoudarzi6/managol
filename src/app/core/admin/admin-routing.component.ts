import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { AdministratorsComponent } from './administrators/administrators.component';
import { OrderComponent } from './order/order.component';
import { FaqsComponent } from './faqs/faqs.component';
import { ProductsComponent } from './products/products.component';
import { ContactComponent } from './contact/contact.component';
import { AuthGuard } from 'src/app/auth/auth-guard';
import { CategoriesComponent } from './categories/categories.component';
const routes: Routes = [
  {
    path: 'panel',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
    ],
  },
  {
    path: 'users',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: UsersComponent,
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'category',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: CategoriesComponent,
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'faqs',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: FaqsComponent,
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'contact',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: ContactComponent,
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'products',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: ProductsComponent,
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'orders',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: OrderComponent,
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'config',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: AdministratorsComponent,
      },
    ],
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }