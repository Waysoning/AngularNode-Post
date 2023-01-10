import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { Post } from './post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[]; postCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        'http://localhost:3001/api/post' + queryParams
      )
      .subscribe((postData) => {
        console.log(postData.message);
        this.posts = postData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: postData.maxPosts,
        });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: number) {
    return this.http.get<Post>('http://localhost:3001/api/post/' + id);
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    this.http
      .post<{ message: string; post: Post }>(
        'http://localhost:3001/api/post',
        postData
      )
      .subscribe((responseData) => {
        this.router.navigate(['/']);
      });
  }

  updatePost(id: number, title: string, content: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof image === 'string') {
      postData = { id, title, content, imagePath: image };
    } else {
      postData = new FormData();
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    }
    const postDatapost: Post = { id, title, content, imagePath: null };
    this.http
      .put<{ message: string; post: Post }>(
        'http://localhost:3001/api/post/' + id,
        postData
      )
      .subscribe((response) => {
        this.router.navigate(['/']);
      });
  }

  deletePost(postId: number) {
    return this.http.delete('http://localhost:3001/api/post/' + postId);
  }
}
