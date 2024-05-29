import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Observable, Subject } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

const authCodeFlowConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: 'https://accounts.google.com',

  // strict discovery document disallows urls which not start with issuers url
  strictDiscoveryDocumentValidation: false,

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin,

  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'server.code',
  clientId: '288550106029-8rhi1ghmjfjqkudor63eg0486dqqi6n0.apps.googleusercontent.com',

  // set the scope for the permissions the client should request
  scope: 'openid profile email',

  showDebugInformation: true,
};

export interface UserInfo {
  info: {
    sub: string
    email: string,
    name: string,
    picture: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  gmail = 'https://gmail.googleapis.com'

  userProfileSubject = new Subject<UserInfo>()

  constructor(
    private readonly oAuthService: OAuthService,
    private http: HttpClient,
    private readonly httpClient: HttpClient,
    private router: Router
  ) {
    // Configurez votre service OAuth2
    oAuthService.configure(authCodeFlowConfig);

    // Écoutez les événements d'authentification
    oAuthService.events.subscribe((e) => {
      if (e.type === 'token_received') {
        console.log('Événement token_received déclenché');
    
        // L'utilisateur s'est authentifié avec succès, récupérez son e-mail
        const identityClaims = this.oAuthService.getIdentityClaims() as UserInfo;
        if (identityClaims && identityClaims.info && identityClaims.info.email) {
          const userEmail = identityClaims.info.email;
    
          // Envoyez l'e-mail à votre API backend pour vérification
          this.sendEmailToBackend(userEmail).subscribe((response: string) => {
            if (response === 'oui') {
              // L'e-mail existe déjà dans la base de données
              console.log('L\'e-mail existe déjà dans la base de données.');
            } else if (response === 'non') {
              // L'e-mail n'existe pas dans la base de données
              console.log('L\'e-mail n\'existe pas dans la base de données.');
              // Vous pouvez rediriger l'utilisateur vers une page d'erreur ou effectuer d'autres actions nécessaires ici
            }
          });
        }
      }
    });

    oAuthService.configure(authCodeFlowConfig);
    this.testGetUserRoles();

    // manually configure a logout url, because googles discovery document does not provide it
    oAuthService.logoutUrl = "https://www.google.com/accounts/Logout";

    // loading the discovery document from google, which contains all relevant URL for
    // the OAuth flow, e.g. login url
    oAuthService.loadDiscoveryDocument().then( () => {
      // // This method just tries to parse the token(s) within the url when
      // // the auth-server redirects the user back to the web-app
      // // It doesn't send the user the the login page
      this.oAuthService.tryLoginImplicitFlow().then( () => {
        if (!oAuthService.hasValidAccessToken()) {
          oAuthService.initLoginFlow()
        } else {
     
        }
        
      })
    });
    
  }
  sendEmailToBackend(userEmail: string): Observable<string> {
    // Construisez l'URL de votre API backend pour envoyer l'e-mail
  
    const url = `${this.baseUri}/sendEmail`;

    // Créez un objet contenant l'e-mail à envoyer
    const data = { email: userEmail };

    // Envoyez la demande POST à votre API backend
    return this.http.post<string>(url, data, { headers: this.authHeader() });
  }
  emails(userId: string): Observable<any> {
    return this.httpClient.get(`${this.gmail}/gmail/v1/users/${userId}/messages`, { headers: this.authHeader() })
  }

  getMail(userId: string, mailId: string): Observable<any> {
    return this.httpClient.get(`${this.gmail}/gmail/v1/users/${userId}/messages/${mailId}`, { headers: this.authHeader() })
  }
  getAcces(){
    return this.http.get(`${this.baseUri}/acces`);
  }
  checkEmailExists(userEmail: string): Observable<string> {
    console.log('Utilisateur non connejjjjjjjjjjjjcté');
    const url = `${this.baseUri}/checkEmail?email=${userEmail}`;
    return this.http.get<string>(url, { headers: this.authHeader() });
  }
  
  
  getUserRoles(): Observable<string[]> {
    console.log('Dans getUserRoles');
    if (!this.oAuthService.hasValidAccessToken()) {
      
      return new Observable<string[]>(); // Utilisateur non connecté
    }
    
  
    const identityClaims = this.oAuthService.getIdentityClaims() as UserInfo;
    if (!identityClaims || !identityClaims.info || !identityClaims.info.email) {
      console.log('L\'e-mail n\'est pas présent dans les informations du profil');
      return new Observable<string[]>(); // L'e-mail n'est pas présent dans les informations du profil
    }
  
    const userEmail = identityClaims.info.email;
    console.log('Email de l\'utilisateur :', userEmail);
  
    const url = `${this.baseUri}/getRolesByEmail/${userEmail}`;
    console.log('URL de la requête :', url);
  
    return this.http.get<string[]>(url, { headers: this.authHeader() });
  }
 
  testGetUserRoles() {
    console.log('Avant de récupérer les rôles');

    this.getUserRoles().subscribe((roles: string[]) => {
      console.log('Rôles de l\'utilisateur :', roles);
    });
  }
  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken()
  }

  signOut() {
    this.oAuthService.logOut()
  }
    // Méthode pour récupérer les rôles de l'utilisateur par e-mail
    getUserRolesByEmail(email: string): Observable<string[]> {
      const url = `${this.baseUri}/getRolesByEmail/${email}`;
      return this.http.get<string[]>(url, { headers: this.authHeader() });
    }
    
  
  baseUri: string = 'http://localhost:4000/api';
  signup(data:any): Observable<any> {
    let url = `${this.baseUri}/create`;
    return this.http.post(url, data);
   
  }
  private authHeader() : HttpHeaders {
    return new HttpHeaders ({
      'Authorization': `Bearer ${this.oAuthService.getAccessToken()}`
    })
  }

}