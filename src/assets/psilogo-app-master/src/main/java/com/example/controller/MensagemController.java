package com.example.controller;

import com.example.DTO.DadosCadastroMensagem;
import com.example.DTO.DadosListagemMensagem;
import com.example.service.MensagemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@Tag(name = "Mensagens", description = "Gerenciamento de mensagens")
@RestController
@RequestMapping("/mensagens")
@RequiredArgsConstructor
public class MensagemController {

    private final MensagemService service;

    @Operation(summary = "Enviar mensagem")
    @PostMapping
    public ResponseEntity<DadosListagemMensagem> enviar(
            @RequestBody @Valid DadosCadastroMensagem dados) {
        return ResponseEntity.ok(service.enviar(dados));
    }

    @Operation(summary = "Listar mensagens")
    @GetMapping
    public Page<DadosListagemMensagem> listar(Pageable pageable) {
        return service.listar(pageable);
    }

    @Operation(summary = "Listar mensagens por chat")
    @GetMapping("/por-chat/{chatId}")
    public List<DadosListagemMensagem> listarPorChat(@PathVariable Integer chatId) {
        return service.listarPorChat(chatId);
    }

    @Operation(summary = "Excluir mensagem")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Integer id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
