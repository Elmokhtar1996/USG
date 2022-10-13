import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';  

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './services/serviceAdherant/api.service';
import { adherantsComponent } from './components/Adherants/adherants.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { OAuthModule } from 'angular-oauth2-oidc';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { PresidentUsgComponent } from './components/president-usg/president-usg.component';
import { GoogleChartsModule } from 'angular-google-charts';  
import { AdherantsStatistiqueComponent } from './components/adherants-statistique/adherants-statistique.component';
const routes: Routes = [

 
  { path: 'adherants/:id', component: adherantsComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'test', component: SignupComponent },
  

];

@NgModule({
  declarations: [
    AppComponent,
    adherantsComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    PresidentUsgComponent,
    AdherantsStatistiqueComponent,

  ],

  imports: [
    
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    OAuthModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    GoogleChartsModule ,
    RouterModule.forRoot(routes,
      { enableTracing: true })
  ],
  providers: [ApiService],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
