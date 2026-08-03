package com.example.entity;

import com.example.DTO.DadosAtualizacaoUsuario;
import com.example.DTO.DadosCadastroUsuario;
import com.example.enums.StatusConta;
import com.example.enums.TipoUsuario;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "usuario")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nome", nullable = false, length = 100)
    private String nomeCompleto;

    @Column(name = "_anonimo")
    private String anonimo;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(name = "senha", nullable = false, length = 255)
    private String senha;

    @Column(name = "foto_perfil", length = 255)
    private String fotoPerfil;

    @Column(name = "imagem_avatar", length = 255)
    private String imagemAvatar;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoUsuario tipo;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "VARCHAR(20) DEFAULT 'pendente'")
    private StatusConta status;

    public Usuario(DadosCadastroUsuario dados) {
        this.nomeCompleto = dados.nomeCompleto();
        this.anonimo      = dados.anonimo();
        this.email        = dados.email();
        this.senha        = dados.senha();
        this.fotoPerfil   = dados.fotoPerfil();
        this.imagemAvatar = dados.imagemAvatar();
        this.tipo         = dados.tipo() != null ? dados.tipo() : TipoUsuario.usuario;
        this.status       = StatusConta.pendente;
    }

    public void atualizar(DadosAtualizacaoUsuario dados) {
        if (dados.nomeCompleto() != null)  this.nomeCompleto  = dados.nomeCompleto();
        if (dados.anonimo() != null)       this.anonimo       = dados.anonimo();
        if (dados.fotoPerfil() != null)    this.fotoPerfil    = dados.fotoPerfil();
        if (dados.imagemAvatar() != null)  this.imagemAvatar  = dados.imagemAvatar();
    }
}
