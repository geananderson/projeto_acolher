package com.example.entity;

import com.example.DTO.DadosCadastroMensagem;
import com.example.enums.TipoMidia;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalTime;

@Entity
@Table(name = "mensagem")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Mensagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "remetente_id", nullable = false)
    private Usuario autor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_id", nullable = false)
    private Chat chat;

    @Column(name = "conteudo_texto", columnDefinition = "VARCHAR(5000)")
    private String conteudoTexto;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_midia",
            columnDefinition = "ENUM('texto','audio','imagem','video')")
    private TipoMidia tipoMidia;

    @Column(name = "enviada_em")
    private LocalTime enviadaEm;

    @Column(name = "ultima_leitura")
    private LocalTime ultimaLeitura;

    @Column(name = "excluida", nullable = false)
    private Boolean excluida = false;

    @PrePersist
    protected void onCreate() {
        if (enviadaEm == null) enviadaEm = LocalTime.now();
        if (tipoMidia == null) tipoMidia = TipoMidia.texto;
        if (excluida == null) excluida = false;
    }

    public void excluir() {
        this.excluida = true;
    }

    public Mensagem(DadosCadastroMensagem dados, Usuario autor, Chat chat) {
        this.autor         = autor;
        this.chat          = chat;
        this.conteudoTexto = dados.conteudoTexto();
        this.tipoMidia     = dados.tipoMidia() != null ? dados.tipoMidia() : TipoMidia.texto;
    }
}
