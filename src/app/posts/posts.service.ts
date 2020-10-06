//#GETING POSTS FROM POST-CREATE AND POST-LIST ALSO KEEPING THE POSTS DATA IMMUTABLE
import { Post } from './post-model';
import { Injectable } from '@angular/core';
//A KIND OF EVENT EMITTER BUT USED IN BROADER USAGE
import { Subject } from 'rxjs';
//USING HTTPCLIENT TO GET TO BACKEND
import { HttpClient } from '@angular/common/http';
//USING MAP TO MAP SERVER _id TO CLIENTS id
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

//ALTOUGH I HAVE ADDED THIS SERVICE MANUALY BUT OTHER METHOD IS AS FOLLOWS
@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];

  //USING SUBJECT FROM RXJS
  //PAY ATTENTION TO PRIVATE WORDS
  private postsUpdated = new Subject<Post[]>();

  //USING HTTPCLIENT TO GET TO BACKEND
  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    //since its a reference type so using javascript typescript  "the spread operator " the next gen feature
    //TO MAKE THE TRUE COPY OF THE POST
    //TAKING THE ELEMENTS FROM posts ARRAY AND COPYING IT TO THIS NEW ARRAY
    //DOING THIS WILL NOT EFFECT MY ORIGINAL ARRAY posts TO AVOID UNWANTED MANUPULATION OF THE POST
    //return [...this.posts];
    //return this.posts;
    //USING HTTPCLIENT TO GET TO BACKEND
    this.http.get<{ message: string, posts: any/* Post[] */ }>('http://localhost:3000/api/posts')
      //CHANGING THAT PROBLEM OF _id AND id BEFORE SUBSCRIBE
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          }
        })
      }))
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdatedListener() {
    //returning an object that we can listen but we cant emmit we can emitt from this file but not from its reference to other files
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    //return {...this.posts.find(p => p.id === id)};
    return this.http.get<{_id: string, title: string, content: string}>('http://localhost:3000/api/posts/' + id )
  }




  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        //console.log(responseData.message);
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
        console.log('added post');
      });
    //this.posts.push(post);
    //USING FUNCTION OF SUBJECT FROM RXJS
    //this.postsUpdated.next([...this.posts]);
  }

  updatePost(id: string, title: string, content: string){
    const post:  Post = { id: id, title: title, content: content};
    this.http.put('http://localhost:3000/api/posts/' + id, post)
    .subscribe(responseData => {
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
      updatedPosts[oldPostIndex] = post;
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(["/"]);
      console.log(responseData);
    });

  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        //AFTER DELETING THE PAGE IS NOT REFRESED AUTOMATICALLY SO
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        //console.log(updatedPosts);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        console.log('Deleted!');
      });
  };

}
//BETTER WAY TO CALL GET POST IS TO USE EVENT DRIVEN APPROACH WHERE WE ACTIVELY PUSH THE INFORMATION ABOUT NEW POST BEING AVAILABLE THE COMPONENT WHICH ARE INTERESTED
//WE COULD USE EVENT EMITTER
//WE ARE USING RXJS DEPENDENCY OF THE ANGULAR CORE
//OBJECTS THAT HELP US PASS DATA AROUND


