import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/serviceAdherant/api.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-adherants',
  templateUrl: './adherants.component.html',
  styleUrls: ['./adherants.component.css']
})
export class adherantsComponent implements OnInit {
  Adherants:any = []; 
  AdherantsF:any = []; 
p: number = 1;
  nomSection :any;
  ElementSalle:any;
  lenght:any;
  constructor(private apiService: ApiService,private actRoute: ActivatedRoute,) { 
    this.readAdherant();
  }

  ngOnInit(): void {
   
    // let nomSection = this.actRoute.snapshot.paramMap.get('id');
    // this.nomSection = nomSection;
    this.actRoute.paramMap.subscribe(params => { 
      this.nomSection = params.get('id') 
      console.log(this.nomSection)
    }) 
 
  }
  readAdherant(){
    
    let nomSection = this.actRoute.snapshot.paramMap.get('id');
    this.nomSection = nomSection;
    this.apiService.getAdherants().subscribe((data) => {
      this.Adherants = data;
      
    
     this.apiService.getAdherants().subscribe((data) => {
     this.Adherants = data;
      for(var i = 0; i < this.Adherants.length; i++)
       {
    
       this.lenght = i;
     }

     })   
     })    
    
   }
  
}