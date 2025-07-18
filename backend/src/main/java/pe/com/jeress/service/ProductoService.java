package pe.com.jeress.service;

import org.springframework.stereotype.Service;

import pe.com.jeress.modelo.Producto;
import pe.com.jeress.repositorio.ProductoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {
    private final ProductoRepository repo;

    public ProductoService(ProductoRepository repo) {
        this.repo = repo;
    }

    public List<Producto> listarTodos() {
        return repo.findAll();
    }

    public Optional<Producto> obtenerPorId(Long id) {
        return repo.findById(id);
    }

    public Producto guardar(Producto producto) {
        return repo.save(producto);
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}
