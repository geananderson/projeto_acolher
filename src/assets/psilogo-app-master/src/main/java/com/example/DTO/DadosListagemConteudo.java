package com.example.DTO;

import com.example.entity.ConteudoEducativo;
import com.example.enums.TipoConteudo;

public record DadosListagemConteudo(
        Integer id,
        String titulo,
        String descricao,
        Boolean publicados,
        String urlArquivo,
        TipoConteudo tipo
) {
    public DadosListagemConteudo(ConteudoEducativo c) {
        this(
                c.getId(),
                c.getTitulo(),
                c.getDescricao(),
                c.getPublicados(),
                c.getUrlArquivo(),
                c.getTipo()
        );
    }
}
