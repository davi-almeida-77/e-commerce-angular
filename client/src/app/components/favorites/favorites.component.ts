import { Component, OnInit } from '@angular/core';
import { ShoppingFacadeService } from '../../services/shopping-facade.service';

@Component({
  selector: 'app-favorites',
  standalone: false,
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})

export class FavoritesComponent implements OnInit {

  favoriteStored: string | null = localStorage.getItem('favorites');
  parsedFavorites: any = null;
  favoritesExists: boolean = false;
  favoriteList: any [] = [];

  constructor ( 
    private ShoppingService: ShoppingFacadeService,
   ) {}

  ngOnInit(): void {

    this.checkFavorites();

  }

  Clean() {
    this.ShoppingService.cleanFavorites();

    this.ShoppingService.alertSuccess('Cleaned Favorites')

    this.ShoppingService.Navigate('/')
        
  }

  checkFavorites() {
  
    if ( this.favoriteStored) {
      this.parsedFavorites =  JSON.parse( this.favoriteStored )
      this.favoriteList = this.parsedFavorites;
    }
    if ( this.favoriteStored) {
      this.favoritesExists =  true;
    }

  }

}
