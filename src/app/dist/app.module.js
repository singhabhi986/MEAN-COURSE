"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
//#IMPORTING MODULES
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var animations_1 = require("@angular/platform-browser/animations");
var input_1 = require("@angular/material/input");
var card_1 = require("@angular/material/card");
var button_1 = require("@angular/material/button");
var toolbar_1 = require("@angular/material/toolbar");
var expansion_1 = require("@angular/material/expansion");
var http_1 = require("@angular/common/http");
var progress_spinner_1 = require("@angular/material/progress-spinner");
//#IMPORTING COMPONENTS
var app_component_1 = require("./app.component");
var post_create_component_1 = require("./posts/post-create/post-create.component");
var header_component_1 = require("./header/header.component");
var post_list_component_1 = require("./posts/post-list/post-list.component");
var app_routing_module_1 = require("./app-routing.module");
//#IMPORTING SERVICES
var posts_service_1 = require("./posts/posts.service");
//#FOR COMPONENTS
var AppModule = /** @class */ (function () {
    //EXPORING WHOLE AppModule
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                post_create_component_1.PostCreateComponent,
                header_component_1.HeaderComponent,
                post_list_component_1.PostListComponent
            ],
            //#imports IS FOR MODULES
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                forms_1.FormsModule,
                animations_1.BrowserAnimationsModule,
                input_1.MatInputModule,
                card_1.MatCardModule,
                button_1.MatButtonModule,
                toolbar_1.MatToolbarModule,
                progress_spinner_1.MatProgressSpinnerModule,
                expansion_1.MatExpansionModule,
                http_1.HttpClientModule
            ],
            //#providers IS FOR SERVICES
            providers: [posts_service_1.PostsService],
            bootstrap: [app_component_1.AppComponent]
        })
        //EXPORING WHOLE AppModule
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
