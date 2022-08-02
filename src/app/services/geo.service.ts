import { Injectable } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})

export class GeoService {

  resp:string;

  constructor(private geolocation: Geolocation) { 
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('Ha ido todo bien' + resp);
      this.resp = resp.coords.latitude + ',' + resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getCurrentPosition(){
    return this.resp;
  }

  watchPosition(){
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });
  }

  async obtenerLocaclizacion(latLng):Promise<string>{
    const myArray = latLng.split(",");
    let lat = myArray[0];
    let lng = myArray[1];
    let res = await fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude='+lat+'&longitude='+lng+'&localityLanguage=en')
    let resJSON = await res.json();
    let city = await resJSON.city;
    return city;
  }
   
}
