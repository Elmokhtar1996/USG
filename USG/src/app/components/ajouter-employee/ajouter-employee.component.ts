import { ApiService } from 'src/app/services/serviceAdherant/api.service';
import { Component, NgZone, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormLogicHelper } from '../ajouter-adherants/form-logic.helper';
@Component({
  selector: 'app-ajouter-employee',
  templateUrl: './ajouter-employee.component.html',
  styleUrls: ['./ajouter-employee.component.css']
})
export class AjouterEmployeeComponent implements OnInit {

  public employeeForm!: FormGroup;
  selectedImage!: File;


  constructor(
    public fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
    
  ) { }

  ngOnInit(): void {
    this.mainFormAdherant();

  }
  mainFormAdherant() {

    this.employeeForm = this.fb.group({
      dateDeNaissance: [''],
      prenom: [''],
      nom: [''],
      idSection: [''],  // Assurez-vous que selectedSections est initialisé avec un tableau vide
      handicap: [''],
      image: [''], // Ajoutez le champ image dans le formulaire
      genre: [''],
      idSaison: [''],
      idLicence:[],
      adresseMail: [''],
      telPortable: [''],
      numEtVoie: [''],
      codePostal: [''],
      commune: [''],
      commentaire: [''],
  
      typeDeduction: [''],
      idDocument: [''],
      statutDeduction: [''],
  
    });


  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0] as File;
    console.log(this.selectedImage)
  }
  onSubmit() {
    const selectedSections = this;
  
    console.log('Les IDs des sections sélectionnées :', selectedSections);
    console.log('Formulaire soumis :', this.employeeForm);
  
    this.employeeForm.markAllAsTouched();
  
    if (!this.employeeForm.valid) {
      return false;
    } else {
      setTimeout(() => {
        this.router.navigate(['/adherants']);
      }, 3000);
  
      // Créer un nouvel objet FormData  
      const formData = new FormData();
  
      // Parcourir les champs du formulaire et les ajouter à formData
      for (const key in this.employeeForm.value) {
        if (key !== 'image') { // Exclude the image field from form data
          formData.append(key, this.employeeForm.value[key]);
        }
      }
  
      // Ajouter l'image sélectionnée à formData si elle existe
      if (this.selectedImage) {
        formData.append('image', this.selectedImage, this.selectedImage.name);
      }
  
      // Ajouter les sections sélectionnées à formData
      // Appeler le service API pour ajouter l'adhérent
      return this.apiService.AjouterEmployee(formData).subscribe(() => {
        console.log("L'adhérent a été ajouté avec succès !");
      });
    }
  }

}
