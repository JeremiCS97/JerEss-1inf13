package pe.com.tiendavirtual.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.com.tiendavirtual.modelo.LineaDocVenta;
import pe.com.tiendavirtual.modelo.DocVenta;
import pe.com.tiendavirtual.repositorio.DocVentaRepository;

import java.util.List;
import java.util.Optional;

@Service
public class OrdenService {

    private final DocVentaRepository ordenRepository;

    public OrdenService(DocVentaRepository ordenRepository) {
        this.ordenRepository = ordenRepository;
    }

    public List<DocVenta> listarTodos() {
        return ordenRepository.findAll();
    }

    public Optional<DocVenta> obtenerPorId(Long id) {
        return ordenRepository.findById(id);
    }

    public List<DocVenta> listarPorCarritoId(Long carritoId) {
        return ordenRepository.findByCarritoId(carritoId);
    }

    public DocVenta guardar(DocVenta orden) {
        // CascadeType.ALL ensures items will be persisted
        return ordenRepository.save(orden);
    }

    @Transactional
    public DocVenta actualizar(Long id, DocVenta ordenActualizada) {
        return ordenRepository.findById(id).map(ordenExistente -> {
            ordenExistente.setNumVenta(ordenActualizada.getNumVenta());
            ordenExistente.setFecha(ordenActualizada.getFecha());
            ordenExistente.setSubTotal(ordenActualizada.getSubTotal());
            ordenExistente.setIgv(ordenActualizada.getIgv());
            ordenExistente.setTotal(ordenActualizada.getTotal());
            ordenExistente.setCarrito(ordenActualizada.getCarrito());

            ordenExistente.getItems().clear();
            for (LineaDocVenta item : ordenActualizada.getItems()) {
                item.setDocventa(ordenExistente);
                ordenExistente.getItems().add(item);
            }

            return ordenRepository.save(ordenExistente);
        }).orElseThrow(() -> new RuntimeException("Orden no encontrada con id " + id));
    }

    public void eliminar(Long id) {
        ordenRepository.deleteById(id);
    }
}
