import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/serviceAdherant/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaginationService } from '../../services/pagination.service';


@Component({
  selector: 'app-modifier-adherant',
  templateUrl: './modifier-adherant.component.html',
  styleUrls: ['./modifier-adherant.component.css']
})
export class ModifierAdherantComponent implements OnInit {
  submitted = false;
  editForm!: FormGroup;
  afficherModification: boolean = false;
  id: any;
  sections: any = [];
  licences: any = [];
  saisons: any = [];
  modifierAdhesionData : any = [];
  isDataAvailable = false;
  idPersonneParent: any;
  idAdhesion: any;

  constructor(
    private paginationService: PaginationService,
    private fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {
    this.lireSection();
    this.lireLicence();
    this.lireSaison();

  }

  ngOnInit(): void {
    this.id = this.apiService.getId();
    this.idPersonneParent = this.apiService.getidPersonneParent();
    console.log(this.id);
    if (this.id !== null) {
      this.editForm = this.fb.group({
        dateDN: [''],
        prenom: [''],
        nom: [''],
        poids: [''],
        idSection: [''],
        handicap: [''],
        genre: [''],
        idSaison: [''],
        LibeleLicence: [''],
        adresseMail: [''],
        telPortable: [''],
        numEtVoie: [''],
        codePostal: [''],
        commune: [''],
        commentaire: [''],
        paiement: [''],
        statutAdhesion: ['dossier incomplet', Validators.required],
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
      });
      this.getAdherant(this.id);
      this.getParentInfo(this.idPersonneParent)
      this.modifierAdhesion(this.id)
    }
  }

  getAdherant(id: string) {
    this.apiService.getAdherantById(id).toPromise().then((data: any[]) => {
      console.log('Adhérent:', data);

      if (data.length > 0) {
        const adherent = data[0];
        this.idPersonneParent = adherent['idPersonneParent'];
        this.getParentInfo(this.idPersonneParent);
        

     
        const idSaison = adherent['idSaison'];
        const datedenaissance = adherent['date_de_naissance'];
        const dateObj = new Date(datedenaissance);
        const formattedDate = dateObj.toISOString().split('T')[0]; // Format 'yyyy-MM-dd'
        const prenom = adherent['Prenom'];
        const nom = adherent['Nom'];
        const adresseMail = adherent['adresseMail'];
        const genre = adherent['Sexe'];
        const poids = adherent['poids'];
        const telPortable = adherent['telPortable'];
        const numEtVoie = adherent['numEtVoie'];
        const codePostal = adherent['codePostal'];
        const libelleNotification = adherent['libelleNotification'];
        const commune = adherent['commune'];

        this.editForm.patchValue({
          dateDN: formattedDate,
          prenom: prenom,
          nom: nom,
          idSaison: idSaison,
          adresseMail: adresseMail,
          genre: genre,
          poids: poids,
          telPortable: telPortable,
          numEtVoie : numEtVoie,
          notification :libelleNotification, 
          commune :commune,
          codePostal :codePostal,
        });

        this.isDataAvailable = true;
      }
    }, error => console.error(error));
  }

  getParentInfo(id: string) {
    this.apiService.getParentById(id).toPromise().then((parentData: any[]) => {
      console.log('Response for parent:', parentData);
  
      if (parentData.length > 0) {
        const parent = parentData[0];
  
        console.log('Parent details:', parent);
  
        this.editForm.patchValue({
          nomParent: parent['nom'],
          prenomParent: parent['prenom'],
          sexeParent: parent['genre'],
          emailParent: parent['adresseMail'],
          telParent: parent['telPortable'],
          numVoie: parent['numEtVoie'],
          voieParent: parent['voie'],
        });
      } else {
        console.log('No data found for parent with ID:', id);
      }
    }).catch(error => {
      console.error('Error fetching parent details:', error);
    });
  }
  
  lireSection() {
    this.apiService.getSectionAdherants().subscribe((data) => {
      this.sections = data;
    });
  }

  modifierAdhesion(id : string) {
    this.apiService.modifierAdhesion(id).subscribe((data) => {
      this.modifierAdhesionData = data;
    });
  }

  lireSaison() {
    this.apiService.getSaisonAdherants().subscribe((data) => {
      this.saisons = data;
    });
  }


  chargerInfosAdhesion(event: any) {
    const selectedIdAdhesion = event.target.value;
  
    // Appelez la fonction qui charge les informations de l'adhésion en fonction de l'ID sélectionné
    this.chargerInfosAdhesionById(selectedIdAdhesion);
    this.afficherModification = selectedIdAdhesion !== "oui";

  }
  
chargerInfosAdhesionById(idAdhesion: any) {
  this.apiService.getInfosAdhesionById(idAdhesion).subscribe((data: any) => {
    console.log('Infos Adhésion:', data);
    if (data.length > 0) {
      const adhesion = data[0];
      this.idAdhesion = adhesion['idAdhesion'];
      this.getParentInfo(this.idAdhesion);
      
      const commentaire = adhesion['commentaire'];
      const LibeleLicence = adhesion['libeleLicence'];
      const statutAdhesion = adhesion['statutAdhesion'];
      const paiement = adhesion['paiement'];
      const nomSectionAdherent = adhesion['NomSection'];
      const sectionCorrespondante = this.sections.find((section: { Libelle: any; }) => section.Libelle === nomSectionAdherent);
      const idSection = sectionCorrespondante ? sectionCorrespondante.idSection : null;


      this.editForm.patchValue({
 
        commentaire : commentaire ,
        LibeleLicence : LibeleLicence,
        idSection: idSection,
        paiement: paiement,
        statutAdhesion : statutAdhesion, 

   
      });

    }
  }, error => console.error(error));
}

 
  lireLicence() {
    this.apiService.getLicence().subscribe((data) => {
      this.licences = data;
    });
  }

  onSubmit() {
    this.submitted = true;
  
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.id;
  
        // Envoyer la requête pour mettre à jour les données de l'adhérent
        this.apiService.modifieradherant(id, this.editForm.value).subscribe({
          complete: () => {
            // Utilisez toujours l'ID du parent pour la mise à jour du parent
            this.apiService.modifierParent(this.idPersonneParent, this.editForm.value).subscribe({
              complete: () => {
                // Rediriger ou effectuer toute action nécessaire après la mise à jour du parent
                console.log('Parent content updated successfully!');
                // Rediriger vers la page des adhérents avec la pagination actuelle
                const currentPage = this.paginationService.getCurrentPage();
                this.router.navigateByUrl('/adherants?page=' + currentPage);
              },
              error: (err) => {
                console.log('Error updating parent content: ', err);
              }
            });
            console.log('Content updated successfully!');
          },
          error: (err) => {
            console.log('Error updating content: ', err);
          }
        });
  
        return true;
      } else {
        return false;
      }
    }
  }

  
  

  annulerModification() {
    if (window.confirm('Êtes-vous sûr de vouloir annuler la modification?')) {
      this.router.navigateByUrl('/adherants');
    }
  }
}
