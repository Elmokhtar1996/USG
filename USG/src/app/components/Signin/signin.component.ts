import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class signinComponent implements OnInit {
  protected:any = [];  
  constructor(private apiService: ApiService) { 
    this.readprotected();
  }

  ngOnInit(): void {
  }
  readprotected(){
      
    this.apiService.getSection().subscribe((data) => {
      this.protected = data;
      console.log(this.protected)
     })    
   }
}
