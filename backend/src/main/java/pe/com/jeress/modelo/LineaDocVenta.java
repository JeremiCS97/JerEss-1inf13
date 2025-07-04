package pe.com.jeress.modelo;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "LINEADOCVENTA")
@Data
public class LineaDocVenta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idDocVenta")
    @JsonBackReference("docventa-lineas")
    private DocVenta docVenta;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idProducto")
    @JsonBackReference
    private Producto producto;

    @Column(name="cantidad")
    private int cantidad;

    @Column(name = "precioUnitario")
    private double precioUnitario;

    @Column(name="subTotal")
    private double subTotal;

    @OneToOne
    @JoinColumn(name = "idLineaCarrito")
    private LineaCarrito lineaCarrito;
}
