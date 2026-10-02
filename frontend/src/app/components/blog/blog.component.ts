import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../../shared/models/blog.model';
import { BlogService } from '../../shared/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  posts: BlogPost[] = [];
  selected: BlogPost | null = null;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getAll().subscribe((p) => (this.posts = p));
  }

  open(post: BlogPost): void {
    this.selected = post;
    document.body.style.overflow = 'hidden';
  }

  close(): void {
    this.selected = null;
    document.body.style.overflow = '';
  }
}