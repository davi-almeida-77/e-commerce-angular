import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { BlogService } from '../../services/blog.service'; 
import { blogModel } from '../../shared/models/blog.model'; 
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  imports: [CommonModule]
})
export class PostComponent implements OnInit {
  postId!: number; 
  post: blogModel | null = null; 

  constructor(
    private route: ActivatedRoute, 
    private blogService: BlogService,

  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.postId = +params.get('id')!;
      this.loadPostData(); 
    });
  }

  loadPostData() {
    this.blogService.getSinglePost(this.postId).subscribe({
      next: (data) => {
        this.post = data;
        if (this.post?.content) {
          this.post.content = this.cutBlocks(this.post.content);
        }
      },
      error: (err) => {
          Swal.fire({
            icon: 'error',
            title: `Error`,
            text: 'Error on Loading Post',
            position: 'top-right',  
            showConfirmButton: false,   
            timer: 3000,  
            toast: true,  
            timerProgressBar: true 
          });
      },
    });
  }

  cutBlocks(text: string): string {
    const blocks = text.split('. ').filter(block => block.length > 0);
    const content = blocks
      .map(paragrafo => `<p>${paragrafo.trim()}.</p>`)
      .join('');
    return content;
  }
}
