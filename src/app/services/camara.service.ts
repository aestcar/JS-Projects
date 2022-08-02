import { Injectable } from '@angular/core';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadString, } from "firebase/storage";
import { MensajesService } from './mensajes.service';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Message } from '../objeto/Message';
import { GeoService } from './geo.service';

@Injectable({
  providedIn: 'root'
})
export class CamaraService {

  public tmpFile: any = undefined;
  public tmpFileName: string = undefined;

  constructor(private msgService:MensajesService, private geoService:GeoService) { }
  

  async takePicture(user){
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, // file-based data; provides best performance
      source: CameraSource.Camera, // automatically take a new photo with the camera
      quality: 100, // highest quality (0 to 100)
      correctOrientation: true
    });

    const base64Data = await this.readAsBase64(capturedPhoto);

    // Write the file to the data directory
    const fileName = Date.now()+'.'+capturedPhoto.format;

    // Asignamos estos valores para tenerlos globalmente
    this.tmpFile = base64Data;
    this.tmpFileName = fileName;

    // Referencias a storage
    const storage = getStorage();
    const storageRef = ref(storage, 'images/'+this.tmpFileName);

    // Esperamos a obtener respuesta
    const res = await uploadString(storageRef , this.tmpFile, 'data_url').then(() => {
      console.log('Uploaded a fileee!');
    });

    // Contruir mensaje
    let msgConstruido : Message;

    let ahora = new Date();


    let imgRes = await getDownloadURL(storageRef);

    msgConstruido = {
      user: user,
      fecha: ahora.toISOString(),
      imgPath: imgRes,
      latLng: this.geoService.getCurrentPosition(), 
      city: await Promise.resolve(this.geoService.obtenerLocaclizacion(this.geoService.getCurrentPosition()))
    }

    this.msgService.addMessageFire(msgConstruido);
  }

  private async readAsBase64(photo: Photo) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
  
    return await this.convertBlobToBase64(blob) as string;
  }
  
  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

}

