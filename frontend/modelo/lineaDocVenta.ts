import { DocVenta } from "./docVenta";
import { Producto } from "./producto";
import { LineaCarrito } from "./lineaCarrito";

export interface LineaDocVenta {
    id: number;
    docVenta: DocVenta;
    producto: Producto;
    cantidad: number;
    subTotal: number;
    //tal vez no vaya, no estoy seguro
    lineaCarrito: LineaCarrito;
};
