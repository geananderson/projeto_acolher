package com.example.controller;

import com.example.DTO.DadosCadastroChat;
import com.example.DTO.DadosListagemChat;
import com.example.service.ChatService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Chats", description = "Gerenciamento de chats")
@RestController
@RequestMapping("/chats")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService service;

    @Operation(summary = "Criar chat")
    @PostMapping
    public ResponseEntity<DadosListagemChat> cadastrar(
            @RequestBody @Valid DadosCadastroChat dados) {
        return ResponseEntity.ok(service.cadastrar(dados));
    }

    @Operation(summary = "Listar chats")
    @GetMapping
    public Page<DadosListagemChat> listar(Pageable pageable) {
        return service.listar(pageable);
    }

    @Operation(summary = "Buscar chat por ID")
    @GetMapping("/{id}")
    public ResponseEntity<DadosListagemChat> buscarPorId(
            @PathVariable Integer id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @Operation(summary = "Listar chats por especialista")
    @GetMapping("/por-especialista/{especialistaId}")
    public List<DadosListagemChat> listarPorEspecialista(
            @PathVariable Integer especialistaId) {
        return service.listarPorEspecialista(especialistaId);
    }

    @Operation(summary = "Encerrar chat")
    @PutMapping("/{id}/encerrar")
    public ResponseEntity<DadosListagemChat> encerrar(
            @PathVariable Integer id) {
        return ResponseEntity.ok(service.encerrar(id));
    }

    @Operation(summary = "Deletar chat")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
