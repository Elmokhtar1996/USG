import { Component, NgZone, OnInit } from '@angular/core';
import { ApiService } from '../../services/serviceAdherant/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { AuthService } from '../../services/auth.service';
import { PaginationService } from '../../services/pagination.service';
import { ModifierAdherantComponent } from '../modifier-adherant/modifier-adherant.component';

@Component({
  selector: 'app-adherants',
  templateUrl: './adherants.component.html',
  styleUrls: ['./adherants.component.css']
})
export class adherantsComponent implements OnInit {
  showTennisField: any;
  showDropdown = false;
  selectedText = 'text1'; // Texte par défaut sélectionné
  selectedFilter: string = 'age';
  Adherants:any = []; 
  personnes:any = [];
  AdherantsF:any = []; 
  Sections:any = [];
  selectedAdherant: any;
  AdherantsParents:any;
  selectedSection: any;
  selectIdSection: any;
  searchTerm: any;
  selectedSaison:any;
p: number = 1;
itemsPerPage: number = 10;
  nomSection :any;
  ElementSalle:any;
  lenght:any;
  editForm!: FormGroup;
  myForm!: FormGroup;
  benevoles :any = [];
  reverse: boolean = false;
  submitted = false;
  AdherantForm!: FormGroup;


  AgeAdherants:any = [];
  newArray:any = [];
  num = 5;
  selectedAdherents: any[] = [];
  userRole= 2;
  selectedSectionId: any;


  constructor(public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService,
    private contactService: ContactService,
    private AuthService: AuthService,
    private paginationService: PaginationService

    

    ) { 
    this.readAgeAdherants();
    this.mainFormAdherant();
    this.readSection();
    this.createForm();
    this.readAdherant();
    this.readAdhesion();  }


  ngOnInit(): void {
    
    this.mainFormAdherant();
    this.search();
    this.userRole = this.AuthService.currentUserRole;
    console.log('llmlml',this.userRole)
    this.selectedSectionId = this.apiService.getSelectedSectionId();
    if (this.selectedSectionId) {
  console.log("heloooo",this.selectedSectionId)
    } else {
      // Si aucun identifiant de section n'est sélectionné, chargez tous les adhérents
      this.loadAllAdherents();
      console.log("hiiiiiiii")
    }
    // this.Adherants = setInterval(() => { 
    //     this.readAdherant(); 
    // }, 1000);
    // this.Adherants = setInterval(this.readAdherant, 1000);
  }

  editAdherant(adherant: any) {
    console.log("ff",adherant.ID);
    this.apiService.setId(adherant.ID);
  
    // Récupérer la page actuelle à partir du service de pagination
    const currentPage = this.paginationService.getCurrentPage();
    
    // Passer la page actuelle à votre service de pagination
    this.paginationService.setCurrentPage(currentPage);
  
    // Naviguer vers la page de modification de l'adhérent
    this.router.navigateByUrl('/edit-adherant');
  }
  mainFormAdherant() {

    this.AdherantForm = this.fb.group({
      datedenaissance: [''],
      prenom: [''],
      nom: ['',  [Validators.required, Validators.minLength(5)]],
     
      nationalite: [''],
      lieudenaissance: [''],
      numsecsociale: [''],
      genre: [''],
      poids: [''],
      idsection: [''],
      idlicence: [''],
      idsaison: [''],
      LibeleLicence : [''],
      adresseMail  : [''],
      telPortable  : [''],
     numEtVoie : [''],
     codePostal  : [''],
      commune  : [''],
  
    });
  }
  selectSaison(saison: number) {
    this.selectedSaison = saison;
  
    // Appliquer les filtres après avoir sélectionné la saison
    console.log("test:",this.selectedSaison)
    this.readAdherant();
  }
  selectAllSections() {
    // Réinitialiser la sélection de la section
    this.selectedSection = null;
    // Réinitialiser le filtre par rôle si nécessaire
    if (this.AuthService.currentUserRole !== 2) {
      this.readAdherant();
    }
  }
  readAdherant() {
    this.apiService.getAdherants().subscribe((data) => {
      // Filtrer par rôle
      if (this.AuthService.currentUserRole === 2) {
        // Afficher les adhérents de tennis si le rôle est égal à 2
        this.Adherants = data.filter(adherant => adherant.NomSection === 'Tennis');
      } else {
        // Afficher tous les adhérents si le rôle n'est pas égal à 2
        this.Adherants = data;
      }
  
      // Filtrer par section sélectionnée
      if (this.selectedSection) {
        this.Adherants = this.Adherants.filter((adherant: { NomSection: any; }) => adherant.NomSection === this.selectedSection);
      }
  
      // Appliquer la recherche sur le nom de l'adhérent
      if (this.searchTerm) {
        this.Adherants = this.Adherants.filter((adherant: { Nom: string; }) => adherant.Nom.toLowerCase().includes(this.searchTerm.toLowerCase()));
      }
      if (this.selectedSectionId) {
        console.log("jkjkjk",this.selectedSectionId)
        this.Adherants = this.Adherants.filter((adherant: { NomSection: any; }) => adherant.NomSection == this.selectedSectionId);
      }
      // Filtrer par saison sélectionnée
      if (this.selectedSaison) {
        if (this.selectedSaison !== 0) {
          console.log('chihaja', this.selectedSaison);
          this.Adherants = this.Adherants.filter((adherant: { idSaison: any; }) => adherant.idSaison == this.selectedSaison);
          console.log("ererer", this.Adherants);
        } else {
          // Si selectedSaison est égal à 0, afficher tous les adhérents de la section sélectionnée sans filtre de saison supplémentaire
          // Réinitialiser la liste des adhérents pour afficher tous les adhérents de la section sélectionnée
        }
      }
    });
  }
  


  loadAllAdherents() {
    // Charger tous les adhérents
    this.apiService.getAdherants().subscribe((data) => {
      this.Adherants = data;
    });
  }
  


  





  getpersonnes() {
    this.apiService.getpersonnes().subscribe((data) => {
      this.Adherants = data;
      console.log(data)

    });
  }
  getAdhesionPlus() {
    this.apiService.getAdhesionPlus().subscribe((data) => {
      this.Adherants = data;
      console.log(data)

    });
  }


  extractImageName(imagePath: string): string {
    if (imagePath) {
      const parts = imagePath.split('/');
      const fileName = parts[parts.length - 1]; // Nom de fichier
      return 'assets/' + fileName; // Ajouter le préfixe "assets/" et le nom de fichier
    } else {
      return ''; // Si le chemin est vide, retourne une chaîne vide
    }
  }

search() {
  if (this.searchTerm) {
    this.Adherants = this.Adherants.filter((adherant: { Nom: string; Prenom: string; }) => adherant.Nom.toLowerCase().includes(this.searchTerm.toLowerCase()) || adherant.Prenom.toLowerCase().includes(this.searchTerm.toLowerCase()));
  } else {
    this.readAdherant();
  }
}





  readAdhesion(){
    this.apiService.getadhesion().subscribe((data) => {
      this.AdherantsParents = data;
    });
  }
 
  selectSection(section: {
    idSection: any; nomSection: any; 
}) 


{
  this.apiService.setSelectedSectionId(section.idSection);
    this.selectedSection = section.nomSection;
    this.selectIdSection = section.idSection;

    this.readAdherant();
  }



  goToAddAdherent() {
  
      this.apiService.setSelectedSectionId(this.selectIdSection);
      this.router.navigate(['/ajouter-adherant']);

  }
   


  readSection() {
    this.apiService.getSectionAdherants().subscribe((data: any) => {
      console.log(data); // Ajoute cette ligne
      if (this.AuthService.currentUserRole == 2) { // Modifie ici
        this.Sections = data.filter((section: any) => section.nomSection == 'Tennis');
        this.showTennisField = true; // Afficher le champ tennis
          this.AdherantForm.get('idsection')?.setValue('2'); // Définir directement la valeur '2'
      } else {
        this.Sections = data;
      }
    });
  }

  createForm() {
    this.myForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      datedenaissance: ['', Validators.required],
      nationalite: ['', Validators.required],
      lieudenaissance: ['', Validators.required],
      genre: ['', Validators.required],
      poids: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.myForm.value);
  }
  sortData(filter: string, reverse: boolean = false) {
    this.reverse = reverse;
    this.Adherants.sort((a: { Age: number; Nom: string; Prenom: string;Sexe:string }, b: { Age: number; Nom: any; Prenom: string;Sexe:string }) => {
      let comparison = 0;
      if (filter === 'Age') {
        comparison = a.Age - b.Age;
      } else if (filter === 'nom') {
        comparison = a.Nom.localeCompare(b.Nom);
      } else if (filter === 'Prenom') {
        comparison = a.Prenom.localeCompare(b.Prenom);
      } else if (filter === 'Sexe') {
        comparison = a.Sexe.localeCompare(b.Sexe);
      }
      if (reverse) {
        comparison = -comparison;
      }
      return comparison;
    });
  }
  removeDirigeant(adherant: { ID: any; }, index: any) {
    console.log("ID du adherant à supprimer : ", adherant.ID); // Ajouter cette ligne pour afficher l'identifiant du dirigeant
  
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteBenevole(adherant.ID).subscribe((data) => {
          this.Adherants.splice(index, 1);
          this.apiService.archiveAdherent(adherant).subscribe((archiveData) => {
            console.log('Adherent archivé :', archiveData);
        }
      )   
    });
    }
  }
  removeSelectedAdherants() {
    if(window.confirm('Are you sure?')) {
    for (let i = this.Adherants.length - 1; i >= 0; i--) {
      if (this.Adherants[i].isSelected) {
        this.Adherants.splice(i, 1);
      }
    }
  }}

  readAgeAdherants(){
    this.apiService.getAgeAdherant().subscribe((data) => {
      this.AgeAdherants = data;

      
     this.newArray = this.AgeAdherants.filter(function (el: { Sections: string; }) {
      return el.Sections =="Omnisports"    
      
  
    });
 console.log(this.newArray)
    // this.newArray[0].zero_quatorz


  })
}
save() {
  this.submitted = true;
  if (!this.AdherantForm.valid) {
    return false;
  } else {
    this.router.navigate(['/adherants']);
    console.log("yesssss");
    return this.apiService.AjouterAdherant(this.AdherantForm.value).subscribe({
    
 
    });
  }
}
toggleAllSelection() {
  this.Adherants.forEach((adherant: { isChecked: boolean; }) => {
    adherant.isChecked = !adherant.isChecked;
  });
}
ngOnChanges() {
  this.p = 1; // Réinitialiser la page courante à 1 chaque fois que le nombre d'éléments par page change
}
exportToExcel(): void {
  const worksheet = XLSX.utils.json_to_sheet(this.Adherants.filter((a: { isChecked: any; }) => a.isChecked));
  const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  FileSaver.saveAs(blob, 'adherents.xlsx');
}
redirectToContact(selectedAdherents: any[]) {
  if (selectedAdherents.length > 0) {
    const selectedAdherentsJSON = JSON.stringify(selectedAdherents);
    this.router.navigate(['/contact'], { queryParams: { selectedAdherents: selectedAdherentsJSON } });
  }
}
handleSelection(event: any) {
  const selectedOption = event.target.value;
  switch (selectedOption) {
    case 'export':
      this.exportToExcel();
      break;
    case 'mark_paid':
      // Logique pour marquer comme payé
      break;
    case 'send_email':
      const selectedAdherents = this.Adherants.filter((adherent: { isChecked: any }) => adherent.isChecked);
      this.apiService.setSelectedAdherents(selectedAdherents);

      console.log('Selected adherents:', this.selectedAdherents);
      this.router.navigate(['/contact']);


         break;
    case 'invite_event':
      // Logique pour inviter à un évènement
      break;
    default:
      // Option non valide sélectionnée
      break;
  }
}




}