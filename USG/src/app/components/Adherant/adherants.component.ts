import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-adherants',
  templateUrl: './adherants.component.html',
  styleUrls: ['./adherants.component.css']
})
export class adherantsComponent implements OnInit {
  Adherants:any = []; 

  nomSection :any;
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
      console.log(this.Adherants)

     
     })    
    
   }
  
}