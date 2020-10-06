//#IMPORTING MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule } from  '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

//#IMPORTING COMPONENTS
import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { AppRoutingModule } from "./app-routing.module";

//#IMPORTING SERVICES
import { PostsService } from './posts/posts.service'

//#FOR COMPONENTS
@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent
  ],
  //#imports IS FOR MODULES
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    HttpClientModule
  ],
  //#providers IS FOR SERVICES
  providers: [PostsService],
  bootstrap: [AppComponent]
})
//EXPORING WHOLE AppModule
export class AppModule { }
