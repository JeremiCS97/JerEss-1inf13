package pe.com.jeress.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pe.com.jeress.modelo.Producto;

@Repository
public interface ProductoRepository  extends JpaRepository<Producto, Long> {
}
