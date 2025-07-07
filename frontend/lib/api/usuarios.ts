import { Usuario } from "@/modelo/usuario";

const baseUrl = process.env.NEXT_PUBLIC_URL_BASE_API;

// Listar todos los usuarios
export async function getUsuarios(): Promise<Usuario[]> {
  if (!baseUrl) throw new Error('La URL base de la API no está definida');
  const response = await fetch(`${baseUrl}/usuarios`);
  if (!response.ok) throw new Error(`Error al listar usuarios: ${response.status} ${response.statusText}`);
  return response.json();
}

// Obtener usuario por ID
export async function getUsuarioPorId(id: number): Promise<Usuario> {
  if (!baseUrl) throw new Error('La URL base de la API no está definida');
  const response = await fetch(`${baseUrl}/usuarios/${id}`);
  if (!response.ok) throw new Error(`Error al obtener usuario: ${response.status} ${response.statusText}`);
  return response.json();
}

// Crear usuario
export async function crearUsuario(usuario: Omit<Usuario, 'id'>): Promise<Usuario> {
  if (!baseUrl) throw new Error('La URL base de la API no está definida');
  const response = await fetch(`${baseUrl}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario)
  });
  if (!response.ok) throw new Error(`Error al crear usuario: ${response.status} ${response.statusText}`);
  return response.json();
}

// Actualizar usuario
export async function actualizarUsuario(usuario: Usuario): Promise<Usuario> {
  if (!baseUrl) throw new Error('La URL base de la API no está definida');
  const response = await fetch(`${baseUrl}/usuarios/${usuario.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario)
  });
  if (!response.ok) throw new Error(`Error al actualizar usuario: ${response.status} ${response.statusText}`);
  return response.json();
}

// Eliminar usuario
export async function eliminarUsuario(id: number): Promise<void> {
  if (!baseUrl) throw new Error('La URL base de la API no está definida');
  const response = await fetch(`${baseUrl}/usuarios/${id}`, {
    method: "DELETE"
  });
  if (!response.ok) throw new Error(`Error al eliminar usuario: ${response.status} ${response.statusText}`);
}

// Buscar usuario por codUsuario
export async function getUsuarioPorCodUsuario(codUsuario: string): Promise<Usuario | null> {
  if (!baseUrl) throw new Error('La URL base de la API no está definida');
  const response = await fetch(`${baseUrl}/usuarios/codUsuario/${codUsuario}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Error al buscar usuario: ${response.status} ${response.statusText}`);
  return response.json();
}

// Buscar usuario por correo
export async function getUsuarioPorCorreo(correo: string): Promise<Usuario | null> {
  if (!baseUrl) throw new Error('La URL base de la API no está definida');
  const response = await fetch(`${baseUrl}/usuarios/correo/${correo}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Error al buscar usuario: ${response.status} ${response.statusText}`);
  return response.json();
}


/*export async function loginUsuario(codUsuario: string, contrasen: string): Promise<Usuario> {
  const usuario = await getUsuarioPorCodUsuario(codUsuario);
  if (!usuario || usuario.contrasen !== contrasen) {
    throw new Error("Usuario o contraseña incorrectos");
  }
  return usuario;
}*/

// lib/api/usuarios.ts
export async function loginUsuario(codUsuario: string, contrasen: string): Promise<Usuario> {
  if (!baseUrl) throw new Error('La URL base de la API no está definida');
  const response = await fetch(`${baseUrl}/usuarios/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ codUsuario, contrasen })
  });
  if (response.status === 404) {
    throw new Error("Usuario no encontrado");
  }
  if (response.status === 401) {
    throw new Error("Contraseña incorrecta");
  }
  if (!response.ok) {
    throw new Error(`Error al iniciar sesión: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

