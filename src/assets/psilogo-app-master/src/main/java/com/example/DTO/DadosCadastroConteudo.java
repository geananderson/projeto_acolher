package com.example.DTO;

import com.example.enums.TipoConteudo;
import jakarta.validation.constraints.NotBlank;

public record DadosCadastroConteudo(
        @NotBlank String titulo,
        String descricao,
        Boolean publicados,
        String urlArquivo,
        TipoConteudo tipo
) {}
