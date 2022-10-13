import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdherantsStatistiqueComponent } from './components/adherants-statistique/adherants-statistique.component';
import { adherantsComponent } from './components/Adherants/adherants.component';
import { HomeComponent } from './components/home/home.component';
import { PresidentUsgComponent } from './components/president-usg/president-usg.component';
import { SignupComponent } from './components/signup/signup.component';


const routes: Routes = [
  { path: 'adherants/:id', component: adherantsComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: PresidentUsgComponent },
  { path: '', component: HomeComponent },
  { path: 'adherants-statistique', component: AdherantsStatistiqueComponent },


  

];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { enableTracing: true })
  ],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
