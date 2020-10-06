"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.PostsService = void 0;
var core_1 = require("@angular/core");
//A KIND OF EVENT EMITTER BUT USED IN BROADER USAGE
var rxjs_1 = require("rxjs");
//USING MAP TO MAP SERVER _id TO CLIENTS id
var operators_1 = require("rxjs/operators");
//ALTOUGH I HAVE ADDED THIS SERVICE MANUALY BUT OTHER METHOD IS AS FOLLOWS
var PostsService = /** @class */ (function () {
    //USING HTTPCLIENT TO GET TO BACKEND
    function PostsService(http, router) {
        this.http = http;
        this.router = router;
        this.posts = [];
        //USING SUBJECT FROM RXJS
        //PAY ATTENTION TO PRIVATE WORDS
        this.postsUpdated = new rxjs_1.Subject();
    }
    PostsService.prototype.getPosts = function () {
        var _this = this;
        //since its a reference type so using javascript typescript  "the spread operator " the next gen feature
        //TO MAKE THE TRUE COPY OF THE POST
        //TAKING THE ELEMENTS FROM posts ARRAY AND COPYING IT TO THIS NEW ARRAY
        //DOING THIS WILL NOT EFFECT MY ORIGINAL ARRAY posts TO AVOID UNWANTED MANUPULATION OF THE POST
        //return [...this.posts];
        //return this.posts;
        //USING HTTPCLIENT TO GET TO BACKEND
        this.http.get('http://localhost:3000/api/posts')
            //CHANGING THAT PROBLEM OF _id AND id BEFORE SUBSCRIBE
            .pipe(operators_1.map(function (postData) {
            return postData.posts.map(function (post) {
                return {
                    title: post.title,
                    content: post.content,
                    id: post._id
                };
            });
        }))
            .subscribe(function (transformedPosts) {
            _this.posts = transformedPosts;
            _this.postsUpdated.next(__spreadArrays(_this.posts));
        });
    };
    PostsService.prototype.getPostUpdatedListener = function () {
        //returning an object that we can listen but we cant emmit we can emitt from this file but not from its reference to other files
        return this.postsUpdated.asObservable();
    };
    PostsService.prototype.getPost = function (id) {
        //return {...this.posts.find(p => p.id === id)};
        return this.http.get('http://localhost:3000/api/posts/' + id);
    };
    PostsService.prototype.addPost = function (title, content) {
        var _this = this;
        var post = { id: null, title: title, content: content };
        this.http.post('http://localhost:3000/api/posts', post)
            .subscribe(function (responseData) {
            //console.log(responseData.message);
            var id = responseData.postId;
            post.id = id;
            _this.posts.push(post);
            _this.postsUpdated.next(__spreadArrays(_this.posts));
            _this.router.navigate(["/"]);
            console.log('added post');
        });
        //this.posts.push(post);
        //USING FUNCTION OF SUBJECT FROM RXJS
        //this.postsUpdated.next([...this.posts]);
    };
    PostsService.prototype.updatePost = function (id, title, content) {
        var _this = this;
        var post = { id: id, title: title, content: content };
        this.http.put('http://localhost:3000/api/posts/' + id, post)
            .subscribe(function (responseData) {
            var updatedPosts = __spreadArrays(_this.posts);
            var oldPostIndex = updatedPosts.findIndex(function (p) { return p.id === post.id; });
            updatedPosts[oldPostIndex] = post;
            _this.posts = updatedPosts;
            _this.postsUpdated.next(__spreadArrays(_this.posts));
            _this.router.navigate(["/"]);
            console.log(responseData);
        });
    };
    PostsService.prototype.deletePost = function (postId) {
        var _this = this;
        this.http["delete"]('http://localhost:3000/api/posts/' + postId)
            .subscribe(function () {
            //AFTER DELETING THE PAGE IS NOT REFRESED AUTOMATICALLY SO
            var updatedPosts = _this.posts.filter(function (post) { return post.id !== postId; });
            //console.log(updatedPosts);
            _this.posts = updatedPosts;
            _this.postsUpdated.next(__spreadArrays(_this.posts));
            console.log('Deleted!');
        });
    };
    ;
    PostsService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], PostsService);
    return PostsService;
}());
exports.PostsService = PostsService;
//BETTER WAY TO CALL GET POST IS TO USE EVENT DRIVEN APPROACH WHERE WE ACTIVELY PUSH THE INFORMATION ABOUT NEW POST BEING AVAILABLE THE COMPONENT WHICH ARE INTERESTED
//WE COULD USE EVENT EMITTER
//WE ARE USING RXJS DEPENDENCY OF THE ANGULAR CORE
//OBJECTS THAT HELP US PASS DATA AROUND
