import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { homeComponent } from './components/Home/home.component';
import { ApiService } from './service/api.service';
import { signinComponent } from './components/Signin/signin.component';
import { coordonneesComponent } from './components/Coordonnees/coordonnees.component';
const routes: Routes = [
  { path: 'home', component: homeComponent },
  { path: '', component: signinComponent },
  { path: 'coordonnees', component: coordonneesComponent },
  

];

@NgModule({
  declarations: [
    AppComponent,
    homeComponent,
    signinComponent,
    coordonneesComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes,
      { enableTracing: true })
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
