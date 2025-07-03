package pe.com.tiendavirtual.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.com.tiendavirtual.modelo.DocVenta;

import java.util.List;

public interface DocVentaRepository extends JpaRepository<DocVenta, Long> {
    List<DocVenta> findByCarritoId(Long carritoId);
}
