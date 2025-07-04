package pe.com.jeress.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import pe.com.jeress.modelo.LineaCarrito;

import java.util.List;

public interface LineaCarritoRepository extends JpaRepository<LineaCarrito, Long> {
    List<LineaCarrito> findByCarritoId(Long carritoId);
}
