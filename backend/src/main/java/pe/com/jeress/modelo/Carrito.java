package pe.com.jeress.modelo;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "CARRITO")
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Carrito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numCarrito")
    private Integer numCarrito;

    @Column(name = "fecha")
    private Date fecha;

    @Column(name = "total")
    private BigDecimal total;

    @Column(name = "igv")
    private BigDecimal igv;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idCliente")
    //@JsonBackReference
    @JsonIgnore
    private Cliente cliente;

    @OneToMany(mappedBy = "carrito", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<LineaCarrito> lineasCarrito = new ArrayList<>();

    @OneToOne(mappedBy = "carrito")
    @JsonIgnore
    private DocVenta docVenta;
}
