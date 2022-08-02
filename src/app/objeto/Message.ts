export interface Message {
    user: string;
    fecha: string;
    latLng: any;
    city?: string;
    // Si es una imagen no tiene texto
    text?: string;
    // Si es un mensaje normal no tiene imgPath
    imgPath?: string;
}