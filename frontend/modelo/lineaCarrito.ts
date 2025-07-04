import { Carrito } from "./carrito";
import { Producto } from "./producto";

export interface LineaCarrito {
  id: number;
  carrito: Carrito;
  producto: Producto;
  lineaCarrito: number; // corresponde al campo lineaCarrito en Java
  cantidad: number;
  total: number; 
}