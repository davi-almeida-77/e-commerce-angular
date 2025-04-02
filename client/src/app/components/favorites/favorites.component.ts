import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    private router: Router
   ) {}

  ngOnInit(): void {

    this.checkFavorites();
    this.checkQuantity();

  }

  cleanFavorites() {
    localStorage.removeItem('favorites');
      Swal.fire({
          title: `Cleaned Favorites `, 
          text: 'Clean Favorite List',
          icon: 'success',
          position: 'top-right',  
          showConfirmButton: false,   
          timer: 3000,  
          toast: true,  
          timerProgressBar: true  
        });
        this.router.navigate(['/']);  
  }


  checkQuantity() {
    const quantity = this.favoriteList.length;
    console.log( quantity )
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
