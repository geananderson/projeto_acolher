package com.example.controller;

import com.example.DTO.DadosCadastroToken;
import com.example.DTO.DadosListagemToken;
import com.example.service.AutenticacaoTokenService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tokens")
@RequiredArgsConstructor
public class AutenticacaoTokenController {

    private final AutenticacaoTokenService service;

    @PostMapping
    public ResponseEntity<DadosListagemToken> cadastrar(
            @RequestBody @Valid DadosCadastroToken dados) {
        return ResponseEntity.ok(service.cadastrar(dados));
    }

    @GetMapping
    public Page<DadosListagemToken> listar(Pageable pageable) {
        return service.listar(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DadosListagemToken> buscarPorId(
            @PathVariable Integer id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PutMapping("/{id}/usar")
    public ResponseEntity<Void> marcarComoUsado(@PathVariable Integer id) {
        service.marcarComoUsado(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
