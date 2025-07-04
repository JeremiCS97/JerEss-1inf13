import { DocVenta } from "./docVenta";
import { Producto } from "./producto";

export interface LineadDocVenta {
    id: number;
    docVenta: DocVenta;
    producto: Producto;
    cantidad: number;
    subTotal: number;
};
