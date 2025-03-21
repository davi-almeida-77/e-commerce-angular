import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { productModel } from '../../shared/models/product.model';
import { NotificationService } from '../../services/notification.service';
import { CartService } from '../../services/cart.service';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, AfterViewChecked {

  products: productModel[] = [];
  swiperInitialized = false;  

  constructor(
    private productService: ProductService,
    private notify: NotificationService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data: productModel[]) => {
        this.products = data;
      },
      (error) => {
        this.notify.showError('Error in Find Products');
      }
    );
  }

  ngAfterViewInit(): void {
  
    if (!this.swiperInitialized) {
      this.initializeSwiper();
      this.swiperInitialized = true;  
    }
  }

  ngAfterViewChecked(): void {

    if (this.products.length > 0 && !this.swiperInitialized) {
      this.initializeSwiper();
      this.swiperInitialized = true;
    }
  }

  private initializeSwiper() {
    new Swiper('.swiper-container', {
      loop: true,              
      slidesPerView: 4,      
      spaceBetween: 0,        
      autoplay: {
        delay: 3500,           
        disableOnInteraction: false, 
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,      
      },
      navigation: {
        nextEl: '.custom-next',
        prevEl: '.custom-prev',
      },
    });

  }

  addToCart(product: productModel): void {
    this.notify.showSuccess('Product added on Cart');
    this.cartService.addToCart({
      ...product,
      quantity: 1,
    });
  }


  isActivePrev: boolean = false;
  isActiveNext: boolean = false;


  toggleActive(button: 'prev' | 'next'): void {
    if (button === 'prev') {

      this.isActivePrev = !this.isActivePrev;
      if (this.isActivePrev) {
        this.isActiveNext = false; 
      }
    } else if (button === 'next') {

      this.isActiveNext = !this.isActiveNext;
      if (this.isActiveNext) {
        this.isActivePrev = false;
      }
    }
  }
}
