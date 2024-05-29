import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { adherantsComponent } from './components/Adherants/adherants.component';
import { HomeComponent } from './components/home/home.component';
import { PresidentUsgComponent } from './components/president-usg/president-usg.component';
import { SectionStatistiqueComponent } from './components/section-statistique/section-statistique.component';
import { ContactComponent } from './components/contact/contact.component';
import { HeaderComponent } from './features/header/header.component';
import { AjouterAdherantsComponent } from './components/ajouter-adherants/ajouter-adherants.component';
import { ModifierAdherantComponent } from './components/modifier-adherant/modifier-adherant.component';
import { AuthGuard } from './guards/auth.guard'; // Importez votre AuthGuard
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { EvolutionsAnnuellesComponent } from './components/evolutions-annuelles/evolutions-annuelles.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { SectionsComponent } from './components/sections/sections.component';
import { EmployeComponent } from './components/employe/employe.component';
import { AjouterEmployeeComponent } from './components/ajouter-employee/ajouter-employee.component';


const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'adherants', component: adherantsComponent, canActivate: [AuthGuard] },
  { path: 'edit-adherant', component: ModifierAdherantComponent },
  { path: 'sections-statistique', component: SectionStatistiqueComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'stat', component: PresidentUsgComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent },  
  { path: 'ajouter-adherant', component: AjouterAdherantsComponent }, 
  { path: 'dashboard', component: EvolutionsAnnuellesComponent }, 
  { path: 'calendar', component: CalendarComponent }, 
  { path: 'sections', component: SectionsComponent }, 
  { path: 'employee', component: EmployeComponent }, 
  { path: 'ajouterEmployee', component: AjouterEmployeeComponent }, 


  


  




  { path: 'sign-up', component: SignupComponent },
  { path: 'user-profile/:id', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/', pathMatch: 'full' }, // Route par défaut redirigeant vers la page de connexion
  { path: '**', redirectTo: '/' } // Redirection pour les routes non définies vers la page de connexion
];

@NgModule({

  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}