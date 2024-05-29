import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = 'http://localhost:4000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  currentUserRole: any;


  constructor(private http: HttpClient, public router: Router) {
      this.currentUserRole = localStorage.getItem('userRole'); // Ajoute cette ligne

  }
 
  // Sign-up
  signUp(role: string, email: string, password: string): Observable<any> {
    let api = `${this.endpoint}/register-user`;
    const data = { role, email, password };
    return this.http.post(api, data).pipe(catchError(this.handleError));
  }

  signIn(email: string, password: string) {
    
    const data = { email, password };
    console.log('Données à envoyer:', data);

    return this.http
      .post<any>(`${this.endpoint}/signin`, data)
      .subscribe(
        (res: any) => {
          localStorage.setItem('access_token', res.token);
          if (res && res.idAcces) {
            this.getUserProfile(res.idAcces).subscribe(
              (profile) => {
                if (profile && profile.data) {
                  this.currentUser = profile.data;
                  localStorage.setItem('userRole', profile.data.idRole); // Ajoute cette ligne
                  this.currentUserRole = localStorage.getItem('userRole');

                  this.router.navigate(['adherants/']);

                } else {
                  console.error('Réponse invalide lors de la récupération du profil utilisateur : ', profile);
                }
              },
              (error) => {
                console.error('Erreur lors de la récupération du profil utilisateur : ', error);
              }
            );
          } else {
            console.error('Réponse invalide lors de la connexion : ', res);
          }
        },
        (error) => {
          console.error('Erreur lors de la connexion : ', error);
          console.error('Erreur côté serveur : ', error.error);
        }
      );
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }

  // User profile
  getUserProfile(id: any): Observable<any> {
    let api = `${this.endpoint}/user-profile/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
 
  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
