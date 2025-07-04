package pe.com.jeress.service;

import org.springframework.stereotype.Service;

import pe.com.jeress.modelo.Rol;
import pe.com.jeress.repositorio.RolRepository;

import java.util.List;
import java.util.Optional;

@Service
public class RolService {
    private final RolRepository repo;

    public RolService(RolRepository repo) {
        this.repo = repo;
    }

    public List<Rol> listarTodos() {
        return repo.findAll();
    }

    public Optional<Rol> obtenerPorId(Long id) {
        return repo.findById(id);
    }

    public Rol guardar(Rol rol) {
        return repo.save(rol);
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}
