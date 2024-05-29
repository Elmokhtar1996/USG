import { Component, NgZone, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/serviceAdherant/api.service';
import { FormLogicHelper } from './form-logic.helper';
import { ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-ajouter-adherants',
  templateUrl: './ajouter-adherants.component.html',
  styleUrls: ['./ajouter-adherants.component.css']
})
export class AjouterAdherantsComponent implements OnInit {
[x: string]: any;
  @ViewChild('test') test!: TemplateRef<any>;

  formLogic: FormLogicHelper;
  submitted = false;
  sections: any = [];
  selectedSections: number[] = [];
  selectedImage!: File;
  showTennisField: any;
  userRole= 2;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private AuthService: AuthService,

    private apiService: ApiService
  ) {
    
    this.lireSection(); 
    this.formLogic = new FormLogicHelper(fb,apiService); 

  }
  viderFormulaire() {
    this.formLogic.viderFormulaire();
  }


  ngOnInit(): void {
    this.userRole = this.AuthService.currentUserRole;

    this.formLogic.mainFormAdherant();
    this.lireSection();
  }

  lireSection() {
    if (this.AuthService.currentUserRole == 2 && this.formLogic && this.formLogic.adherantForm) {
      this.formLogic.adherantForm.get('idSection')?.setValue('2'); // Définir la valeur de idSection sur 2
      this.showTennisField = true; // Afficher le champ tennis

    } else {
      this.apiService.getSectionAdherants().subscribe((data) => {
        this.sections = data;
      });
    }
  }




  isMineur() {
  this.formLogic.isMineur();
  }
  nextStep() {
    this.formLogic.nextStep();
  }
  nextStepAndCheckAdherents(){
  this.formLogic.nextStepAndCheck();
}
  nextStepAndCheckParents(){
  this.formLogic.nextStepAndCheckParents();
}
getErrorMessage(field: string): string {
  if (this.formLogic.adherantForm.get(field)?.hasError('required')) {
    return `${field.charAt(0).toUpperCase() + field.slice(1)} est requis.`;
  }
  return '';
}
nextStepAndCheck() {
  this.formLogic.nextStepAndCheck();
 }
  previousStep() {
   this.formLogic.previousStep();
  }
  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0] as File;
    console.log(this.selectedImage)
  }
  onCheckboxChange(sectionId: number) {
    if (this.selectedSections.includes(sectionId)) {
      // Décocher la case, donc la retirer du tableau
      this.selectedSections = this.selectedSections.filter(id => id !== sectionId);
    } else {
      // Cocher la case, donc l'ajouter au tableau
      this.selectedSections.push(sectionId);
    }
  
    console.log('Sections sélectionnées :', this.selectedSections);
  }
  getDefaultIdSectionValue(): string {
    return "2";
  }
  
  onSubmit() {
    const selectedSections = this.selectedSections;
  
    console.log('Les IDs des sections sélectionnées :', selectedSections);
    console.log('Formulaire soumis :', this.formLogic.adherantForm);
  
    this.formLogic.adherantForm.markAllAsTouched();
  
    if (!this.formLogic.adherantForm.valid) {
      return false;
    } else {
      setTimeout(() => {
        this.router.navigate(['/adherants']);
      }, 3000);
  
      // Créer un nouvel objet FormData  
      const formData = new FormData();
  
      // Parcourir les champs du formulaire et les ajouter à formData
      for (const key in this.formLogic.adherantForm.value) {
        if (key !== 'image') { // Exclude the image field from form data
          formData.append(key, this.formLogic.adherantForm.value[key]);
        }
      }
  
      // Ajouter l'image sélectionnée à formData si elle existe
      if (this.selectedImage) {
        formData.append('image', this.selectedImage, this.selectedImage.name);
      }
  
      // Ajouter les sections sélectionnées à formData
      // Appeler le service API pour ajouter l'adhérent
      return this.apiService.AjouterAdherant(formData).subscribe(() => {
        console.log("L'adhérent a été ajouté avec succès !");
      });
    }
  }
  
}

