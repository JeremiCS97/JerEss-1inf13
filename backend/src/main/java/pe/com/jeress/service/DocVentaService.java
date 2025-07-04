package pe.com.jeress.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import pe.com.jeress.modelo.DocVenta;
import pe.com.jeress.modelo.LineaDocVenta;
import pe.com.jeress.repositorio.DocVentaRepository;

import java.util.List;
import java.util.Optional;

@Service
public class DocVentaService {

    private final DocVentaRepository DocVentaRepository;

    public DocVentaService(DocVentaRepository ordenRepository) {
        this.DocVentaRepository = ordenRepository;
    }

    public List<DocVenta> listarTodos() {
        return DocVentaRepository.findAll();
    }

    public Optional<DocVenta> obtenerPorId(Long id) {
        return DocVentaRepository.findById(id);
    }

    public List<DocVenta> listarPorCarritoId(Long carritoId) {
        return DocVentaRepository.findByCarritoId(carritoId);
    }

    public DocVenta guardar(DocVenta orden) {
        // CascadeType.ALL ensures items will be persisted
        return DocVentaRepository.save(orden);
    }

    @Transactional
    public DocVenta actualizar(Long id, DocVenta ordenActualizada) {
        return DocVentaRepository.findById(id).map(ordenExistente -> {
            ordenExistente.setNumVenta(ordenActualizada.getNumVenta());
            ordenExistente.setFecha(ordenActualizada.getFecha());
            ordenExistente.setSubTotal(ordenActualizada.getSubTotal());
            ordenExistente.setIgv(ordenActualizada.getIgv());
            ordenExistente.setTotal(ordenActualizada.getTotal());
            ordenExistente.setCarrito(ordenActualizada.getCarrito());

            ordenExistente.getItems().clear();
            for (LineaDocVenta item : ordenActualizada.getItems()) {
                item.setDocVenta(ordenExistente);
                ordenExistente.getItems().add(item);
            }

            return DocVentaRepository.save(ordenExistente);
        }).orElseThrow(() -> new RuntimeException("Orden no encontrada con id " + id));
    }

    public void eliminar(Long id) {
        DocVentaRepository.deleteById(id);
    }
}
