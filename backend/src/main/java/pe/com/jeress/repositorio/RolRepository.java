package pe.com.jeress.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pe.com.jeress.modelo.Rol;

@Repository
public interface RolRepository  extends JpaRepository<Rol, Long> {
    Rol findByCodRol(String codRol);
}
