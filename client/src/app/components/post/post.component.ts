import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { BlogService } from '../../services/blog.service'; 
import { blogModel } from '../../shared/models/blog.model'; 
import { NotificationService } from '../../services/notification.service'; 
import { CommonModule } from '@angular/common';

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
    private notify: NotificationService
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
        this.notify.showError('Error on Loading Post: ');
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
