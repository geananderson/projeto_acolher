package com.example.repository;

import com.example.entity.AutenticacaoToken;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AutenticacaoTokenRepository extends JpaRepository<AutenticacaoToken, Integer> {
    Optional<AutenticacaoToken> findByToken(String token);
}