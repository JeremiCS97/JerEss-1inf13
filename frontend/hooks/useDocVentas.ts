"use client";

import { useState } from 'react';
import * as docVentassApi from '@/lib/api/docventas';
import { useMensaje } from '@/hooks/useMensaje';
import { Carrito } from '@/modelo/carrito';
import { DocVenta } from '@/modelo/docVenta';
import { Producto } from '@/modelo/producto';
import { LineaCarrito } from '@/modelo/lineaCarrito';

type NuevaLineaDocVenta = {
    producto: Producto;
    cantidad: number;
    subTotal: number;
    lineaCarrito: LineaCarrito;
};

type NuevaDocVenta = {
    carrito: Carrito;
    fecha: string;
    subTotal: number;
    igv: number;
    total: number;
    items: NuevaLineaDocVenta[];
};

export function useDocVentas() {
    const [ordenes, setOrdenes] = useState<DocVenta[]>([]);
    const [cargando, setCargando] = useState(false);
    const { mostrarMensaje } = useMensaje();

    const realizarPedido = async (carrito: Carrito, limpiarCarrito: () => void) => {
        if (!carrito.lineasCarrito || carrito.lineasCarrito.length === 0) {
            mostrarMensaje('El carrito está vacío. Agrega productos antes de realizar el pedido.', 'error');
            return;
        }

        setCargando(true);
        try {
            const subTotal = carrito.lineasCarrito.reduce((sum, item) => sum + item.total, 0);
            const igv = subTotal * 0.18;
            const total = subTotal + igv;

            /*const nuevaPayload: Omit<DocVenta, 'id' | 'numero' | 'items'> & {
                items: Omit<LineaDocVenta, 'id' | 'orden'>[]
            } = {
                carrito,
                fecha: new Date(),
                subTotal,
                igv,
                total,
                items: carrito.lineasCarrito.map(item => ({
                    producto: item.producto,
                    cantidad: item.cantidad,
                    subTotal: item.total
                }))
            };*/
            const nuevaPayload: NuevaDocVenta = {
                carrito,
                fecha: new Date().toISOString(),
                subTotal,
                igv,
                total,
                items: carrito.lineasCarrito.map(item => ({
                    producto: item.producto,
                    cantidad: item.cantidad,
                    subTotal: item.total,
                    lineaCarrito: item
                }))
            };

            const nuevaOrden = await docVentassApi.realizarPedido(nuevaPayload);

            setOrdenes(prev => [...prev, nuevaOrden]);
            limpiarCarrito();
            mostrarMensaje('¡Pedido realizado con éxito!', 'success');
        } catch (error) {
            mostrarMensaje('No se pudo realizar el pedido.', 'error');
            console.error("Error al realizar el pedido:", error);
        } finally {
            setCargando(false);
        }
    };

    const obtenerPedidos = async () => {
        setCargando(true);
        try {
            const lista = await docVentassApi.listarPedidos();
            setOrdenes(lista);
        } catch (error) {
            mostrarMensaje('No se pudieron cargar los pedidos.', 'error');
            console.error("Error al cargar los pedidos:", error);
        } finally {
            setCargando(false);
        }
    };

    return {
        ordenes, 
        realizarPedido, 
        obtenerPedidos,
        cargando
    }
}
