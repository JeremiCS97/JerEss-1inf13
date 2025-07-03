package pe.com.tiendavirtual.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.com.tiendavirtual.modelo.Rol;

@Repository
public interface RolRepository  extends JpaRepository<Rol, Long> {
    Rol findByCodRol(String codRol);
}
