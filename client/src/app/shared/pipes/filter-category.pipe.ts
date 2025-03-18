import { Pipe, PipeTransform } from '@angular/core';
import { productModel } from '../models/product.model';

@Pipe({
  name: 'FilterCategory',
  standalone: false
})
export class FilterCategoryPipe implements PipeTransform {

  transform( products: productModel[], category: string ): productModel[] {
    if ( !products || !category ) {
      return products;
    }

    const sortedProducts =  [...products];

    switch ( category ) {
      case 'LOW':
      return sortedProducts.filter( product => product.category === "LOW")
    }
    switch ( category ) {
      case 'MID':
      return sortedProducts.filter( product => product.category === "MID")
    }
    switch ( category ) {
      case 'HIGH':
      return sortedProducts.filter( product => product.category === "HIGH")    

      default:
        return sortedProducts;
        
    }

  }

}
