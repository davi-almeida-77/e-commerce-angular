import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { productModel } from '../shared/models/product.model'; 
import { environment } from '../../environment/environment';
import { ProductImage } from '../shared/models/product.images';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = environment.apiUrl; 

  constructor(private http: HttpClient) { }

  getProducts(): Observable<productModel[]> {
    return this.http.get<productModel[]>(this.url + 'products');
  }

  getSingleProduct(id: number): Observable<any> {
    return this.http.get(`${this.url + 'products'}/${id}`);
  }

  getProductImages(id: number): Observable<ProductImage[]> {
    return this.http.get<ProductImage[]>(`${this.url}products/images/${id}`);
  }

  getBestSeller(): Observable<productModel[]> {
    return this.http.get<productModel[]>(this.url + 'products/most-sold');
  }
  
}
