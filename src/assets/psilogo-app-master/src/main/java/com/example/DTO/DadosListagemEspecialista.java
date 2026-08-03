package com.example.DTO;

import com.example.entity.Especialista;
import java.math.BigDecimal;

public record DadosListagemEspecialista(
        Integer id,
        Integer usuarioId,
        String nomeCompleto,
        String crm,
        String especialidade,
        String biografia,
        String credenciais,
        Boolean disponivel,
        BigDecimal notaMedia
) {
    public DadosListagemEspecialista(Especialista e) {
        this(
                e.getId(),
                e.getUsuario().getId(),
                e.getNomeCompleto(),
                e.getCrm(),
                e.getEspecialidade(),
                e.getBiografia(),
                e.getCredenciais(),
                e.getDisponivel(),
                e.getNotaMedia()
        );
    }
}
