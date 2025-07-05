package pe.com.jeress.modelo;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "LINEACARRITO")
@Data
public class LineaCarrito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idCarrito")
    @JsonBackReference
    private Carrito carrito;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idProducto")
    //    @JsonBackReference
    @JsonIgnore
    private Producto producto;

    @Column(name = "lineaCarrito")
    private Integer lineaCarrito;

    @Column(name="cantidad")
    private int cantidad;

    @Column(name = "total")
    private BigDecimal total;

    @OneToOne(mappedBy = "lineaCarrito")
    @JsonIgnore
    private LineaDocVenta lineaDocVenta;
    
}
