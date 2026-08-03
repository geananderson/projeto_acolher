package com.example.DTO;

import com.example.entity.Chat;
import com.example.enums.PrioridadeChat;
import com.example.enums.StatusChat;
import java.time.LocalDate;

public record DadosListagemChat(
        Integer id,
        Integer usuarioId,
        Integer especialistaId,
        StatusChat status,
        PrioridadeChat prioridade,
        LocalDate entrouEm,
        LocalDate encerradoEm
) {
    public DadosListagemChat(Chat chat) {
        this(
                chat.getId(),
                chat.getUsuario().getId(),
                chat.getEspecialista().getId(),
                chat.getStatus(),
                chat.getPrioridade(),
                chat.getEntrouEm(),
                chat.getEncerradoEm()
        );
    }
}
