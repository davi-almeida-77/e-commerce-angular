import { ChangeDetectorRef, Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notification.service';
import { productModel } from '../../shared/models/product.model'; 
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FavoritesService } from '../../services/favorites.service';

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
    private cdr: ChangeDetectorRef,
    private favoritesService: FavoritesService
  ) {}  

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data: productModel[]) => {  
        this.products = data;
        this.calcLimits();  
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error on Load Products ',
          position: 'top-right',  
          showConfirmButton: false,   
          timer: 3000,  
          toast: true,  
          timerProgressBar: true 
        });
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

    if ( product ) {
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

    Swal.fire({
      icon: 'info',
      title: 'Reseted Filters',
      position: 'top-right',  
      showConfirmButton: false,   
      timer: 3000,  
      toast: true,  
      timerProgressBar: true 
    });
    this.cdr.detectChanges(); 
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

    
  }

