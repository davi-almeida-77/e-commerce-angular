import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { blogModel } from '../../shared/models/blog.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blog',
  standalone: true,
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  imports: [CommonModule]
})
export class BlogComponent implements OnInit {

  posts: blogModel[] = [];

  constructor( 
    private blogService: BlogService, 
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.blogService.getPosts().subscribe(
      (posts: blogModel[]) => {  
        this.posts = posts;    
      },
      (error) => {
            Swal.fire({
                title: `Error in Get Posts`, 
                icon: 'error',
                position: 'top-right',  
                showConfirmButton: false,   
                timer: 2000,  
                toast: true,  
                timerProgressBar: true  
              });
      }
    );
  }

  singlePostPage(postId: number): void {
    this.router.navigate([`/post/${postId}`]);
  }
  
}
