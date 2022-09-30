import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adherantsComponent } from './components/Adherant/adherants.component';
import { homeComponent } from './components/Home/home.component';
import { signinComponent } from './components/Signin/signin.component';

const routes: Routes = [
  { path: 'home', component: homeComponent },
  { path: 'Authentification', component: signinComponent },
  { path: 'adherants/:id', component: adherantsComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { enableTracing: true })
  ],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
