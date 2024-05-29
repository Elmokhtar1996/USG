import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Adherants } from 'src/app/models/adherants';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
 

  
 
  baseUri: string = 'http://localhost:4000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}
  private selectedSectionId: any;
   setSelectedSectionId(sectionId: any) {
    this.selectedSectionId = sectionId;
  }

  getSelectedSectionId() {
    return this.selectedSectionId;
  }

  private id: any ;

  setId(id: string) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  private idPersonneParent: any ;

  setidPersonneParent(idPersonneParent: string) {
    this.idPersonneParent = idPersonneParent;
  }

  getidPersonneParent() {
    return this.idPersonneParent;
  }

  // Get all employees
  getAdherant(id :string) {
    return this.http.get(`${this.baseUri}/read/${id}`);
  }


  

  getpersonnes() {
    return this.http.get(`${this.baseUri}/personnes`);
  }
  getAdhesionPlus() {
    return this.http.get(`${this.baseUri}/adhesionPlus`);
  }
  getAdherants() {
    return this.http.get<Adherants[]>(`${this.baseUri}/adherant`);
  }

  archiveAdherent(adherent: any): Observable<any> {
    const url = `${this.baseUri}/archive`;
    return this.http.post(url, adherent);
  }
  // Delete employee
  deleteBenevole(id: any): Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }
  getSection() {
    return this.http.get(`${this.baseUri}/section`);
  }
  getSectionAdherants() {
    return this.http.get(`${this.baseUri}/sectionAdherants`);}
   
  getnbAdherant(){
    return this.http.get(`${this.baseUri}/nbadherant`);
  }
  getadhesion(){
    return this.http.get(`${this.baseUri}/adherantvue`);
  }
  getLicence(){
    return this.http.get(`${this.baseUri}/licence`);
  }
  getSaisonAdherants(){
    return this.http.get(`${this.baseUri}/saison`);
  }
  getnbdirigeant(){
    return this.http.get(`${this.baseUri}/nbdirigeant`);
  }
  getAgeAdherant(){

    return this.http.get(`${this.baseUri}/AdherantsAge`);
    

  }
  checkAdherentExists(prenom: string, nom: string , datedenaissance: string): Observable<boolean> {
    
    const url = `${this.baseUri}/check-adherent?prenom=${prenom}&nom=${nom}&datedenaissance=${datedenaissance}`;

    return this.http.get<boolean>(url);
  }

  checkParentExists(prenomP: string, nomP: string): Observable<boolean> {
    const urlp = `${this.baseUri}/checkParent?prenomP=${prenomP}&nomP=${nomP}`;

    return this.http.get<boolean>(urlp);
  }
  

  getBenevole(){
    return this.http.get(`${this.baseUri}/benevoles`);
    
  }
  getListEmployee(){
    return this.http.get(`${this.baseUri}/employelist`);
    
  }
  selectedAdherents: any[] = [];

  setSelectedAdherents(adherents: any[]) {
    this.selectedAdherents = adherents;
  }

  getSelectedAdherents() {
    return this.selectedAdherents;
  }
  getEmploye(){
    return this.http.get(`${this.baseUri}/employe`);
  }
  getdirigeant(){
    return this.http.get(`${this.baseUri}/dirigeant`);
  }
  getbenevole(){
    return this.http.get(`${this.baseUri}/benevole`);
  }
  getEvenement(){
    return this.http.get(`${this.baseUri}/events`);
  }
  
  AjouterAdherant(formData: FormData): Observable<any> {
    let url = `${this.baseUri}/ajouterAdherant`;
    return this.http.post(url, formData);
  }
  ajouterEvenement(data: any): Observable<any> {
    let url = `${this.baseUri}/ajouterEvenement`;
    return this.http.post(url, data);
  }
  supprimerEvenement(eventId: number): Observable<any> {
    let url = `${this.baseUri}/events/${eventId}`;
    return this.http.delete(url);
  }
  
  

  AjouterBenevole(data: any): Observable<any> {
    let url = `${this.baseUri}/ajouterBenevole`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }
  AjouterDirigeant(data: any): Observable<any> {
    let url = `${this.baseUri}/ajouterDirigeant`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }
  AjouterEmploye(data: any): Observable<any> {
    let url = `${this.baseUri}/ajouterEmploye`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  // Update employee
  modifieradherant(id: string | null, data: any): Observable<any> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }
  modifierParent(idPersonneParent: string | null, data: any): Observable<any> {
    let url = `${this.baseUri}/updateParent/${idPersonneParent}`;  // Assurez-vous d'avoir une route correspondante dans votre API
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }
  
  getAdherantById(id: string): Observable<any> {
    let url = `${this.baseUri}/adherant/${id}`;
    return this.http
    .get(url, { headers: this.headers }).pipe(
    
      catchError(this.errorMgmt)
    );
  }


  modifierAdhesion(id: string): Observable<any> {
    let url = `${this.baseUri}/modifierAdhesion/${id}`;
    return this.http
    .get(url, { headers: this.headers }).pipe(
    
      catchError(this.errorMgmt)
    );
  }
  getInfosAdhesionById(id: string): Observable<any> {
    let url = `${this.baseUri}/getInfosAdhesionById/${id}`;
    return this.http
    .get(url, { headers: this.headers }).pipe(
    
      catchError(this.errorMgmt)
    );

  }

  




  



  getParentById(id: string): Observable<any> {
    let url = `${this.baseUri}/parent/${id}`;
    return this.http
    .get(url, { headers: this.headers }).pipe(
    
      catchError(this.errorMgmt)
    );
  }
  getgenreadherent() {
    return this.http.get(`${this.baseUri}/adherentsgrigny`);
  }
  // Dans le service
getParentInfo(prenomP: string, nomP: string): Observable<any> {
  const urlt = `${this.baseUri}/getParentInfo?prenomP=${prenomP}&nomP=${nomP}`;
  return this.http.get<any>(urlt);
}

getEmployee() {
  return this.http.get(`${this.baseUri}/afficherEmployee`);
}
AjouterEmployee(formData: FormData): Observable<any> {
  let url = `${this.baseUri}/ajouterEmployee`;
  return this.http.post(url, formData);
}
getNombresSections() {
  return this.http.get(`${this.baseUri}/nombresSections`);
}
getSaison() {
  return this.http.get(`${this.baseUri}/nombresSaison`);
}
getStatutAdhesion() {
  return this.http.get(`${this.baseUri}/statutAdhesion`);
}
   // Error handling
   errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
