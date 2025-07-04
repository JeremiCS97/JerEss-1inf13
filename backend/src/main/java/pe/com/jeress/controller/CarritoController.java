package pe.com.jeress.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import pe.com.jeress.modelo.Carrito;
import pe.com.jeress.service.CarritoService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/carritos")
public class CarritoController {
    private final CarritoService carritoService;

    public CarritoController(CarritoService carritoService) {
        this.carritoService = carritoService;
    }

    @GetMapping
    public List<Carrito> listar() {
        return carritoService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Carrito> obtenerPorId(@PathVariable Long id) {
        Optional<Carrito> carrito = carritoService.obtenerPorId(id);
        return carrito.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Carrito> crear(@RequestBody Carrito carrito) {
        if (carrito.getLineasCarrito() != null) {
            carrito.getLineasCarrito().forEach(item -> item.setCarrito(carrito));
        }
        Carrito nuevoCarrito = carritoService.guardar(carrito);
        return ResponseEntity.ok(nuevoCarrito);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Carrito> actualizar(@PathVariable Long id, @RequestBody Carrito carritoActualizado) {
        Optional<Carrito> carritoExistente = carritoService.obtenerPorId(id);
        if (carritoExistente.isPresent()) {
            carritoActualizado.setId(id);
            if (carritoActualizado.getLineasCarrito() != null) {
                carritoActualizado.getLineasCarrito().forEach(item -> item.setCarrito(carritoActualizado));
            }
            return ResponseEntity.ok(carritoService.guardar(carritoActualizado));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        carritoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/cliente/{clienteId}")
    public List<Carrito> listarPorCliente(@PathVariable Long clienteId) {
        return carritoService.listarPorClienteId(clienteId);
    }

    //New controllers
    @GetMapping("/{id}/productos")
    public ResponseEntity<List<Object>> consultarProductosConSubtotales(@PathVariable Long id) {
        Optional<List<Object>> productos = carritoService.consultarProductosConSubtotales(id);
        return productos.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/reservar")
    public ResponseEntity<Void> reservarProductos(@PathVariable Long id) {
        boolean reservado = carritoService.reservarProductos(id);
        if (reservado) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/{id}/procesar")
    public ResponseEntity<Void> procesarCarrito(@PathVariable Long id) {
        boolean procesado = carritoService.procesarCarrito(id);
        if (procesado) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}
