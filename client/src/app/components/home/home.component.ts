import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { productModel } from '../../shared/models/product.model';
import { NotificationService } from '../../services/notification.service';
import { CartService } from '../../services/cart.service';
// import Swiper from 'swiper/bundle';  
// import 'swiper/swiper-bundle.min.css';  

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: productModel[] = [];

  constructor( 
    private productService: ProductService,
    private notify: NotificationService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data: productModel[]) => {  
        this.products = data; 

        // setTimeout(() => {
        //   new Swiper('.swiper-container', {
        //     slidesPerView: 4, 
        //     spaceBetween: 20, 
        //     navigation: {
        //       nextEl: '.swiper-button-next',
        //       prevEl: '.swiper-button-prev',
        //     },
        //     pagination: {
        //       el: '.swiper-pagination',
        //       clickable: true,
        //     },
        //     breakpoints: {
        //       640: {
        //         slidesPerView: 1,
        //         spaceBetween: 10,
        //       },
        //       1024: {
        //         slidesPerView: 3,
        //         spaceBetween: 20,
        //       },
        //     },
        //   });
        // });
      },

      
      (error) => {
        this.notify.showError('Error in Find Products ');
      }
    );
  }

  addToCart(product: productModel): void {
    this.notify.showSuccess('Product added on Cart ');
    this.cartService.addToCart({
      ...product,
      quantity: 1,
    });
  }
}
