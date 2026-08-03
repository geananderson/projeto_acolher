package com.example.repository;

import com.example.entity.Mensagem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MensagemRepository extends JpaRepository<Mensagem, Integer> {
    List<Mensagem> findByChatId(Integer chatId);
    List<Mensagem> findByExcluidaFalseOrderByEnviadaEmAsc();
}
