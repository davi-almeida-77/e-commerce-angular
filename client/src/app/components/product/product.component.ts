import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { ProductImage } from '../../shared/models/product.images';
import { productModel } from '../../shared/models/product.model';
import { ShoppingFacadeService } from '../../services/shopping-facade.service';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {

  productId!: number; 
  product!: productModel; 
  images: ProductImage [] = [];
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

  getProduct() {
    this.ShoppingService.getSingleProduct( this.productId ).subscribe({
      next: ( product ) => {
        this.product = product
      }
    })
    this.ShoppingService.getProductImages( this.productId ).subscribe( {
        next: ( images ) => {
          this.images = images;
          if ( this.images.length > 0 ) {
            this.activeImageIndex = 0;
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


}