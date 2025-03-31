import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProductComponent } from './components/product/product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './components/shop/shop.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';


import { FilterModel } from './shared/pipes/filter-model.pipe';
import { FilterCategoryPipe } from './shared/pipes/filter-category.pipe';
import { FilterPrice } from './shared/pipes/filter-price.pipe';

import { IMAGE_CONFIG } from '@angular/common';
import { ProfileUpdateComponent } from './components/profile/profile.component';
import { FavoritesComponent } from './components/favorites/favorites.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,  
    LoginComponent,
    RegisterComponent,
    CheckoutComponent,
    FooterComponent,
    ProductComponent,
    ShopComponent,
    PageNotFoundComponent,
    FilterCategoryPipe,
    FilterModel,
    FilterPrice,
    ProfileUpdateComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    MatSnackBarModule,
    MatButtonModule,
    MatMenuModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatTabsModule,
    MatDividerModule,
    MatDialogModule
],
  providers: [
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
