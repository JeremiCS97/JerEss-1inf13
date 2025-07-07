package pe.com.jeress.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.com.jeress.modelo.Usuario;
import pe.com.jeress.service.UsuarioService;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public List<Usuario> listarTodos() {
        return usuarioService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerPorId(@PathVariable Long id) {
        return usuarioService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Usuario crear(@RequestBody Usuario usuario) {
        return usuarioService.guardar(usuario);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        return usuarioService.obtenerPorId(id).map(u -> {
            usuario.setId(id.intValue());
            return ResponseEntity.ok(usuarioService.guardar(usuario));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        usuarioService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/codUsuario/{codUsuario}")
    public ResponseEntity<Usuario> obtenerPorCodUsuario(@PathVariable String codUsuario) {
        return usuarioService.obtenerPorCodUsuario(codUsuario)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/correo/{correo}")
    public ResponseEntity<Usuario> obtenerPorCorreo(@PathVariable String correo) {
        return usuarioService.obtenerPorCorreo(correo)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}