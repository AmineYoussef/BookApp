import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'; 
import { SnackService } from '../services/snack.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth,
    private snack: SnackService) {

  }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean>{
      const user = await this.afAuth.currentUser;
      const isLoggedin = !!user;
      if (!isLoggedin){
        this.snack.authError();
      }
      return isLoggedin;
  }
}
