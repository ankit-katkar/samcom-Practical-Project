import { Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
    {path: '', component:UserLoginComponent},
    {path:'products', component:ProductsComponent}
];
