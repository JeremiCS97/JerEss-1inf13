package pe.com.tiendavirtual.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.com.tiendavirtual.modelo.LineaCarrito;

import java.util.List;

public interface LineaCarritoRepository extends JpaRepository<LineaCarrito, Long> {
    List<LineaCarrito> findByCarritoId(Long carritoId);
}
