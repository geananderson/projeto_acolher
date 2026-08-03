package com.example.repository;

import com.example.entity.Especialista;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EspecialistaRepository extends JpaRepository<Especialista, Integer> {
    List<Especialista> findByDisponivelTrue();
}
