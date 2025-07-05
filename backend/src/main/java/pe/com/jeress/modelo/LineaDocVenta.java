package pe.com.jeress.modelo;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

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
    //@JsonBackReference
    @JsonIgnore
    private Producto producto;

    @Column(name="cantidad")
    private int cantidad;

    @Column(name="subTotal")
    private double subTotal;

    @OneToOne
    @JoinColumn(name = "idLineaCarrito")
    @JsonIgnore
    private LineaCarrito lineaCarrito;
}
