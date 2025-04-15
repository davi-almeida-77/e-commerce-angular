import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { productModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }
  
  image: string | undefined

  success( message: string ) {
    Swal.fire({ 
    icon: 'success', 
    title: message, 
    toast: true, 
    position: 'top-right',
    showConfirmButton: false, 
    timer: 3000 });
  }

  error( message: string ) {
    Swal.fire({ 
      icon: 'error', 
      title: 'Error', 
      text: message, 
      toast: true, 
      position: 'top-right',
      showConfirmButton: false,
      timer: 3000 });
  }

  info( message: string ) {
    Swal.fire({
      icon: 'info', 
      title: 'info', 
      text: message, 
      toast: true, 
      position: 'top-right',
      showConfirmButton: false,
      timer: 3000 });
  }
  
  showAddedToCart( product: productModel ) {
    Swal.fire({
      title: `  "${ product.p_name }"  Added to Cart`, 
      text: 'The Product Was Added on Cart ',
      icon: 'success',
      imageUrl: product.image,  
      imageWidth: 120,  
      imageHeight: 120,
      position: 'top-right',  
      showConfirmButton: false,   
      timer: 3000,  
      toast: true,  
      timerProgressBar: true  
    })
  }

  showMultipleAddedToCart( product: productModel, quantity: number ) {
    Swal.fire({
      title: ` "${ product.p_name }"  Added to Cart ${quantity}x `, 
      icon: 'success',
      imageUrl: product.image,  
      imageWidth: 120,  
      imageHeight: 120,
      position: 'top-right',  
      showConfirmButton: false,   
      timer: 3000,  
      toast: true,  
      timerProgressBar: true  
    })
  }

  showAddedToFavorites( product: productModel ) {
    Swal.fire({
      title: `  "${ product.p_name }"  Added to Favorites`, 
      text: 'The Product Was Added on Favorites List ',
      icon: 'success',
      imageUrl: product.image,  
      imageWidth: 120,  
      imageHeight: 120,
      position: 'top-right',  
      showConfirmButton: false,   
      timer: 3000,  
      toast: true,  
      timerProgressBar: true  
    });
  }


}
