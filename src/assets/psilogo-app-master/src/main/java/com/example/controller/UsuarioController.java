package com.example.controller;

import com.example.DTO.DadosAtualizacaoUsuario;
import com.example.DTO.DadosCadastroUsuario;
import com.example.DTO.DadosListagemUsuario;
import com.example.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Usuários", description = "Gerenciamento de usuários")
@RestController
@RequestMapping("/cadastros")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService service;

    @Operation(summary = "Cadastrar usuário")
    @PostMapping
    public ResponseEntity<DadosListagemUsuario> cadastrar(
            @RequestBody @Valid DadosCadastroUsuario dados) {
        return ResponseEntity.ok(service.cadastrar(dados));
    }

    @Operation(summary = "Listar usuários")
    @GetMapping
    public Page<DadosListagemUsuario> listar(Pageable pageable) {
        return service.listar(pageable);
    }

    @Operation(summary = "Buscar usuário por ID")
    @GetMapping("/{id}")
    public ResponseEntity<DadosListagemUsuario> buscarPorId(
            @PathVariable Integer id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @Operation(summary = "Atualizar usuário")
    @PutMapping("/{id}")
    public ResponseEntity<DadosListagemUsuario> atualizar(
            @PathVariable Integer id,
            @RequestBody @Valid DadosAtualizacaoUsuario dados) {
        return ResponseEntity.ok(service.atualizar(id, dados));
    }

    @Operation(summary = "Deletar usuário")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
