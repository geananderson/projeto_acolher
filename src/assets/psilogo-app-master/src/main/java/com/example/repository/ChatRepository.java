package com.example.repository;

import com.example.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Integer> {
    List<Chat> findByEspecialistaId(Integer especialistaId);
}
