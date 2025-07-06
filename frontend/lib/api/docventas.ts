import { LineaDocVenta } from "@/modelo/lineaDocVenta";
import { DocVenta } from "@/modelo/docVenta";
import { Carrito } from "@/modelo/carrito";
import { Producto } from "@/modelo/producto";

type NuevaLineaDocVenta = {
  producto: Producto;
  cantidad: number;
  subTotal: number;
  lineaCarrito: any; // Usa el tipo correcto si lo tienes
};

type NuevaDocVenta = {
  carrito: Carrito;
  fecha: string;
  subTotal: number;
  igv: number;
  total: number;
  items: NuevaLineaDocVenta[];
};

export async function listarPedidos(): Promise<DocVenta[]> {
    const baseUrl = process.env.NEXT_PUBLIC_URL_BASE_API;
    if (!baseUrl) {
        throw new Error('La URL base de la API no está definida');
    }

    const response = await fetch(`${baseUrl}/docventas`);

    if (!response.ok) {
        throw new Error(`Error al listar los pedidos: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export async function realizarPedido(
    /*orden: Omit<DocVenta, 'id' | 'numero' | 'items'> & {
    items: Omit<LineaDocVenta, 'id' | 'orden'>[]}): Promise<DocVenta> */
    orden: NuevaDocVenta): Promise<DocVenta>
{
  const baseUrl = process.env.NEXT_PUBLIC_URL_BASE_API;
  if (!baseUrl) {
      throw new Error('La URL base de la API no está definida');
  }

  const payload = {
    ...orden,
    items: orden.items
  };

  const response = await fetch(`${baseUrl}/docventas`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Error al realizar el pedido: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
