import { Pipe, PipeTransform } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  constructor(private toastr:ToastrService){}
  transform(products: any[], category: string): any[] {
    if(!category){
      
      return products;
    }
    
    else {
     let category= products.filter(obj=>obj.category.toLowerCase().indexOf(category.toLowerCase())!==-1);
      if(category.length!==0){
        return category;
      }
      else{
      //  this.toastr.error("No Results matched your search");
        return products;
      }
    }
  }

}
