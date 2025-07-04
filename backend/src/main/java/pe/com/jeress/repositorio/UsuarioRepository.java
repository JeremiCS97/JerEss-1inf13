package pe.com.jeress.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pe.com.jeress.modelo.Usuario;

@Repository
public interface UsuarioRepository  extends JpaRepository<Usuario, Long> {
    Usuario findByCodUsuario(String codUsuario);
    Usuario findByCorreo(String correo);
}
