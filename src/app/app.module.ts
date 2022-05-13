import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { VideoCardComponent } from './components/video-card/video-card.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {YoutubeService , ApiService} from "./core/services";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    VideoCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [YoutubeService,ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
