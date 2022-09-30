import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../service/api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class homeComponent implements OnInit {
  Sections:any = [];  
  constructor(private apiService: ApiService) { 
    this.readSection();
  }
  ngOnInit() {}
  readSection(){
      
      this.apiService.getSection().subscribe((data) => {
        this.Sections = data;
        console.log(this.Sections)
       
       })    
     }





     
}