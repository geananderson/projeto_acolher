package com.example.DTO;

import com.example.entity.Usuario;
import com.example.enums.StatusConta;
import com.example.enums.TipoUsuario;

public record DadosListagemUsuario(
        Integer id,
        String nomeCompleto,
        String anonimo,
        String email,
        String fotoPerfil,
        String imagemAvatar,
        TipoUsuario tipo,
        StatusConta status
) {
    public DadosListagemUsuario(Usuario u) {
        this(
                u.getId(),
                u.getNomeCompleto(),
                u.getAnonimo(),
                u.getEmail(),
                u.getFotoPerfil(),
                u.getImagemAvatar(),
                u.getTipo(),
                u.getStatus()
        );
    }
}