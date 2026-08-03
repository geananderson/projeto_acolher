package com.example.DTO;

import com.example.entity.AutenticacaoToken;
import java.time.LocalTime;
import java.time.LocalDate;

public record DadosListagemToken(
        Integer id,
        Integer tipo,
        String token,
        LocalTime expiraEm,
        LocalDate usadoEm,
        Integer usuarioId
) {
    public DadosListagemToken(AutenticacaoToken t) {
        this(
                t.getId(),
                t.getTipo(),
                t.getToken(),
                t.getExpiraEm(),
                t.getUsadoEm(),
                t.getUsuario().getId()
        );
    }
}
