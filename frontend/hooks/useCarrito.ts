"use client"

import { useState } from 'react';
import * as carritosApi from '@/lib/api/carrito';
import { useMensaje } from '@/hooks/useMensaje';
import { Producto } from '@/modelo/producto';
import { Carrito } from '@/modelo/carrito';
import { LineaCarrito } from '@/modelo/lineaCarrito';

export function useCarrito() {
    const [carrito, setCarrito] = useState<Carrito>({} as Carrito);
    const { mostrarMensaje } = useMensaje();

    const agregarAlCarrito = async (producto: Producto) => {
      try {
        const existingItem = carrito.lineasCarrito?.find(item => item.producto.id === producto.id);
  
        if (existingItem) {
          const nuevaCantidad = existingItem.cantidad + 1;
          const nuevoTotal = nuevaCantidad * producto.precProducto;

          const nuevoCarrito = await carritosApi.actualizarItemCarrito({
            ...existingItem,
            cantidad: nuevaCantidad,
            total: nuevoTotal
          });

          setCarrito(nuevoCarrito);
        } else {
          const nuevoLineaCarrito: Omit<LineaCarrito, 'id'> = {
              carrito: carrito,
              producto: producto,
              lineaCarrito:0,
              cantidad: 1,
              total: producto.precProducto
          };
  
          const carritoActualizado = await carritosApi.agregarItemAlCarrito(nuevoLineaCarrito);
          setCarrito(carritoActualizado);
        }
  
        mostrarMensaje(`${producto.nomProducto} fue agregado al carrito!`, 'success');
      } catch (error) {
        mostrarMensaje('No se pudo agregar el producto al carrito.', 'error');
        console.error("Error al agregar al carrito:", error);
      }
    };
    
    const actualizarCantidadEnCarrito = async (productoId: number, nuevaCantidad: number) => {
      try {
          const item = carrito.lineasCarrito?.find(item => item.producto.id === productoId);
          if (!item) return;

          const cantidadFinal = Math.max(1, nuevaCantidad);
          const nuevoSubTotal = cantidadFinal * item.producto.precProducto;

          const itemActualizado = {
              ...item,
              cantidad: cantidadFinal,
              subTotal: nuevoSubTotal
          };

          const carritoActualizado = await carritosApi.actualizarItemCarrito(itemActualizado);

          setCarrito(carritoActualizado);
      } catch (error) {
          mostrarMensaje('No se pudo actualizar la cantidad.', 'error');
          console.error("Error al actualizar la cantidad:", error);
      }
    };
    
    const eliminarDelCarrito = async (productoId: number) => {
        try {
          const item = carrito.lineasCarrito?.find(item => item.producto.id === productoId);
          if (!item) return;
    
          await carritosApi.eliminarItemDelCarrito(item.id, item.carrito.id);
    
          setCarrito(prevCarrito => {
            const nuevosItems = prevCarrito.lineasCarrito?.filter(i => i.producto.id !== productoId) || [];
            return { ...prevCarrito, items: nuevosItems };
          });
    
          mostrarMensaje('Producto eliminado del carrito!', 'success');
        } catch (error) {
          mostrarMensaje('No se pudo eliminar el producto del carrito.', 'error');
          console.error("Error al eliminar del carrito:", error);
        }
      };

    return {
        carrito,
        setCarrito,
        agregarAlCarrito,
        actualizarCantidadEnCarrito,
        eliminarDelCarrito
    }
}
