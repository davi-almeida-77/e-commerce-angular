import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { productModel } from '../shared/models/product.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {

  private favoritesLengthSubject: BehaviorSubject<number>;

  constructor() {

    const initialLength = this.getFavoritesLength();
    this.favoritesLengthSubject = new BehaviorSubject<number>(initialLength);

  }

  private updateFavoritesLength(): void {
    const length = this.getFavoritesLength();
    this.favoritesLengthSubject.next(length);
  }

  getFavoritesLength() {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites).length : 0;
  }

  getFavoritesLengthObservable(): Observable<number> {
    return this.favoritesLengthSubject.asObservable();
  }

  cleanFavorites() {
    localStorage.removeItem('favorites')

    this.updateFavoritesLength();
  }

  isFavorite(product: any): boolean {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.some((fav: any) => fav.id_product === product.id_product);
  }

  addToFavorites(product: any): void {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    

    const isFavorite = favorites.some((fav: any) => fav.id_product === product.id_product);

    if ( !isFavorite )  {
      favorites.push(product);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    this.updateFavoritesLength();

  }


}
