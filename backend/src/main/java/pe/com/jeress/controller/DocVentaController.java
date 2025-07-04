package pe.com.jeress.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import pe.com.jeress.modelo.DocVenta;
import pe.com.jeress.modelo.LineaDocVenta;
import pe.com.jeress.service.DocVentaService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/docventas")
public class DocVentaController {
    private final DocVentaService docVentaService;

    public DocVentaController(DocVentaService docVentaService) {
        this.docVentaService = docVentaService;
    }

    @GetMapping
    public List<DocVenta> listar() {
        return docVentaService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DocVenta> obtenerPorId(@PathVariable Long id) {
        Optional<DocVenta> orden = docVentaService.obtenerPorId(id);
        return orden.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/carrito/{carritoId}")
    public List<DocVenta> listarPorCarritoId(@PathVariable Long carritoId) {
        return docVentaService.listarPorCarritoId(carritoId);
    }

    @PostMapping
    public ResponseEntity<DocVenta> crear(@RequestBody DocVenta orden) {
        if (orden.getItems() != null) {
            for (LineaDocVenta item : orden.getItems()) {
                item.setDocVenta(orden); // set the parent reference
            }
        }
        DocVenta nuevaOrden = docVentaService.guardar(orden);
        return ResponseEntity.ok(nuevaOrden);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DocVenta> actualizar(@PathVariable Long id, @RequestBody DocVenta ordenActualizada) {
        Optional<DocVenta> ordenExistente = docVentaService.obtenerPorId(id);
        if (ordenExistente.isPresent()) {
            ordenActualizada.setId(id);
            if (ordenActualizada.getItems() != null) {
                for (LineaDocVenta item : ordenActualizada.getItems()) {
                    item.setDocVenta(ordenActualizada);
                }
            }
            DocVenta actualizada = docVentaService.guardar(ordenActualizada);
            return ResponseEntity.ok(actualizada);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        docVentaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
