package pe.com.jeress.modelo;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "PRODUCTO")
@Data
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codProducto")
    private String codProducto;

    @Column(name = "nomProducto")
    private String nomProducto;

    @Column(name = "descProducto")
    private String descProducto;

    @Column(name = "precProducto")
    private BigDecimal precProducto;

    @Column(name = "cantProducto")
    private Integer cantProducto;
    
    @Column(name = "estaActivo")
    private Boolean estaActivo;
    
}
