import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { ProductService } from '../../services/product.service'; 
import { CartService } from '../../services/cart.service';
import { ProductImage } from '../../shared/models/product.images';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  productId!: number; 
  product: any; 
  quantity: number = 1;  
  images: ProductImage [] = [];
  activeImageIndex: number = 0;


  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService,
    private cartService: CartService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      this.productId = +params.get('id')!; 
      this.loadProductData(); 
    });
  }

  loadProductData() {
    this.productService.getSingleProduct(this.productId).subscribe({
      next: (data) => {
        this.product = data;
       
        this.productService.getProductImages(this.productId).subscribe({
          next: (images) => {
            this.images = images;
            if (this.images.length > 0) {
              this.activeImageIndex = 0; 
            }
          },
          error: (err) => {
            this.notify.showError('Error on Loading Images: ' + err);
          },
        });
      },
      error: (err) => {
        this.notify.showError('Error on Loading Product: ' + err);
      },
    });
  }
  
  addToCart() {
    this.notify.showSuccess('Sucess  ! Product Add On Cart ')
    if (this.product) {
      this.cartService.addToCart( {
        ...this.product,
        quantity: this.quantity,
      })
    }
  }

  setActiveImage(index: number): void {
    this.activeImageIndex = index;
  }

  copyUrl () {

    this.notify.showInfo('Copied url')

    const url = window.location.href;
    navigator.clipboard.writeText(url)
  }

  quantityItems: number = 1;


  pickQuantity(incremento: number): void {
    this.quantityItems += incremento;  

    if (this.quantityItems < 1) {
      this.quantityItems = 1
    }
  }

}