package com.example.entity;

import com.example.DTO.DadosAtualizacaoEspecialista;
import com.example.DTO.DadosCadastroEspecialista;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Entity
@Table(name = "especialidades")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Especialista {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(name = "nome", nullable = false, length = 100)
    private String nomeCompleto;

    @Column(length = 255)
    private String credenciais;

    @Column(name = "codigo_crp", length = 20)
    private String crm;

    @Column(length = 100)
    private String especialidade;

    @Size(max = 1000, message = "Biografia muito longa")
    @Column(columnDefinition = "VARCHAR(1000)")
    private String biografia;

    @Column(nullable = false)
    private Boolean disponivel = true;

    @DecimalMin(value = "0.0", message = "Nota não pode ser negativa")
    @DecimalMax(value = "5.0", message = "Nota não pode ser maior que 5")
    @Digits(integer = 1, fraction = 2)
    @Column(name = "nota_media", precision = 3, scale = 2)
    private BigDecimal notaMedia = BigDecimal.valueOf(5.0);

    public Especialista(DadosCadastroEspecialista dados, Usuario usuario) {
        this.usuario       = usuario;
        this.nomeCompleto  = dados.nomeCompleto();
        this.credenciais   = dados.credenciais();
        this.crm           = dados.crm();
        this.especialidade = dados.especialidade();
        this.biografia     = dados.biografia();
        this.disponivel    = dados.disponivel();
        this.notaMedia     = BigDecimal.valueOf(5.0);
    }

    public void atualizar(DadosAtualizacaoEspecialista dados) {
        if (dados.especialidade() != null) this.especialidade = dados.especialidade();
        if (dados.biografia() != null)     this.biografia     = dados.biografia();
        if (dados.credenciais() != null)   this.credenciais   = dados.credenciais();
        if (dados.disponivel() != null)    this.disponivel    = dados.disponivel();
    }
}