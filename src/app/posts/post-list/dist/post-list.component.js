"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PostListComponent = void 0;
var core_1 = require("@angular/core");
//import { throwToolbarMixedModesError } from '@angular/material/toolbar';
var PostListComponent = /** @class */ (function () {
    //THE ABOVE CAN BE DONE WITH ANGULAR PROPERTY AS
    function PostListComponent(postsService) {
        this.postsService = postsService;
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
        this.posts = [];
        /* postService: PostsService;
        //GETING POSTS FROM POST-CREATE AND POST-LIST
        constructor(postsService: PostsService) {
          this.postService = postsService;
        } */
        this.isLoading = false;
    }
    //RECOMMENDED TO USE BASIC INITIALIZATION TASKS IN OnInit
    PostListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.postsService.getPosts();
        //USING RXJS FEATURE
        //HERE SUBSCRIBE HAS THREE POSSIBLE ARGUMENTS
        //1 FUCTION WHICH GET EXECUTED WHENEVER NEW DATA IS EMITTED
        //2 WHENEVER AN ERROR IS EMITTED
        //3 WHENEVER THE OBSERVEABLE IS COMPLETED I.E WHENEVER THERE ARE NO MORE VALUES TO BE EXECUTED
        this.postsSub = this.postsService.getPostUpdatedListener()
            .subscribe(function (posts) {
            _this.isLoading = false;
            _this.posts = posts;
        });
    };
    //DELETE PROPERTY
    PostListComponent.prototype.onDelete = function (postId) {
        this.postsService.deletePost(postId);
    };
    PostListComponent.prototype.ngOnDestroy = function () {
        this.postsSub.unsubscribe();
    };
    PostListComponent = __decorate([
        core_1.Component({
            selector: 'app-post-list',
            templateUrl: 'post-list.component.html',
            styleUrls: ['./post-list.component.css']
        })
    ], PostListComponent);
    return PostListComponent;
}());
exports.PostListComponent = PostListComponent;
//USING GET POST
//FROM HERE OnInit is used
