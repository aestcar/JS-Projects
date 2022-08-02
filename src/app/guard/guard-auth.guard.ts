import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutorizacionService } from '../services/autorizacion.service'; 

@Injectable({
  providedIn: 'root'
})
export class GuardAuthGuard implements CanActivate {
  constructor(private authService: AutorizacionService, private router: Router){};
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // If the user is not logged in we'll send them back to the home page
    if (!this.authService.getNombreUsuario()) {
      console.log('No estás logueado');
      this.router.navigate(['/']);
      return false;
  }

    return true;
  }
  
}
