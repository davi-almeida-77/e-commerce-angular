import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { CartService } from './cart.service';
import { FavoritesService } from './favorites.service';
import { AlertsService } from '../shared/services/alerts.service';
import { productModel } from '../shared/models/product.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ShoppingFacadeService {

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private favoritesService: FavoritesService,
    private alert: AlertsService,
    private router: Router
  ) { }

  getProducts(): Observable<productModel[]> {
    return this.productService.getProducts(); 
  }

  getSingleProduct( id: number ): Observable <any> {
    return this.productService.getSingleProduct( id )
  }

  getBestSeller(): Observable<productModel[]> {
    return this.productService.getBestSeller();
  }

  getProductImages ( id: number): Observable <any> {
    return this.productService.getProductImages( id )
  }
  
  addToCart(product: productModel): void;
  addToCart(product: productModel, quantity: number): void;
  addToCart(product: productModel, quantity?: number): void {
    const quantityToAdd = quantity && quantity > 1 ? quantity : 1;

    const productWithQuantity = {
      ...product,
      quantity: quantityToAdd
    };

    if (  quantityToAdd > 1) {
      this.cartService.addToCart( productWithQuantity )
      this.alert.showMultipleAddedToCart(productWithQuantity, quantityToAdd);
    }
    else {
      this.cartService.addToCart( product )
      this.alert.showAddedToCart( product )
    }

  }

  getTotalItens(): Observable<number> {
    return this.cartService.getTotalItems();
  }

  getCartItems() {
    return this.cartService.getCartItems();
  } 
  
  resetCart () {
    this.cartService.resetCart()
    this.alert.success("Cleaned Cart")
  }

  getTotalPrice() {
    return this.cartService.getTotalPrice();
  }

  goToProduct( productId: number ) {
    this.router.navigate([`/product/${productId}`])
  }

  addToFavorites ( product: productModel ) {
    this.favoritesService.addToFavorites( product )
    this.alert.showAddedToFavorites( product )
  }

  getFavoritesLengthObservable (): Observable<number>{
      return this.favoritesService.getFavoritesLengthObservable();
  }

  alertSuccess( message: string ) {
    this.alert.success( message)
  }

  alertError( message: string ) {
    this.alert.error( message)
  }

  alertInfo( message: string ) {
    this.alert.info( message)
  }

}
