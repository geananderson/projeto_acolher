package com.example.DTO;

public record DadosAtualizacaoEspecialista(
        String nomeCompleto,
        String especialidade,
        String biografia,
        String credenciais,
        Boolean disponivel
) {}
