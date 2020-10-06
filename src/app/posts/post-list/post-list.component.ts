
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post-model';
import { PostsService } from '../posts.service';
//import { throwToolbarMixedModesError } from '@angular/material/toolbar';

@Component({
  selector: 'app-post-list',
  templateUrl: 'post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
  /* posts = [
    {
    title: 'First Post',
    content: 'This is the first Post\'s content'
    },
    {
      title: 'Second Post',
      content: 'This is the Second Post\'s content'
    },
    {
      title: 'Third Post',
      content: 'This is the Third Post\'s content'
    },
    {
      title: 'Fourth Post',
      content: 'This is the fourth Post\'s content'
    }
]; */
  //CALLING GET FUN
  //THIS INPUT IS NOT REQUIRED BECAUSE IN SERVIVES WE FECHED THE COPY OF POST BEFORE WE ADD THEM
  //@Input() posts: Post[] = [];
  posts: Post[] = [];
  /* postService: PostsService;
  //GETING POSTS FROM POST-CREATE AND POST-LIST
  constructor(postsService: PostsService) {
    this.postService = postsService;
  } */
  isLoading  = false;
  private postsSub: Subscription;
  //THE ABOVE CAN BE DONE WITH ANGULAR PROPERTY AS
  constructor(public postsService: PostsService) {
  }
  //RECOMMENDED TO USE BASIC INITIALIZATION TASKS IN OnInit
  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    //USING RXJS FEATURE
    //HERE SUBSCRIBE HAS THREE POSSIBLE ARGUMENTS
    //1 FUCTION WHICH GET EXECUTED WHENEVER NEW DATA IS EMITTED
    //2 WHENEVER AN ERROR IS EMITTED
    //3 WHENEVER THE OBSERVEABLE IS COMPLETED I.E WHENEVER THERE ARE NO MORE VALUES TO BE EXECUTED

    this.postsSub = this.postsService.getPostUpdatedListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }

  //DELETE PROPERTY
  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
//USING GET POST
//FROM HERE OnInit is used
