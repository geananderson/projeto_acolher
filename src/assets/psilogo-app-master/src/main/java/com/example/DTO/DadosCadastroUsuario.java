package com.example.DTO;

import com.example.enums.TipoUsuario;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record DadosCadastroUsuario(
        @NotBlank String nomeCompleto,
        String anonimo,
        @NotBlank @Email String email,
        @NotBlank @Size(min = 8) String senha,
        String fotoPerfil,
        String imagemAvatar,
        TipoUsuario tipo
) {}
