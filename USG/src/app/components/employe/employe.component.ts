import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/serviceAdherant/api.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent implements OnInit {
  employee: any;
  reverse: boolean = false;
  selectedFilter: string = 'age';
  itemsPerPage: number = 10;
  p: number = 1;

  constructor(    private apiService: ApiService,
    private router: Router,

    ) {
      this.readEmployee();
     }

  ngOnInit(): void {
  }
  toggleAllSelection() {
    this.employee.forEach((employee: { isChecked: boolean; }) => {
      employee.isChecked = !employee.isChecked;
    });
  }
  sortData(filter: string, reverse: boolean = false) {
    this.reverse = reverse;
    this.employee.sort((a: { Age: number; Nom: string; Prenom: string;Sexe:string }, b: { Age: number; Nom: any; Prenom: string;Sexe:string }) => {
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
  readEmployee(){
    this.apiService.getEmployee().subscribe((data) => {
      this.employee = data;
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
  ajouterEmployee() {
  
    this.router.navigate(['/ajouterEmployee']);

}
 
 
}
