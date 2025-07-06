import { Carrito } from "./carrito";

export interface Cliente {
    id: number;
    dni: string;
    nombre: string;
    apePaterno: string;
    apeMaterno: string;
    fechaNacimiento: string;
    carritos: Carrito[];
}
