import { Carrito } from "./carrito";
import { LineaDocVenta } from "./lineaDocVenta";

export interface DocVenta {
    id: number;
    numVenta: number;
    carrito: Carrito;
    fecha: Date;
    subTotal: number;
    igv: number;
    total: number;
    items: LineaDocVenta[]; 
}