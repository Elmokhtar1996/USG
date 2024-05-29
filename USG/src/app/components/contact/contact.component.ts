import { Router } from '@angular/router';
import { ApiService } from '../../services/serviceAdherant/api.service';
import { ContactService } from '../../services/contact.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
  
  

export class ContactComponent implements OnInit {
  submitted = false;
  Acces:any = []; 
  selectedAdherents: any[] = [];
  contactForm!: FormGroup;
  userRoleId: any;

  constructor( public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private http: HttpClient,
  private route: ActivatedRoute,
 private contactService : ContactService,
    private apiService: ApiService,) {
      this.mainForm();
     }

     ngOnInit() {
     
        // Faites une requête HTTP pour récupérer le roleId
        this.http.get<any>('/getRole').subscribe(
          (response) => {
            this.userRoleId = response.roleId;
          },
          (error) => {
            console.error('Erreur lors de la récupération du rôle:', error);
          }
        );
     
      this.selectedAdherents = this.apiService.getSelectedAdherents();
      console.log('Selected adherents in contact component:', this.selectedAdherents);
      if (this.selectedAdherents.length > 0) {
        const selectedIDs = this.selectedAdherents.map(adherent => adherent.ID).join(', ');
        this.contactForm.patchValue({
          IDAdherent: selectedIDs
        });
      }
      
    }

  mainForm() {
    {
      this.contactForm = this.fb.group({
      
        IDAdherent: [''],
        IDdestinataire: [''],
        DateHeure: [''],
        IDagent: [''],
        Type: [''],
        Sujet: [''],
        Message: [''],
        Statut: [''],
        IDCC1: [''],
        IDCC2: [''],
        canal: ['MAIL'],
        DateHeureEnvoi: [''],
        idtemplate: ['']
      });
    }
  }
  onSubmit() {
    this.submitted = true;
  
    if (!this.contactForm.valid) {
      return false;
    } else {
      const formData = this.contactForm.value;
  
      // Désactiver le bouton de soumission
      this.submitted = true;
  
      for (const adherent of this.selectedAdherents) {
        formData.IDAdherent = adherent.ID;
  
        this.contactService.envoyeremail(formData).subscribe(response => {
          // Traitez la réponse si nécessaire
          console.log('Enregistrement pour adhérent ID:', adherent.ID);
          console.log('Réponse du service:', response);
        });
      }
  
      // Réactiver le bouton de soumission après avoir traité tous les adhérents
      this.submitted = false;
  
      return true;
    }
  }
  

}
