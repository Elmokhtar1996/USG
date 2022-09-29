import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { coordonneesComponent } from './components/Coordonnees/coordonnees.component';
import { homeComponent } from './components/Home/home.component';
import { signinComponent } from './components/Signin/signin.component';

const routes: Routes = [
  { path: 'home', component: homeComponent },
  { path: '', component: signinComponent },
  { path: 'coordonnees/:id', component: coordonneesComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { enableTracing: true })
  ],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
