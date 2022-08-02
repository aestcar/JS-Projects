import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Database, push, ref } from '@angular/fire/database';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { async, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '../objeto/Message';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  private mensajesDB: AngularFireList<Message>;

  tutorials: Observable<any[]>;

  cont : number;

  constructor(private httpClient: HttpClient, private db: AngularFireDatabase, private dbFire: Database) {
    // Inicializar mensajesDB (compat)
    this.cont = 15;
    this.getFirstsMessages(15);
  }

  getFirstsMessages(n){
    // Obtiene los primeros n mensajes

    this.mensajesDB = this.db.list('/mensajes', (ref) =>
      ref.orderByChild('date')
      .limitToLast(n));
  }

  // -------------------------------------------------------------------------------------------

  addMessageHTTPClient(msg: Message){
    this.httpClient.post('https://mi-primer-chat-bro-default-rtdb.europe-west1.firebasedatabase.app/mensajes.json', msg).subscribe( (r) => console.log('mesaje posteado'));
  }

  addMessageCompat(msg: Message){
    this.mensajesDB.push(msg).then( (r) => console.log('mesaje posteado'));
  }

  addMessageFire(msg: Message){
    const doc = ref(this.dbFire, 'mensajes'); // Doc = referencia a la BD + test = path
    push(doc,msg).then( (r) => console.log('mesaje posteado'));
  }

  // -------------------------------------------------------------------------------------------

  getMensajesHTTPClient(): Observable<Message> {
    return this.httpClient.get<Message>('https://mi-primer-chat-bro-default-rtdb.europe-west1.firebasedatabase.app/mensajes.json');
  }

  getMensajesCompat(): Observable<Message[]> {
    // snapshot devuelve la lista sinconizada
    // pipe = unir funciones
    // map = operacion en observable de (observable source as input)
    return this.mensajesDB.snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => this.getUserFromPayload(c.payload))
      )
    );
  }

  getNextMessages() {
    this.cont += 15;
    this.mensajesDB = this.db.list('/mensajes', (ref) =>
    ref.orderByChild('date')
    .limitToLast(this.cont));

    return this.mensajesDB.snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => this.getUserFromPayload(c.payload))
      )
    );
  }

  getUserFromPayload(payload: any): Message{
    return {
      $key: payload.key,
      ...payload.val(),
    };
  }

}
