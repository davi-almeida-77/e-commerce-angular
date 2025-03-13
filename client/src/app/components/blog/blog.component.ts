import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { blogModel } from '../../shared/models/blog.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

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
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.blogService.getPosts().subscribe(
      (posts: blogModel[]) => {  
        this.posts = posts;    
      },
      (error) => {
        this.notify.showError('Error in get Posts'); 
      }
    );
  }

  singlePostPage(postId: number): void {
    this.router.navigate([`/post/${postId}`]);
  }
  
}
