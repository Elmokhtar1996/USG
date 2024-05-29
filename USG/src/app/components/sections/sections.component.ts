import { Component } from '@angular/core';
import { ServiceSectionService } from '../../services/serviceSection/service-section.service';
import { ApiService } from '../../services/serviceAdherant/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent {
  isDialogOpen: boolean = false;
  newSectionName: string = '';
  Sections :any;
  selectedImage: File | undefined;
  selectedSection: any;
  selectIdSection : any;


  constructor(private sectionService: ServiceSectionService,private apiService : ApiService,private router: Router) {}

  ngOnInit(): void {
    this.getSections();
    this.extractImageName;
  }
  showAdherents(sectionId: any) {
    this.apiService.setSelectedSectionId(sectionId);
    this.router.navigate(['/adherants']); // Assurez-vous que '/adherents' correspond à votre chemin de route pour la page des adhérents
  }
  openDialog(): void {
    this.isDialogOpen = true;
  }

  closeDialog(): void {
    this.isDialogOpen = false;
    this.newSectionName = ''; // Réinitialiser la valeur du champ de saisie lorsque la boîte de dialogue est fermée
  }
  
  supprimerSection(index: number): void {
    const id = this.Sections[index].idSection; // Supposons que chaque section a un champ "id"
    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer cette section ?');
    if (confirmation) {
    this.sectionService.supprimerSection(id).subscribe(() => {
      // Rafraîchir la liste des sections après la suppression
      this.getSections();
    });}
  }

  ajouterSection() {
    if (!this.newSectionName || !this.selectedImage) {
      // Vérifiez si le nom de la section et l'image ont été fournis
      console.error('Veuillez fournir un nom de section et une image.');
      return;
    }

    this.sectionService.ajouterSection(this.newSectionName, this.selectedImage).subscribe({
      next: (response) => {
        console.log('Réponse de l\'ajout de section :', response);
        this.closeDialog(); // Fermer la boîte de dialogue après l'ajout de la section
        console.log('Fermeture de la boîte de dialogue');
        this.sectionService.updateSectionsAfterAdd().subscribe((data) => {
          console.log('Mise à jour des sections après ajout :', data);
          this.Sections = data;
        });
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout de la section :', error);
      },
      complete: () => {
        console.log('La requête est terminée');
      }
    });
  }

onImageSelected(event: any) {
  const file: File = event.target.files[0];
  this.selectedImage = file;
}
  
  getSections(): void {
    this.sectionService.getSection().subscribe((data) => {
      this.Sections = data;
    });
  }
  selectSection(section: {
    idSection: any; nomSection: any; 
}) 


{
  this.apiService.setSelectedSectionId(section.idSection);
    this.selectedSection = section.nomSection;
    this.selectIdSection = section.idSection;

  }




  
  extractImageName(imagePath: string): string {
    if (imagePath) {
      return `../../../assets/sectionImages/${imagePath}`; // Utilisez le chemin absolu correct
    } else {
      return ''; // Si le chemin est vide, retournez une chaîne vide
    }
  }
  
}
