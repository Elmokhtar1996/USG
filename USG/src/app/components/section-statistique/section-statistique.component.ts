import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceSectionService } from 'src/app/services/serviceSection/service-section.service';
@Component({
  selector: 'app-section-statistique',
  templateUrl: './section-statistique.component.html',
  styleUrls: ['./section-statistique.component.css']
})
export class SectionStatistiqueComponent implements OnInit {
  Sections:any = [];

  constructor(private ServiceSectionService: ServiceSectionService,private actRoute: ActivatedRoute,) {
    
    
    
    this.readSections();
   }

  ngOnInit(): void {
  }
  readSections(){
    this.ServiceSectionService.getSection().subscribe((data) => {
    this.Sections = data;
    console.log(this.Sections)
     
    })   
    }  
}
