package com.example.entity;

import com.example.DTO.DadosAtualizacaoConteudo;
import com.example.DTO.DadosCadastroConteudo;
import com.example.enums.TipoConteudo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "conteudo_educativo")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class ConteudoEducativo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_conteudo")
    private Integer id;

    @Column(nullable = false, length = 200)
    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(nullable = false)
    private Boolean publicados = false;

    @Column(name = "url_arquivo", length = 500)
    private String urlArquivo;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('exercicio','leitura','audio')")
    private TipoConteudo tipo;

    public ConteudoEducativo(DadosCadastroConteudo dados) {
        this.titulo     = dados.titulo();
        this.descricao  = dados.descricao();
        this.publicados = dados.publicados() != null ? dados.publicados() : false;
        this.urlArquivo = dados.urlArquivo();
        this.tipo       = dados.tipo() != null ? dados.tipo() : TipoConteudo.leitura;
    }

    public void atualizar(DadosAtualizacaoConteudo dados) {
        if (dados.titulo() != null)     this.titulo     = dados.titulo();
        if (dados.descricao() != null)  this.descricao  = dados.descricao();
        if (dados.publicados() != null) this.publicados = dados.publicados();
        if (dados.urlArquivo() != null) this.urlArquivo = dados.urlArquivo();
        if (dados.tipo() != null)       this.tipo       = dados.tipo();
    }
}
