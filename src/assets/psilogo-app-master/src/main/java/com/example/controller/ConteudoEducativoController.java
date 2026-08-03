package com.example.controller;

import com.example.DTO.DadosAtualizacaoConteudo;
import com.example.DTO.DadosCadastroConteudo;
import com.example.DTO.DadosListagemConteudo;
import com.example.service.ConteudoEducativoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/conteudos")
@RequiredArgsConstructor
public class ConteudoEducativoController {

    private final ConteudoEducativoService service;

    @PostMapping
    public ResponseEntity<DadosListagemConteudo> cadastrar(
            @RequestBody @Valid DadosCadastroConteudo dados) {
        return ResponseEntity.ok(service.cadastrar(dados));
    }

    @GetMapping
    public Page<DadosListagemConteudo> listar(Pageable pageable) {
        return service.listar(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DadosListagemConteudo> buscarPorId(
            @PathVariable Integer id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DadosListagemConteudo> atualizar(
            @PathVariable Integer id,
            @RequestBody @Valid DadosAtualizacaoConteudo dados) {
        return ResponseEntity.ok(service.atualizar(id, dados));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
