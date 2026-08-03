package com.example.DTO;

import com.example.enums.TipoConteudo;

public record DadosAtualizacaoConteudo(
        String titulo,
        String descricao,
        Boolean publicados,
        String urlArquivo,
        TipoConteudo tipo
) {}
