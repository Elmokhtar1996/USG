import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServiceSectionService {
  baseUri: string = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getSection() {
    return this.http.get(`${this.baseUri}/sections`);
  }

  ajouterSection(libelleSection: string, image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('libelleSection', libelleSection);
    formData.append('image', image, image.name);

    return this.http.post(`${this.baseUri}/ajouterSection`, formData).pipe(
      catchError(error => {
        console.error('Erreur lors de l\'ajout de la section :', error);
        return throwError(error);
      })
    );
  }
  supprimerSection(id: number): Observable<any> {
    return this.http.delete(`${this.baseUri}/sections/${id}`);
  }

  updateSectionsAfterAdd(): Observable<any> {
    return this.getSection().pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des sections après l\'ajout :', error);
        return throwError(error);
      })
    );
  }
  getnbSection(){
    return this.http.get(`${this.baseUri}/nbsection`);
  }
}
