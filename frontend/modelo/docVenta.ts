import { Carrito } from "./carrito";
import { LineaDocVenta } from "./lineaDocVenta";

export interface DocVenta {
    id: number;
    numVenta: number;
    carrito: Carrito;
    fecha: date; // Usar string para fechas ISO (ajusta si tu backend envía otro formato)
    subTotal: number;
    igv: number;
    total: number;
    items: LineaDocVenta[]; // Si tu frontend usa ItemOrden para LineaDocVenta, mantén el nombre; si no, crea LineaDocVenta.ts
}