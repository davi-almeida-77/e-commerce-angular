import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { ProductService } from '../../services/product.service'; 
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  // imports: [FormsModule]
})
export class ProductComponent implements OnInit {
  productId!: number; 
  product: any; 
  quantity: number = 1;  


  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService,
    private cartService: CartService  
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
      },
      error: (err) => {
        console.error('Error on Loading Product:', err);
      },
    });
  }

  
  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart( {
        ...this.product,
        quantity: this.quantity,
      })
    }
  }

}
