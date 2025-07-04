package pe.com.jeress.modelo;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "DOCVENTA")
@Data
public class DocVenta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numVenta")
    private Integer numVenta;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idCarrito")
    private Carrito carrito;

    @Column(name="fecha")
    @Temporal(TemporalType.DATE)
    private Date fecha;

    @Column(name="subTotal")
    private double subTotal;

    @Column(name="igv")
    private double igv;

    @Column(name="total")
    private double total;

    @OneToMany(mappedBy = "docVenta", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference("docventa-lineas")
    private List<LineaDocVenta> items = new ArrayList<>();
}
