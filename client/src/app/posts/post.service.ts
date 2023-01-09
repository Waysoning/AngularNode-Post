import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Post } from './post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: Post[] }>('http://localhost:3001/api/post')
      .subscribe((postData) => {
        console.log(postData.message);
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: number) {
    return this.http.get<Post>('http://localhost:3001/api/post/' + id);
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title, content };
    this.http
      .post<{ message: string }>('http://localhost:3001/api/post', post)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  updatePost(id: number, title: string, content: string) {
    const post: Post = { id, title, content };
    this.http
      .put('http://localhost:3001/api/post/' + id, post)
      .subscribe((response) => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex((p) => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(postId: number) {
    this.http
      .delete('http://localhost:3001/api/post/' + postId)
      .subscribe(() => {
        console.log('Deleted!');
        const updatedPosts = this.posts.filter((post) => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
