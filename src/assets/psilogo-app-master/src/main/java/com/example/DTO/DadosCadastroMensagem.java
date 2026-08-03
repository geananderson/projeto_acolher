package com.example.DTO;

import com.example.enums.TipoMidia;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record DadosCadastroMensagem(
        @NotNull Integer autorId,
        @NotNull Integer chatId,
        @NotBlank @Size(max = 5000) String conteudoTexto,
        TipoMidia tipoMidia
) {}