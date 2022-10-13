import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { GoogleApiService, UserInfo } from '../../services/serviceAuth/google-api.service';
import { ApiService } from '../../services/serviceAdherant/api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'angular-google-oauth-example';
  Sections:any = [];  

  mailSnippets: string[] = []
  userInfo?: UserInfo

  constructor(private readonly googleApi: GoogleApiService,private apiService: ApiService) {
    this.readSection();
    googleApi.userProfileSubject.subscribe( info => {
      this.userInfo = info
    })
  }
  readSection(){
      
    this.apiService.getSection().subscribe((data) => {
      this.Sections = data;
      console.log(this.Sections)
     
     })    
   }
  isLoggedIn(): boolean {
    return this.googleApi.isLoggedIn()
  }

  logout() {
    this.googleApi.signOut()
  }

  async getEmails() {
    if (!this.userInfo) {
      return;
    }

    const userId = this.userInfo?.info.sub as string
    const messages = await lastValueFrom(this.googleApi.emails(userId))
    messages.messages.forEach( (element: any) => {
      const mail = lastValueFrom(this.googleApi.getMail(userId, element.id))
      mail.then( mail => {
        this.mailSnippets.push(mail.snippet)
      })
    });
  }
}