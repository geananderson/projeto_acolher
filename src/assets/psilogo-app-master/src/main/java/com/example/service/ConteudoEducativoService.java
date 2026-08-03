package com.example.service;

import com.example.DTO.DadosAtualizacaoConteudo;
import com.example.DTO.DadosCadastroConteudo;
import com.example.DTO.DadosListagemConteudo;
import com.example.entity.ConteudoEducativo;
import com.example.exceptions.RecursoNaoEncontradoException;
import com.example.repository.ConteudoEducativoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ConteudoEducativoService {

    private final ConteudoEducativoRepository repository;

    @Transactional
    public DadosListagemConteudo cadastrar(DadosCadastroConteudo dados) {
        ConteudoEducativo conteudo = new ConteudoEducativo(dados);
        return new DadosListagemConteudo(repository.save(conteudo));
    }

    public Page<DadosListagemConteudo> listar(Pageable pageable) {
        return repository.findAll(pageable)
                .map(DadosListagemConteudo::new);
    }

    public DadosListagemConteudo buscarPorId(Integer id) {
        return repository.findById(id)
                .map(DadosListagemConteudo::new)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Conteúdo"));
    }

    @Transactional
    public DadosListagemConteudo atualizar(Integer id, DadosAtualizacaoConteudo dados) {
        ConteudoEducativo conteudo = repository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Conteúdo"));
        conteudo.atualizar(dados);
        return new DadosListagemConteudo(repository.save(conteudo));
    }

    @Transactional
    public void deletar(Integer id) {
        repository.deleteById(id);
    }
}
