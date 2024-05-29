import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';  
import { ArchwizardModule } from 'angular-archwizard';

import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './services/serviceAdherant/api.service';
import { adherantsComponent } from './components/Adherants/adherants.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { OAuthModule } from 'angular-oauth2-oidc';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { PresidentUsgComponent } from './components/president-usg/president-usg.component';
import { GoogleChartsModule } from 'angular-google-charts';  
import { SectionStatistiqueComponent } from './components/section-statistique/section-statistique.component';
import { HeaderComponent } from './features/header/header.component';
import { ContactComponent } from './components/contact/contact.component';
import { AjouterAdherantsComponent } from './components/ajouter-adherants/ajouter-adherants.component';
import { ModifierAdherantComponent } from './components/modifier-adherant/modifier-adherant.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { EvolutionsAnnuellesComponent } from './components/evolutions-annuelles/evolutions-annuelles.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SectionsComponent } from './components/sections/sections.component';
import { SectionsDialogComponent } from './components/sections-dialog/sections-dialog.component';
import { EmployeComponent } from './components/employe/employe.component';
import { AjouterEmployeeComponent } from './components/ajouter-employee/ajouter-employee.component';


const routes: Routes = [
  { path: 'adherants', component: adherantsComponent },

];

@NgModule({
  declarations: [
    EvolutionsAnnuellesComponent,
    AppComponent,
    adherantsComponent,
    HeaderComponent,
    HomeComponent,
    PresidentUsgComponent,
    SectionStatistiqueComponent,
    ContactComponent,
    AjouterAdherantsComponent,
    ModifierAdherantComponent,
    SigninComponent,
    SignupComponent,
    UserProfileComponent,
    CalendarComponent,
    SectionsComponent,
    SectionsDialogComponent,
    EmployeComponent,
    AjouterEmployeeComponent,
    
    
    

  ],

  imports: [
    FullCalendarModule,
    CommonModule,
    NgbModalModule,
    NgbModule,
    NgbModalModule,
    ReactiveFormsModule,
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
  
  providers: [  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
