package com.example.DTO;

import com.example.enums.PrioridadeChat;
import jakarta.validation.constraints.NotNull;

public record DadosCadastroChat(
        @NotNull Integer usuarioId,
        Integer especialistaId,
        PrioridadeChat prioridade
) {}
