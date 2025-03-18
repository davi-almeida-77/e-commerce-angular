import { Pipe, PipeTransform } from '@angular/core';
import { productModel } from '../models/product.model';

@Pipe({
  name: 'FilterModel',
  standalone: false
})
export class FilterModel implements PipeTransform {
  transform( products: productModel[], model: string ): productModel[] {
    if ( !products || !model ) {
      return products;
    }

    const sortedProducts = [...products];


    if (model === 'Basketball') {
      return sortedProducts.filter(product => product.model === 'Basketball');
    }
    if (model === 'Casual') {
      return sortedProducts.filter(product => product.model === 'Casual');
    }
    if (model === 'Fashion') {
      return sortedProducts.filter(product => product.model === 'Fashion');
    }
    if (model === 'Running') {
      return sortedProducts.filter(product => product.model === 'Running');
    }

    return sortedProducts;
  }
}
