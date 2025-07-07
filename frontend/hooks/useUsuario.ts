import { useState } from "react";
import { Usuario } from '../modelo/usuario';
import * as usuariosApi from '../lib/api/usuarios';

export function useUsuario() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
  const [usuarioActual, setUsuarioActual] = useState<Usuario | null>(null);
  const [mostrarModalUsuario, setMostrarModalUsuario] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Obtener todos los usuarios
  const obtenerUsuarios = async () => {
    setCargando(true);
    setError(null);
    try {
      const lista = await usuariosApi.getUsuarios();
      setUsuarios(lista);
    } catch (e: any) {
      setError(e.message || "Error al obtener usuarios");
    } finally {
      setCargando(false);
    }
  };

  // Login
  const iniciarSesion = async (codUsuario: string, contrasen: string) => {
    setCargando(true);
    setError(null);
    try {
      const usuario = await usuariosApi.loginUsuario(codUsuario, contrasen);
      setUsuarioActual(usuario);
      setError(null);
    } catch (e: any) {
      setError(e.message || "Usuario o contraseña incorrectos");
      setUsuarioActual(null);
    } finally {
      setCargando(false);
    }
  };

  // Logout
  const cerrarSesion = () => {
    setUsuarioActual(null);
  };

  // Crear usuario
  const crearUsuario = async (usuario: Omit<Usuario, "id">) => {
    setCargando(true);
    setError(null);
    try {
      const nuevo = await usuariosApi.crearUsuario(usuario);
      setUsuarios((prev) => [...prev, nuevo]);
      return nuevo;
    } catch (e: any) {
      setError(e.message || "Error al crear usuario");
      throw e;
    } finally {
      setCargando(false);
    }
  };

  // Actualizar usuario
  const actualizarUsuario = async (usuario: Usuario) => {
    setCargando(true);
    setError(null);
    try {
      const actualizado = await usuariosApi.actualizarUsuario(usuario);
      setUsuarios((prev) =>
        prev.map((u) => (u.id === actualizado.id ? actualizado : u))
      );
      if (usuarioActual && usuarioActual.id === actualizado.id) {
        setUsuarioActual(actualizado);
      }
      return actualizado;
    } catch (e: any) {
      setError(e.message || "Error al actualizar usuario");
      throw e;
    } finally {
      setCargando(false);
    }
  };

  // Eliminar usuario
  const eliminarUsuario = async (id: number) => {
    setCargando(true);
    setError(null);
    try {
      await usuariosApi.eliminarUsuario(id);
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
      if (usuarioActual && usuarioActual.id === id) {
        setUsuarioActual(null);
      }
    } catch (e: any) {
      setError(e.message || "Error al eliminar usuario");
      throw e;
    } finally {
      setCargando(false);
    }
  };

  return {
    usuarios,
    usuarioSeleccionado,
    setUsuarioSeleccionado,
    usuarioActual,
    setUsuarioActual,
    mostrarModalUsuario,
    setMostrarModalUsuario,
    cargando,
    error,
    obtenerUsuarios,
    iniciarSesion,
    cerrarSesion,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
  };
}