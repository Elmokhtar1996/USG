import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/serviceAdherant/api.service';
import { ServiceSectionService } from 'src/app/services/serviceSection/service-section.service';
@Component({
  selector: 'app-president-usg',
  templateUrl: './president-usg.component.html',
  styleUrls: ['./president-usg.component.css']
})
export class PresidentUsgComponent implements OnInit {

  Adherants:any = []; nbSections:any;
  Sections:any = [];
  nbAdherants: any;
  
  constructor(private apiService: ApiService,private ServiceSectionService: ServiceSectionService,private actRoute: ActivatedRoute,) { 
    this.readAdherant();
    this.readSections();
    this.readNbAdherant();
    this.readNbSection();
  }

  ngOnInit(): void {
  }
  readAdherant(){
     this.apiService.getAdherants().subscribe((data) => {
     this.Adherants = data;
      
     })   
     }  
     readSections(){
      this.ServiceSectionService.getSection().subscribe((data) => {
      this.Sections = data;
       
      })   
      }   
      
      readNbAdherant(){
        this.apiService.getnbAdherant().subscribe((data) => {
          this.nbAdherants = data;
          
           
      })
    }
    readNbSection(){
      this.ServiceSectionService.getnbSection().subscribe((data) => {
        this.nbSections = data;
        console.log( this.nbSections)
         
    })
  }
  }