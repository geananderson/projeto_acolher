package com.example.DTO;

import com.example.entity.Mensagem;
import com.example.enums.TipoMidia;
import java.time.LocalTime;

public record DadosListagemMensagem(
        Integer id,
        Integer autorId,
        Integer chatId,
        String anonimo,
        String conteudoTexto,
        TipoMidia tipoMidia,
        LocalTime enviadaEm,
        LocalTime ultimaLeitura,
        Boolean excluida
) {
    public DadosListagemMensagem(Mensagem m) {
        this(
                m.getId(),
                m.getAutor().getId(),
                m.getChat().getId(),
                m.getAutor().getAnonimo(),
                m.getConteudoTexto(),
                m.getTipoMidia(),
                m.getEnviadaEm(),
                m.getUltimaLeitura(),
                m.getExcluida()
        );
    }
}
