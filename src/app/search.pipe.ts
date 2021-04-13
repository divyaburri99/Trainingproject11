import { Pipe, PipeTransform } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  constructor(private toastr:ToastrService){}

  transform(products: any[], searchTerm: string): any[] {
    if(!searchTerm){
      
      return products;
    }
    
    else{
    
       let productname=products.filter(obj=>obj.productname.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1);
       let brand=products.filter(obj=>obj.brand.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1);
       let category=products.filter(obj=>obj.category.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1);
    
       if(category.length!==0){
         return category;
       }
       else if(productname.length!==0){
        return productname;
      }
       else if(brand.length!==0){
         return brand;
       }
       else{
       //  this.toastr.error("No Results matched your search");
         return products;
       }
    }
  }

}
