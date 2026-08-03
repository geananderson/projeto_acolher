package com.example.repository;

import com.example.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
   boolean existsByEmail(String email);
   Optional<Usuario> findByEmail(String email);
}