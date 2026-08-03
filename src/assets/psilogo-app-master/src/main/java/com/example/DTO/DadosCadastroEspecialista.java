package com.example.DTO;

import com.example.enums.PrioridadeChat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DadosCadastroEspecialista(
        @NotNull Integer usuarioId,
        @NotBlank String nomeCompleto,
        String credenciais,
        @NotBlank String crm,
        @NotBlank String especialidade,
        String biografia,
        @NotNull Boolean disponivel
) {}