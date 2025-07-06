import { Cliente } from "./cliente";
import { LineaCarrito } from "./lineaCarrito";

export interface Carrito {
    id: number;
    numCarrito: number;
    fecha: string; // Date → string (ISO)
    total: number;
    igv: number;
    cliente: Cliente;
    lineasCarrito?: LineaCarrito[];
};
