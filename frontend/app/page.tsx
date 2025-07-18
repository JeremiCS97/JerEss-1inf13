"use client"

import React, { useEffect, useState } from 'react';
import PaginaProductos from '@/componentes/PaginaProductos';
import PaginaClientes from '@/componentes/PaginaClientes';
import PaginaCarrito from '@/componentes/PaginaCarrito';
import PaginaOrdenes from '@/componentes/PaginaOrdenes';
import PaginaUsuarios from '@/componentes/PaginaUsuarios';
import ModalProducto from '@/componentes/ModalProducto';
import ModalCliente from '@/componentes/ModalCliente';
import { useCarrito } from '@/hooks/useCarrito';
import { useClientes } from '@/hooks/useClientes';
import { useDocVentas } from '@/hooks/useDocVentas';
import { useProductos } from '@/hooks/useProductos';
import { useMensaje } from '@/hooks/useMensaje';
import { useUsuario } from '@/hooks/useUsuario';
import { Producto } from '@/modelo/producto';
import { Cliente } from '@/modelo/cliente';
import { Carrito } from '@/modelo/carrito';


export default function Home() {
  const [paginaActual, setPaginaActual] = useState<'productos' | 'clientes' | 'carrito' | 'docventas' | 'usuarios'>('productos');
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const { mensaje } = useMensaje();
  const productosHook = useProductos();
  const clientesHook = useClientes();
  const carritoHook = useCarrito();
  const ordenesHook = useDocVentas();
  const usuarioHook = useUsuario();

  const cargando = productosHook.cargando || clientesHook.cargando || ordenesHook.cargando || usuarioHook.cargando;
  const carrito = carritoHook.carrito;

  useEffect(() => {
    const manejarActualizacionCarrito = (event: CustomEvent) => {
        carritoHook.setCarrito(event.detail);
    };

    window.addEventListener("actualizar-carrito", manejarActualizacionCarrito as EventListener);

    return () => {
        window.removeEventListener("actualizar-carrito", manejarActualizacionCarrito as EventListener);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">      
      {mensaje.text && (
        <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50
          ${mensaje.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
        >
          {mensaje.text}
        </div>
      )}

      {cargando && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          <p className="ml-4 text-white text-lg">Cargando...</p>
        </div>
      )}

      <nav className="bg-gray-800 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold rounded-lg">JerEss - E-Commerce</div>
          <div className="flex space-x-6">
            <button
              onClick={() => setPaginaActual('productos')}
              className={`px-4 py-2 rounded-md transition duration-300 ease-in-out
                ${paginaActual === 'productos' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
            >
              Productos
            </button>
            <button
              onClick={() => setPaginaActual('clientes')}
              className={`px-4 py-2 rounded-md transition duration-300 ease-in-out
                ${paginaActual === 'clientes' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
            >
              Clientes
            </button>
            <button
              onClick={() => setPaginaActual('carrito')}
              className={`px-4 py-2 rounded-md transition duration-300 ease-in-out relative
                ${paginaActual === 'carrito' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
            >
              Carrito
              {carrito?.lineasCarrito && carrito.lineasCarrito.length > 0 && (
                <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {carrito.lineasCarrito.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setPaginaActual('docventas')}
              className={`px-4 py-2 rounded-md transition duration-300 ease-in-out
                ${paginaActual === 'docventas' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
            >
              Doc.Ventas
            </button>
            <button
              onClick={() => setPaginaActual('usuarios')}
              className="p-2 rounded-full bg-gray-700 hover:bg-blue-600 transition duration-300 ease-in-out flex items-center justify-center"
              title="Usuario"
            >
              {/* Icono de usuario SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto mt-8 p-4">
        {paginaActual === 'productos' && (
          <PaginaProductos
            productos={productosHook.productos}
            agregarAlCarrito={carritoHook.agregarAlCarrito}
            quitarProducto={productosHook.eliminarProducto}
            setMostrarModalProducto={productosHook.setMostrarProductoModal}
            setProductoSeleccionado={productosHook.setProductoSeleccionado}
          />
        )}

        {paginaActual === 'clientes' && (
          <PaginaClientes
            clientes={clientesHook.clientes}
            setClienteSeleccionado={clientesHook.setClienteSeleccionado}
            setMostrarModalCliente={clientesHook.setMostrarModalCliente}
            eliminarCliente={clientesHook.eliminarCliente}
          />
        )}

        {paginaActual === 'carrito' && (
          <PaginaCarrito
            carrito={carritoHook.carrito}
            setCarrito={carritoHook.setCarrito}
            actualizarCantidadProducto={carritoHook.actualizarCantidadEnCarrito}
            quitarProducto={carritoHook.eliminarDelCarrito}
            crearOrden={() => ordenesHook.realizarPedido(carritoHook.carrito, () => carritoHook.setCarrito({} as Carrito))}
          />
        )}

        {paginaActual === 'docventas' && (
          <PaginaOrdenes
            ordenes={ordenesHook.ordenes}
            clientes={clientesHook.clientes}
            obtenerPedidos={ordenesHook.obtenerPedidos}
          />
        )}
        
        {paginaActual === 'usuarios' && (
          <PaginaUsuarios
            usuarioActual={usuarioHook.usuarioActual}
            iniciarSesion={usuarioHook.iniciarSesion}
            cerrarSesion={usuarioHook.cerrarSesion} 
            error={usuarioHook.error}
            cargando={usuarioHook.cargando}
            setMostrarModalUsuario={usuarioHook.setMostrarModalUsuario}
          />
        )}
      </main>

      {productosHook.mostrarModalProducto && (
        <ModalProducto
          producto={productosHook.productoSeleccionado}
          cerrar={() => {
            productosHook.setMostrarProductoModal(false);
            productosHook.setProductoSeleccionado(null);
          }}
          grabar={(producto) =>
            productosHook.productoSeleccionado
              ? productosHook.actualizarProducto(producto as Producto)
              : productosHook.agregarProducto(producto as Omit<Producto, 'id'>)
          }
        />
      )}

      {clientesHook.mostrarModalCliente && (
        <ModalCliente
          cliente={clientesHook.clienteSeleccionado}
          cerrar={() => {
            clientesHook.setMostrarModalCliente(false);
            clientesHook.setClienteSeleccionado(null);
          }}
          grabar={(cliente) =>
            clientesHook.clienteSeleccionado
              ? clientesHook.actualizarCliente(cliente as Cliente)
              : clientesHook.registrarCliente(cliente as Omit<Cliente, 'id'>)
          }
        />
      )}
    </div>
  );
};
