export interface Producto {
    id: number;
    codProducto: string;
    nomProducto: string;
    descProducto: string;
    precProducto: number; // Usamos number para BigDecimal en el frontend
    cantProducto: number;
    estaActivo: boolean;
};
