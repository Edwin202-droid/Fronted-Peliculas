
export interface coordenada{
    latitud: number;
    longitud: number;
}

export interface coordenadaConMensaje extends coordenada{
    //En el mapa mostrar el nombre del cine
    mensaje:string;
}