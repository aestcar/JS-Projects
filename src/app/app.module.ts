import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';


import { environment } from '../environments/environment';
import { DatabaseModule } from '@angular/fire/database';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { StorageModule } from '@angular/fire/storage';

import { GooglePlus } from '@ionic-native/google-plus/ngx';

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule ,IonicModule.forRoot(), AppRoutingModule, FormsModule,
    HttpClientModule, DatabaseModule, StorageModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
    ,provideFirebaseApp(() => initializeApp(environment.firebase))],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, GooglePlus, Geolocation],
  bootstrap: [AppComponent],
})
export class AppModule {}
