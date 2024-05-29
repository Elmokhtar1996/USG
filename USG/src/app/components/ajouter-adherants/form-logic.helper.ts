// form-logic.helper.ts
import { FormBuilder, FormGroup, Validators,FormArray} from '@angular/forms';
import { ApiService } from 'src/app/services/serviceAdherant/api.service';



export class FormLogicHelper {
  
   public adherantForm!: FormGroup;
   currentStep = 1; 
   selectedSections: number[] = [];

  constructor(private fb: FormBuilder,private apiService: ApiService
    ) {
    this.mainFormAdherant();
    
  }
  mainFormAdherant() {
    this.selectedSections = []; // Assurez-vous que selectedSections est initialisé avec un tableau vide

    this.adherantForm = this.fb.group({
      dateDeNaissance: ['', Validators.required],
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      idSection: [''],  // Assurez-vous que selectedSections est initialisé avec un tableau vide
      handicap: [''],
      image: [''], // Ajoutez le champ image dans le formulaire

      genre: ['', Validators.required],
      idSaison: ['', Validators.required],
      libeleLicence: [''],
      idLicence:[],
      adresseMail: ['', Validators.required],
      telPortable: [''],
      numEtVoie: ['', Validators.required],
      codePostal: ['', Validators.required],
      commune: ['', Validators.required],
      commentaire: ['', Validators.required],
      paiement: ['', Validators.required],
      statutAdhesion: ['dossier incomplet', Validators.required],
      parent: [''],
      emailparent: [''],
      typeDeduction: [''],
      notification: [''],
      montant: [''],
      idDocument: [''],
      statutDeduction: [''],
      nomParent: [''],
      prenomParent: [''],
      sexeParent: [''],
      emailParent: [''],
      telParent: [''],
      numVoie: [''],
      voieParent: [''],
      dateNaissanceP: [''],
    });

  }
 viderFormulaire() {
    this.adherantForm.reset();
  }
  isMineur(): boolean {
    const dateNaissance = this.adherantForm.value.dateDeNaissance;
    
    // Vérifier si la date de naissance est définie et valide
    if (!dateNaissance || !/^\d{4}-\d{2}-\d{2}$/.test(dateNaissance)) {
      return false; // Ne pas considérer l'adhérent comme mineur si la date de naissance est vide ou invalide
    }
    
    const dateNaissanceObj = new Date(dateNaissance);
    const dateNow = new Date();
    let age = dateNow.getFullYear() - dateNaissanceObj.getFullYear();
    let m = dateNow.getMonth() - dateNaissanceObj.getMonth();
    if (m < 0 || (m === 0 && dateNow.getDate() < dateNaissanceObj.getDate())) {
      age--;
    }
    return age < 18;
  }
  

  nextStepAndCheck() {
    const prenom = this.adherantForm.value.prenom;
    const nom = this.adherantForm.value.nom;
    const datedenaissance = this.adherantForm.value.dateDeNaissance;
  
    // Appelez le service pour vérifier l'existence de l'adhérent
    this.apiService.checkAdherentExists(prenom, nom, datedenaissance).subscribe((response: any) => {
      if (response.exists) {
        // Adhérent existe déjà, affichez une boîte de dialogue avec deux boutons personnalisés
        const confirmation = window.confirm("L'adhérent existe déjà dans la base de données. Souhaitez-vous voir les détails ?");
  
        if (confirmation) {
          // Utilisez la réponse du backend pour pré-remplir le formulaire
          if (response.adherentInfo) {
            // Obtenez les valeurs actuelles du formulaire
            const currentValues = this.adherantForm.value;
  
            // Pré-remplissez le formulaire avec les valeurs actuelles et les nouvelles valeurs
            this.adherantForm.patchValue({
              ...currentValues,
              prenom: response.adherentInfo.prenom || currentValues.prenom,
              nom: response.adherentInfo.nom || currentValues.nom,
              dateDeNaissance: response.adherentInfo.date_de_naissance || currentValues.dateDeNaissance,
              // ... (ajoutez d'autres champs selon vos besoins)
            });
          }
          this.nextStep(); // Appeler nextStep() ici pour passer à l'étape suivante
        } else {
          // Si l'utilisateur clique sur "Annuler", ajoutez ici le code pour retourner à la page principale
        }
      } else {
        // Adhérent n'existe pas encore, passez à la vérification du parent
        this.nextStepAndCheckParents();
      }
    });
  }
  
  isDateOfBirthEmpty(): boolean {
    return !this.adherantForm.value.dateDeNaissance;
  }

  // Réinitialiser le formulaire
  nextStep() {
    if (this.isDateOfBirthEmpty()) {
      alert("Veuillez remplir la date de naissance avant de continuer.");
      return;
    }
    this.currentStep++;
  }
  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
  nextStepAndCheckParents() {
    
    // Ajoutez la condition pour vérifier si l'adhérent est mineur
    if (this.isMineur()) {
      const prenomP = this.adherantForm.value.prenomParent;
      const nomP = this.adherantForm.value.nomParent;
  
      // Appelez le service pour vérifier l'existence du parent
      this.apiService.checkParentExists(prenomP, nomP).subscribe((response: any) => {
        if (response.exists) {
          alert("L'adhérent existe déjà dans la base de données. Les champs seront pré-remplis.");
          if (response.adherentInfo) {
            this.adherantForm.patchValue({
              prenom: response.adherentInfo.prenom,
              nom: response.adherentInfo.nom,
              dateDeNaissance: response.adherentInfo.dateNaissance,
              // ... (ajoutez d'autres champs selon vos besoins)
            });
          }
          this.nextStep(); // Appeler nextStep() ici pour passer à l'étape suivante
        } else {
          this.nextStep();
        }
      });
    } else {
      // Si l'adhérent n'est pas mineur, passez directement à l'étape suivante sans effectuer les requêtes relatives aux parents
      this.nextStep();
    }
  }
        
}