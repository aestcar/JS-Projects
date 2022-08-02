import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, signInWithPopup, GoogleAuthProvider, User, signOut } from "firebase/auth";
import { environment } from 'src/environments/environment';
import { isPlatform, Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Injectable({
  providedIn: 'root'
})
export class AutorizacionService {

  winobj: any = null; // maybe better understand injectables... see chrome tabs

  constructor(public platform: Platform, private googlePlus: GooglePlus) { 
    this.winobj = window;
  }

  ngOnInit() { }

  userData?: User;

  userData2?: any;

  async getAutorizacion(){
    
    if(isPlatform('cordova')){
      return this.getAutorizacionCordova();
    }else{
      return this.getAutorizacionPc();
    }
  }


  async getAutorizacionPc(){
    const app = initializeApp(environment.firebase);

    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const db = getFirestore(app);
    
        await signInWithPopup(auth, provider)
          .then((result) => {
    
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
    
            const token = credential.accessToken;
    
            // The signed-in user info.
            const user = result.user;

            this.userData = user;
    
            console.log(user);
    
            return user;
    
          }).catch((error) => {
            console.log('EROOR');
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
    
            return null;
    
          });

          // Retorna undefined y luego null o el user (Duda)
          return undefined;
  }

  async getAutorizacionCordova(){
    console.log('Entra en getAuth Cordova');
    await this.googlePlus.login({ })
      .then(res => {
        this.userData2 = res;

        console.log('Entra en res');
        console.log('User data= '+this.userData2);

        return res;
      })
      .catch(err => {return null});

        return undefined;

      // 105704053045-ssqh61ev83ghb203v2b4fdc5n2hb5r4t.apps.googleusercontent.com
  
  }


  getNombreUsuario(){
    if(isPlatform('cordova')){
      console.log('Entra en isPlatformCordova');
      return this.userData2.displayName;
    }else {
      console.log('Entra en isPlatformPC');
      return this.userData.displayName;
    }
  }


  hacerSignOut(){
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  
}
