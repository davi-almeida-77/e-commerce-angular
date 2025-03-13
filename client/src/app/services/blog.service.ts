import { Injectable } from '@angular/core';
import { blogModel } from '../shared/models/blog.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private url = environment.apiUrl;

  constructor( private http: HttpClient ) {}

  getPosts(): Observable<blogModel[]> {
    return this.http.get<blogModel[]>(this.url + 'blog/posts');
  }

  getSinglePost(id: number): Observable<any> {
    return this.http.get(`${this.url + 'blog/posts'}/${id}`);
  }

}
