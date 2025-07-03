package pe.com.tiendavirtual.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.com.tiendavirtual.modelo.LineaDocVenta;
import pe.com.tiendavirtual.modelo.DocVenta;
import pe.com.tiendavirtual.service.OrdenService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ordenes")
public class OrdenController {
    private final OrdenService ordenService;

    public OrdenController(OrdenService ordenService) {
        this.ordenService = ordenService;
    }

    @GetMapping
    public List<DocVenta> listar() {
        return ordenService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DocVenta> obtenerPorId(@PathVariable Long id) {
        Optional<DocVenta> orden = ordenService.obtenerPorId(id);
        return orden.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/carrito/{carritoId}")
    public List<DocVenta> listarPorCarritoId(@PathVariable Long carritoId) {
        return ordenService.listarPorCarritoId(carritoId);
    }

    @PostMapping
    public ResponseEntity<DocVenta> crear(@RequestBody DocVenta orden) {
        if (orden.getItems() != null) {
            for (LineaDocVenta item : orden.getItems()) {
                item.setOrden(orden); // set the parent reference
            }
        }
        DocVenta nuevaOrden = ordenService.guardar(orden);
        return ResponseEntity.ok(nuevaOrden);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DocVenta> actualizar(@PathVariable Long id, @RequestBody DocVenta ordenActualizada) {
        Optional<DocVenta> ordenExistente = ordenService.obtenerPorId(id);
        if (ordenExistente.isPresent()) {
            ordenActualizada.setId(id);
            if (ordenActualizada.getItems() != null) {
                for (LineaDocVenta item : ordenActualizada.getItems()) {
                    item.setOrden(ordenActualizada);
                }
            }
            DocVenta actualizada = ordenService.guardar(ordenActualizada);
            return ResponseEntity.ok(actualizada);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        ordenService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
