"use client";
import { useState } from "react";
import { Usuario } from "@/modelo/usuario";

interface PaginaUsuariosProps {
  usuarioActual: Usuario | null;
  iniciarSesion?: (codUsuario: string, contrasen: string) => Promise<void>;
  cerrarSesion?: () => void;
  setMostrarModalUsuario?: (mostrar: boolean) => void;
  error?: string | null;
  cargando?: boolean;
}

const PaginaUsuarios: React.FC<PaginaUsuariosProps> = ({
  usuarioActual,
  iniciarSesion,
  cerrarSesion,
  setMostrarModalUsuario,
  error,
  cargando
}) => {
  const [codUsuario, setCodUsuario] = useState("");
  const [contrasen, setContrasen] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!codUsuario || !contrasen) {
      setLocalError("Completa ambos campos.");
      return;
    }
    if (iniciarSesion) {
      try {
        await iniciarSesion(codUsuario, contrasen);
      } catch (e: any) {
        setLocalError(e.message || "Error al iniciar sesión");
      }
    }
  };

  if (!usuarioActual) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-10 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Iniciar Sesión</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Usuario"
              value={codUsuario}
              onChange={e => setCodUsuario(e.target.value)}
              className="block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              value={contrasen}
              onChange={e => setContrasen(e.target.value)}
              className="block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          {(localError || error) && (
            <div className="text-red-600">{localError || error}</div>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={cargando}
          >
            {cargando ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
        {setMostrarModalUsuario && (
          <button
            onClick={() => setMostrarModalUsuario(false)}
            className="mt-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            Cancelar
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Perfil de Usuario</h2>
      <div className="flex flex-col items-center mb-6">
        {/* Foto de usuario */}
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-2 overflow-hidden">
          <img
            src="/user-avatar.png"
            alt="Foto de usuario"
            className="object-cover w-full h-full"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://ui-avatars.com/api/?name=" +
                encodeURIComponent(usuarioActual.codUsuario);
            }}
          />
        </div>
        <span className="text-lg font-semibold text-gray-700">{usuarioActual.codUsuario}</span>
        <span className="text-sm text-gray-500">{usuarioActual.rol?.descRol}</span>
      </div>
      <div className="space-y-3">
        <div>
          <span className="font-semibold text-gray-700">Usuario:</span>{" "}
          <span className="text-gray-900">{usuarioActual.codUsuario}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Correo:</span>{" "}
          <span className="text-gray-900">{usuarioActual.correo}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Contraseña:</span>{" "}
          <span className="text-gray-900">{usuarioActual.contrasen}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Rol:</span>{" "}
          <span className="text-gray-900">{usuarioActual.rol?.descRol}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Estado:</span>{" "}
          <span className={`font-bold ${usuarioActual.estaActivo ? "text-green-600" : "text-red-600"}`}>
            {usuarioActual.estaActivo ? "Activo" : "Inactivo"}
          </span>
        </div>
      </div>
      <button
        onClick={cerrarSesion}
        className="mt-6 w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default PaginaUsuarios;