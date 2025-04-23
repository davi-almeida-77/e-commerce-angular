import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { ProductImage } from '../../shared/models/product.images';
import { productModel } from '../../shared/models/product.model';
import { ShoppingFacadeService } from '../../services/shopping-facade.service';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, AfterViewChecked {

  swiperInitialized = false;

  productId!: number; 
  product!: productModel; 
  images: ProductImage [] = [];
  relatedProducts: productModel [] = [];
  activeImageIndex: number = 0;
  quantityItems: number = 1;

  constructor(
    private ShoppingService: ShoppingFacadeService,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {

    window.scrollTo(0, 0);

    this.route.paramMap.subscribe((params) => {
      this.productId = +params.get('id')!; 
      this.getProduct();

    });
  }

  ngAfterViewChecked(): void {
    if ( !this.swiperInitialized && this.relatedProducts.length > 0 ) {
      this.initializeSwiper();
      this.swiperInitialized = true;
    }
  }

  getRelated() {
    this.ShoppingService.getProducts().subscribe((related) => {

      this.relatedProducts = related.filter(prod =>
        prod.model === this.product.model && prod.id_product !== this.productId
      );

    });
  }

  goToProduct( productId: number ) {
    window.scrollTo(0, 0); 
    
    this.ShoppingService.goToProduct( productId )
  }
  
  getProduct() {
    this.ShoppingService.getSingleProduct( this.productId ).subscribe({
      next: ( product ) => {
        this.product = product
        this.getRelated();
      }
    })
    this.ShoppingService.getProductImages( this.productId ).subscribe( {
        next: ( images ) => {
          this.images = images;
          if ( this.images.length > 0 ) {
            this.activeImageIndex = 0;
            this.getRelated();
          }
        }
    }) 
  }

  addToCart() {

    this.ShoppingService.addToCart( this.product, this.quantityItems);

  }

  addToFavorites() {
    
    this.ShoppingService.addToFavorites( this.product)

  }

  setActiveImage(index: number): void {
    this.activeImageIndex = index;
  }

  copyUrl () {
    const url = window.location.href;

    navigator.clipboard.writeText(url)

    this.ShoppingService.alertInfo("Copied url")

  }

  pickQuantity(incremento: number): void {
    this.quantityItems += incremento;  

    if (this.quantityItems < 1) {
      this.quantityItems = 1
    }
    
  }

  private initializeSwiper() {
    new Swiper('.swiper-container', {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 16,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false 
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        }
      }
    });
  }
  

}