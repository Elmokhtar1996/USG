import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-coordonnees',
  templateUrl: './coordonnees.component.html',
  styleUrls: ['./coordonnees.component.css']
})
export class coordonneesComponent implements OnInit {
  Adherants:any = []; 

  kk : any; 
  constructor(private apiService: ApiService,private actRoute: ActivatedRoute,) { 
    this.readAdherant();
  }

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');
    console.log()

 
  }
  readAdherant(){
      
    this.apiService.getAdherant().subscribe((data) => {
      this.Adherants = data;
      console.log(this.Adherants)

     
     })    
   }
}
