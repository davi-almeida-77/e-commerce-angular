import { ChangeDetectorRef, Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notification.service';
import { productModel } from '../../shared/models/product.model'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  standalone: false,
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'], 
})
export class ShopComponent implements OnInit, OnChanges {
  products: productModel[] = []; 


  activeClass: boolean  = false;

  filterCategory: string = '';
  filterPrice: string = '';
  filterModel: string = '';

  itensByPage: number = 0; 
  currentLimit = this.itensByPage; 

  limits: number[] = []; 

  constructor(
    private productService: ProductService, 
    private router: Router,
    private cartService: CartService,
    private notify: NotificationService,
    private cdr: ChangeDetectorRef
  ) {}  

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data: productModel[]) => {  
        this.products = data;
        this.calcLimits();  
      },
      (error) => {
        this.notify.showError('Error in Find Products');
      }
    );

    window.scrollTo(0, 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products']) {
      this.calcLimits(); 
    }
  }


  calcLimits(): void {
    const totalProducts = this.products.length;


    const limits = [
      Math.floor(totalProducts / 1), 
      Math.floor(totalProducts / 2), 
      Math.floor(totalProducts / 3), 
    ];

    this.limits = limits.reverse();
    this.currentLimit = limits[2]; 
  }


  singleProductPage(productId: number): void {
    this.router.navigate([`/product/${productId}`]);
  }


  addToCart(product: productModel): void {
    this.notify.showSuccess('Product added on Cart');
    this.cartService.addToCart({
      ...product,
      quantity: 1,
    });
  }


  toggleActive(): void { 
    this.activeClass = !this.activeClass;
  }


  changeLimit(newLimit: number): void {
    this.itensByPage = newLimit;
    this.currentLimit = newLimit;
    this.cdr.detectChanges(); 
  }

  resetFilters(): void {
    this.filterCategory = '';
    this.filterPrice = '';
    this.filterModel = '';

    this.changeLimit(this.currentLimit);

    this.notify.showInfo('Reseted Filters');
    this.cdr.detectChanges(); 
  }
}
