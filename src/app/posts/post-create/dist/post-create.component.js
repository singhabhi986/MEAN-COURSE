"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PostCreateComponent = void 0;
var core_1 = require("@angular/core");
//Ng Form removed as reactive approach
var forms_1 = require("@angular/forms");
var PostCreateComponent = /** @class */ (function () {
    /* //EVENT BINDING
    @Output()
    postCreated = new EventEmitter<Post>(); */
    //CALLING GET POST DONT NEED EventEmitter ANYMORE
    function PostCreateComponent(postsService, route) {
        this.postsService = postsService;
        this.route = route;
        /* newPost = 'No content'; */
        //enteredValue is used in taking input value;
        this.enteredContent = '';
        this.enteredTitle = '';
        this.isLoading = false;
        this.mode = "create";
    }
    PostCreateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.form = new forms_1.FormGroup({
            'title': new forms_1.FormControl(null, {
                validators: [forms_1.Validators.required, forms_1.Validators.minLength(3)]
            }),
            'content': new forms_1.FormControl(null, {
                validators: [forms_1.Validators.required, forms_1.Validators.minLength(3)]
            }),
            'image': new forms_1.FormControl(null, {
                validators: [forms_1.Validators.required]
            })
        });
        this.route.paramMap.subscribe(function (ParamMap) {
            if (ParamMap.has('postId')) {
                _this.mode = "edit";
                _this.postId = ParamMap.get('postId');
                //this.post = this.postsService.getPost(this.postId);
                //
                _this.isLoading = true;
                _this.postsService.getPost(_this.postId).subscribe(function (postDate) {
                    //
                    _this.isLoading = false;
                    _this.post = {
                        id: postDate._id,
                        title: postDate.title,
                        content: postDate.content
                    };
                    _this.form.setValue({
                        'title': _this.post.title,
                        'content': _this.post.content
                    });
                });
            }
            else {
                _this.mode = "create";
                _this.postId = null;
            }
        });
    };
    /* onAddPost() {
      //alert('Post Added!');
      this.newPost = "The newPost added!";
    } */
    //USING THE INPUT VALUE
    /* onAddPost(postInput:HTMLTextAreaElement){
      //console.log(postInput.value);
      this.newPost = postInput.value;
    } */
    PostCreateComponent.prototype.OnImagePicked = function (event) {
        var _this = this;
        var file = event.target.files[0];
        this.form.patchValue({ Image: file });
        this.form.get('image').updateValueAndValidity();
        var reader = new FileReader();
        reader.onload = function () {
            _this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);
        console.log(file);
        console.log(this.form);
    };
    //TEMPLATE DRIVEN METHOD
    //onSavePost(form: NgForm) {
    //NEW METHOD
    PostCreateComponent.prototype.onSavePost = function () {
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
    };
    PostCreateComponent = __decorate([
        core_1.Component({
            selector: 'app-post-create',
            templateUrl: 'post-create.component.html',
            styleUrls: ['./post-create.component.css']
        })
    ], PostCreateComponent);
    return PostCreateComponent;
}());
exports.PostCreateComponent = PostCreateComponent;
;
