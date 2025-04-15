import { AfterViewChecked, AfterViewInit, Component, OnInit  } from '@angular/core';
import { ShoppingFacadeService } from '../../services/shopping-facade.service';
import { productModel } from '../../shared/models/product.model';
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
  bestSellers: any[] = [];

  constructor(
    private ShoppingService: ShoppingFacadeService,
  ) {}

  ngOnInit(): void {
    this.ShoppingService.getProducts().subscribe(
      ( data: productModel[] ) => {
        this.products = data;
      },
      ( error ) => {
        this.ShoppingService.alertError("Error on Load Products")
      }
    );

    this.ShoppingService.getBestSeller().subscribe(
      ( data ) => {
        this.bestSellers = data; 
      },
      ( error ) => {
        this.ShoppingService.alertError("Error fetching best sellers")
      }
    )

  }

  ngAfterViewInit(): void {
  
    if ( !this.swiperInitialized ) {
      this.initializeSwiper();
      this.swiperInitialized = true;  
    }
  }

  ngAfterViewChecked(): void {

    if ( this.products.length > 0 && !this.swiperInitialized ) {
      this.initializeSwiper();
      this.swiperInitialized = true;
    }
  }

  addToCart( product: productModel ): void {

    this.ShoppingService.addToCart( product )

  }

  addFavorites( product: productModel ) {

    this.ShoppingService.addToFavorites( product )
  
  }

  goToProduct( productId: number) {
      this.ShoppingService.goToProduct( productId )
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

}
