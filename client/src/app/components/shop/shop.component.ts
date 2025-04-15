import { Component, OnInit } from '@angular/core';
import { productModel } from '../../shared/models/product.model'; 
import { ShoppingFacadeService } from '../../services/shopping-facade.service';

@Component({
  selector: 'app-shop',
  standalone: false,
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'], 
})
export class ShopComponent implements OnInit {
  products: productModel[] = []; 

  isCombinedFilter: boolean = false;

  filterCategory: string = '';
  filterPrice: string = '';
  filterModel: string = '';

  filteredProductCount: number = 0;
  itensByPage: number = 0; 

  currentLimit = this.itensByPage; 

  limits: number[] = []; 

  constructor(
    private ShoppingService: ShoppingFacadeService,
  ) {}  

  ngOnInit(): void {

    window.scrollTo(0, 0);

    this.ShoppingService.getProducts().subscribe(
      ( data: productModel[] ) => {  
        this.products = data;
        this.numberOfProducts();  
        this.filterByCombination(this.filterCategory, this.filterModel)
      },
      ( error ) => {
        this.ShoppingService.alertError(`on Load Products '${error}'`)
      }
    );

  }

  addToCart(product: productModel): void {

    this.ShoppingService.addToCart( product )

  }
  
  addFavorites( product: productModel ) {

    this.ShoppingService.addToFavorites( product )

  }

  goToProduct( productId: number ) {
    this.ShoppingService.goToProduct( productId )
  }

    filterByCombination( category: string, model: string): number {

      const combinatedProducts = this.products.filter(product => 
        product.model === model && product.category === category
      );

      this.filteredProductCount = combinatedProducts.length

      if ( this.filteredProductCount >  1) {
        this.isCombinedFilter = true;
      }
      if (this.filteredProductCount  < 1 ) {
        this.isCombinedFilter = false;
      }

      return this.filteredProductCount

    }

    changeLimit(newLimit: number): void {
      this.itensByPage = newLimit;
      this.currentLimit = newLimit;
    }
  
    resetFilters(): void {
      this.filterCategory = '';
      this.filterPrice = '';
      this.filterModel = '';
  
      this.changeLimit(this.currentLimit);
  
      this.ShoppingService.alertInfo("Reseted Filters")
  
    }

    numberOfProducts(): void {
      const totalProducts = this.products.length;
  
      const limits = [
        Math.floor(totalProducts / 1), 
        Math.floor(totalProducts / 2), 
        Math.floor(totalProducts / 3), 
      ];
  
      this.limits = limits.reverse();
      this.currentLimit = limits[0]; 
    }

  }

