import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AutorizacionService } from '../services/autorizacion.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'main.html',
  styleUrls: ['main.css']
})
export class MainComponent {

  constructor(private authService: AutorizacionService, private router: Router, private zone: NgZone) {
    console.log('Version 8');
  }

  async onClick(){
    const user = await this.getAutorizacion();
    
    if(user === null){
      this.autenticacionCorrecta(false);
    }else{
      this.autenticacionCorrecta(true);
    }
  }

  async getAutorizacion() {
    return await this.authService.getAutorizacion();
  }

  autenticacionCorrecta(b : boolean){
    if(b){
      this.zone.run(() => {
        this.router.navigate(['/chat']);
      });
    } else{
      alert("Error en la autenticación de usuario");
      this.zone.run(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
