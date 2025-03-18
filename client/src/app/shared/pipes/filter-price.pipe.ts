import { Pipe, PipeTransform } from '@angular/core';
import { productModel } from '../models/product.model';

@Pipe({
  name: 'FilterPrice',
  standalone: false,
})

export class FilterPrice implements PipeTransform {
  
  transform( products: productModel[], filter: string ): productModel[] {
    if ( !products || !filter ) {
      return products;
    }
  
    const sortedProducts = [ ...products ];
    
    switch ( filter ) {
      case 'highPrice':
        return sortedProducts.sort((a, b) => b.price - a.price);
      case 'lowPrice':
        return sortedProducts.sort((a, b) => a.price - b.price);
      case 'highAvaliation':
        return sortedProducts.sort((a, b) => b.avaliation - a.avaliation);
      default:
        return sortedProducts;
    }
  }
  
}
