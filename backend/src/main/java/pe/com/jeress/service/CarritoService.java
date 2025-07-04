package pe.com.jeress.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import pe.com.jeress.modelo.Carrito;
import pe.com.jeress.modelo.LineaCarrito;
import pe.com.jeress.repositorio.CarritoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CarritoService {
    private final CarritoRepository carritoRepository;

    public CarritoService(CarritoRepository carritoRepository) {
        this.carritoRepository = carritoRepository;
    }

    public List<Carrito> listarTodos() {
        return carritoRepository.findAll();
    }

    public Optional<Carrito> obtenerPorId(Long id) {
        return carritoRepository.findById(id);
    }

    public Carrito guardar(Carrito carrito) {
        return carritoRepository.save(carrito);
    }

    public void eliminar(Long id) {
        carritoRepository.deleteById(id);
    }

    public List<Carrito> listarPorClienteId(Long clienteId) {
        return carritoRepository.findByClienteId(clienteId);
    }

    @Transactional
    public Carrito actualizar(Long id, Carrito carritoActualizado) {
        return carritoRepository.findById(id).map(carritoExistente -> {
            carritoExistente.setNumCarrito(carritoActualizado.getNumCarrito());
            carritoExistente.setFecha(carritoActualizado.getFecha());
            carritoExistente.setCliente(carritoActualizado.getCliente());

            carritoExistente.getLineasCarrito().clear();

            for (LineaCarrito item : carritoActualizado.getLineasCarrito()) {
                item.setCarrito(carritoExistente);
                carritoExistente.getLineasCarrito().add(item);
            }

            return carritoRepository.save(carritoExistente);
        }).orElseThrow(() -> new RuntimeException("Carrito no encontrado con id " + id));
    }

    public Optional<List<Object>> consultarProductosConSubtotales(Long carritoId) {
        return carritoRepository.findById(carritoId)
            .map(carrito -> carrito.getLineasCarrito().stream()
                .map(linea -> {
                    var map = new java.util.HashMap<String, Object>();
                    map.put("producto", linea.getProducto());
                    map.put("cantidad", linea.getCantidad());
                    map.put("subtotal", linea.getTotal());
                    return (Object) map;
                })
                .toList()
            );
    }

    @Transactional
    public boolean reservarProductos(Long carritoId) {
        Optional<Carrito> optCarrito = carritoRepository.findById(carritoId);
        if (optCarrito.isEmpty()) return false;
        Carrito carrito = optCarrito.get();

        for (LineaCarrito linea : carrito.getLineasCarrito()) {
            if (linea.getProducto() == null ||
                !Boolean.TRUE.equals(linea.getProducto().getEstaActivo()) ||
                linea.getProducto().getCantProducto() < linea.getCantidad()) {
                return false;
            }
        }
        return true;
    }

    @Transactional
    public boolean procesarCarrito(Long carritoId) {
        Optional<Carrito> optCarrito = carritoRepository.findById(carritoId);
        if (optCarrito.isEmpty()) return false;
        Carrito carrito = optCarrito.get();

        // Validar stock y estado de productos
        for (LineaCarrito linea : carrito.getLineasCarrito()) {
            if (linea.getProducto() == null ||
                !Boolean.TRUE.equals(linea.getProducto().getEstaActivo()) ||
                linea.getProducto().getCantProducto() < linea.getCantidad()) {
                return false;
            }
        }

        // Descontar stock
        for (LineaCarrito linea : carrito.getLineasCarrito()) {
            int nuevoStock = linea.getProducto().getCantProducto() - linea.getCantidad();
            linea.getProducto().setCantProducto(nuevoStock);
            linea.getProducto().setEstaActivo(nuevoStock > 0);
        }

        carritoRepository.save(carrito);
        return true;
    }
}
