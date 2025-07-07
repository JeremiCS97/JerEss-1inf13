import { Rol } from "./rol";

export interface Usuario {
  id: number;
  rol: Rol;
  codUsuario: string;
  contrasen: string;
  correo: string;
  estaActivo: boolean;
}