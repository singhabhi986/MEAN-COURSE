import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Post } from '../post-model';
//Ng Form removed as reactive approach
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: 'post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit {
  /* newPost = 'No content'; */
  //enteredValue is used in taking input value;
  enteredContent = '';
  enteredTitle = '';
  post: Post;
  isLoading = false;
  form: FormGroup;
  private mode = "create";
  private postId: string;

  ngOnInit() {
    this.form = new FormGroup({
      'title': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      'content': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      'image': new FormControl(null, {
        validators: [Validators.required]
      })
    })
    this.route.paramMap.subscribe((ParamMap: ParamMap) => {
      if (ParamMap.has('postId')) {
        this.mode = "edit";
        this.postId = ParamMap.get('postId');
        //this.post = this.postsService.getPost(this.postId);
        //
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postDate => {
          //
          this.isLoading = false;
          this.post = {
            id: postDate._id,
            title: postDate.title,
            content: postDate.content
          };
          this.form.setValue({
            'title': this.post.title,
            'content': this.post.content
          })
        });
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }
  /* //EVENT BINDING
  @Output()
  postCreated = new EventEmitter<Post>(); */


  //CALLING GET POST DONT NEED EventEmitter ANYMORE
  constructor(public postsService: PostsService, public route: ActivatedRoute) {

  }
  /* onAddPost() {
    //alert('Post Added!');
    this.newPost = "The newPost added!";
  } */
  //USING THE INPUT VALUE
  /* onAddPost(postInput:HTMLTextAreaElement){
    //console.log(postInput.value);
    this.newPost = postInput.value;
  } */


  OnImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement ).files[0];
    this.form.patchValue({Image: file});
    this.form.get('image').updateValueAndValidity();
    console.log(file);
    console.log(this.form);
  }

  //TEMPLATE DRIVEN METHOD
  //onSavePost(form: NgForm) {
  //NEW METHOD
  onSavePost() {
    //VALIDATION MANUALY TO BE DONE
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    //this.newPost = this.enteredValue;
    //dont need below as using constructor now.
    /*  //To emit this rendered doc we need eventEmitter binding .
      const post: Post = {
       title: form.value.title,
       content: form.value.content
     };
     //PASSING POST AS AN ARGUMENT FUCTION IN EVENTEMITTER
     //this.postCreated.emit(post); */
    //CALLING GET POST
    if (this.mode === "create") {
      this.postsService.addPost(this.form.value.title, this.form.value.content);
    }
    else {
      this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content);
    }

    //form.resetForm();
    this.form.reset();
  }
};
