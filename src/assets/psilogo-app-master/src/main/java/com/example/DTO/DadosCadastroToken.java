package com.example.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalTime;

public record DadosCadastroToken(
        @NotNull Integer usuarioId,
        @NotBlank String token,
        @NotNull Integer tipo,
        @NotNull LocalTime expiraEm
) {}
