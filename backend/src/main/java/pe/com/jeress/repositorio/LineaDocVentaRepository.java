package pe.com.jeress.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import pe.com.jeress.modelo.LineaDocVenta;

import java.util.List;

public interface LineaDocVentaRepository extends JpaRepository<LineaDocVenta, Long> {
    List<LineaDocVenta> findByDocVentaId(Long docVentaId);
}
