package pe.com.jeress.modelo;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "USUARIO")
@Data
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idRol")
    private Rol rol;
    
    @Column(name = "codUsuario")
    private String codUsuario;
    
    @Column(name = "contrasen")
    private String contrasen;
    
    @Column(name = "correo")
    private String correo;
    
    @Column(name = "estaActivo")
    private Boolean estaActivo;
    
}
