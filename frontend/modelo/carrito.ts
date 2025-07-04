import { Cliente } from "./cliente";
import { LineaCarrito } from "./lineaCarrito";

export interface Carrito {
    id: number;
    nombre: string;
    fecha: Date;
    cliente: Cliente;
    items?: LineaCarrito[];
};
