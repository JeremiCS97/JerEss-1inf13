package pe.com.jeress.service;

import org.springframework.stereotype.Service;
import pe.com.jeress.modelo.Usuario;
import pe.com.jeress.repositorio.UsuarioRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> obtenerPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    public Usuario guardar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public void eliminar(Long id) {
        usuarioRepository.deleteById(id);
    }

    public Optional<Usuario> obtenerPorCodUsuario(String codUsuario) {
        return Optional.ofNullable(usuarioRepository.findByCodUsuario(codUsuario));
    }

    public Optional<Usuario> obtenerPorCorreo(String correo) {
        return Optional.ofNullable(usuarioRepository.findByCorreo(correo));
    }
}