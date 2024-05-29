import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
@Injectable({
    providedIn: 'root',
  })
  export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}
  
    canActivate(): boolean {
        console.log('AuthGuard is called');
        const isAuthenticated = this.authService.isLoggedIn;
    
        if (isAuthenticated) {
          console.log('Utilisateur authentifié');
          return true;
        } else {
          console.log('Utilisateur non authentifié');
          this.router.navigate(['/login']);
          return false;
        }
      }
    
  }
  
