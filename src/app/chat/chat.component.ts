import { Component, OnInit, ViewChild } from '@angular/core';
import { Message } from '../objeto/Message';
import { Observable } from 'rxjs';
import { AutorizacionService } from '../services/autorizacion.service'; 
import { Router } from '@angular/router';
import { MensajesService } from '../services/mensajes.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { CamaraService } from '../services/camara.service';
import { GeoService } from '../services/geo.service';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})



export class ChatComponent implements OnInit {
  
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;


  public currentUser: string;

  public messages : Message[];

  public readonly testObjectValue$: Observable<any>;

  listaMsgs: Observable<any[]>;

  mensajes: Observable<Array<any>>;

  listaImgDescargadas: Array<any>;
  listaImgDescargadasPop: any;

  constructor(
     private msgService: MensajesService, private authService: AutorizacionService,
     private router:Router, private camService:CamaraService, private geoService:GeoService) {

    this.currentUser = this.getNombreUsuario();
    console.log('el nombre del usuario = '+this.currentUser);

    this.mensajes = this.msgService.getMensajesCompat();
  }

   ngOnInit() { }


  // Eventos 
  // ----------------------

  async clickSendMessage(){ 
    let msgConstruido : Message;

    let cuerpoMsg = (<HTMLInputElement>document.getElementById("input")).value;

    let ahora = new Date();

    msgConstruido = {
      user: this.getNombreUsuario(),
      fecha: ahora.toISOString(),
      text: cuerpoMsg,
      latLng: this.geoService.getCurrentPosition(),
      city: await this.geoService.obtenerLocaclizacion(this.geoService.getCurrentPosition())
    }
    
    this.enviarMensajeFire(msgConstruido);

    // Borrar el mensaje del imput
    (<HTMLInputElement>document.getElementById("input")).value = '';
  }

  clickSalir(){
    // Hacer logout
    this.authService.hacerSignOut();

    // Navegar
    this.router.navigate(['/']);
  }

  clickCamera(){
    // Obtener Usuario que hace la foto
    const user = this.getNombreUsuario();

    this.camService.takePicture(user);
  }



  // Llamadas a servicios
  // ----------------------

  getNombreUsuario(): string {
    return this.authService.getNombreUsuario();
  }


  // Enviar Mensaje
  enviarMensajeHTTPClient(msg){
    this.msgService.addMessageHTTPClient(msg);
  }

  enviarMensajeCompat(msg){
    this.msgService.addMessageCompat(msg);
  }

  enviarMensajeFire(msg){
    this.msgService.addMessageFire(msg);
  }

  // Obtener Mensajes
  getMensajesHTTPClient(){
    return this.msgService.getMensajesHTTPClient();
  }

  getMensajesCompat(){
    return this.msgService.getMensajesCompat();
  }

  getNextMensajes(){
    return this.msgService.getNextMessages();
  }

  // Scroll infinito
  // --------------------
  loadData(event) {
    setTimeout(() => {
      this.mensajes = this.getNextMensajes();
      console.log('Obtenidos nuevos mensajes...');
      event.target.complete();
    },1000);
  }



}
