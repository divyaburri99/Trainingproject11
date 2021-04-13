import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { ProductsComponent } from './products/products.component';


const routes: Routes = [
  { path:"admincomp", component:AdminComponent},
  { path:'allproducts',component:ProductsComponent},
  {path:"editproduct",component:EditproductComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
