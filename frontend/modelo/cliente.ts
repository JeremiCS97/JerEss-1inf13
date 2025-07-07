import { Carrito } from "./carrito";

export interface Cliente {
    id: number;
    dni: string;
    nombres: string;
    apePaterno: string;
    apeMaterno: string;
    fechaNacimiento: string;
    carritos: Carrito[];
}
