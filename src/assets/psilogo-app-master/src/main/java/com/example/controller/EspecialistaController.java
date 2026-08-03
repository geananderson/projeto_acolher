package com.example.controller;

import com.example.DTO.DadosAtualizacaoEspecialista;
import com.example.DTO.DadosCadastroEspecialista;
import com.example.DTO.DadosListagemEspecialista;
import com.example.service.EspecialistaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Tag(name = "Especialistas", description = "Gerenciamento de especialistas")
@RestController
@RequestMapping("/especialistas")
@RequiredArgsConstructor
public class EspecialistaController {

    private final EspecialistaService service;

    @Operation(summary = "Cadastrar especialista")
    @PostMapping
    public ResponseEntity<DadosListagemEspecialista> cadastrar(
            @RequestBody @Valid DadosCadastroEspecialista dados) {
        return ResponseEntity.ok(service.cadastrar(dados));
    }

    @Operation(summary = "Listar especialistas")
    @GetMapping
    public Page<DadosListagemEspecialista> listar(Pageable pageable) {
        return service.listar(pageable);
    }

    @Operation(summary = "Buscar especialista por ID")
    @GetMapping("/{id}")
    public ResponseEntity<DadosListagemEspecialista> buscarPorId(
            @PathVariable Integer id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @Operation(summary = "Atualizar especialista")
    @PutMapping("/{id}")
    public ResponseEntity<DadosListagemEspecialista> atualizar(
            @PathVariable Integer id,
            @RequestBody @Valid DadosAtualizacaoEspecialista dados) {
        return ResponseEntity.ok(service.atualizar(id, dados));
    }

    @Operation(summary = "Deletar especialista")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}