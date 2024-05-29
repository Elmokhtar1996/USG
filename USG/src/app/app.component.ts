import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { GoogleApiService, UserInfo } from './services/serviceAuth/google-api.service';
import { ApiService } from './services/serviceAdherant/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private readonly googleApi: GoogleApiService,private apiService: ApiService) {

    googleApi.userProfileSubject.subscribe( info => {
 
    })
  }
  isLoggedIn(): boolean {
    return this.googleApi.isLoggedIn()
  }

}