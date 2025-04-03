import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { productModel } from '../../shared/models/product.model';
import { CartService } from '../../services/cart.service';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, AfterViewChecked {

  products: productModel[] = [];
  swiperInitialized = false; 
  bestSellers: any[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      ( data: productModel[] ) => {
        this.products = data;
      },
      ( error ) => {

      }
    );

    this.productService.getBestSeller().subscribe(
      ( data ) => {
        this.bestSellers = data; 
      },
      ( error ) => {
        console.error('Error fetching best sellers:', error);
      }
    )

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
    if ( product ){ 
      Swal.fire({
        title: `  "${product.p_name}"  Added to Cart`, 
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
    this.cartService.addToCart({
      ...product,
      quantity: 1,
    });
  }

    addFavorites(product: productModel) {
      this.favoritesService.addToFavorites(product);
  
        if ( product ) {
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

  singleProductPage(productId: number): void {
    this.router.navigate([`/product/${productId}`]);
  }
}
