package com.example.service;

import com.example.DTO.DadosCadastroChat;
import com.example.DTO.DadosListagemChat;
import com.example.entity.Chat;
import com.example.entity.Especialista;
import com.example.entity.Usuario;
import com.example.exceptions.RecursoNaoEncontradoException;
import com.example.repository.ChatRepository;
import com.example.repository.EspecialistaRepository;
import com.example.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final UsuarioRepository usuarioRepository;
    private final EspecialistaRepository especialistaRepository;

    @Transactional
    public DadosListagemChat cadastrar(DadosCadastroChat dados) {
        Usuario usuario = usuarioRepository.findById(dados.usuarioId())
                .orElseThrow(() -> new RecursoNaoEncontradoException("Usuário"));

        Especialista especialista;
        if (dados.especialistaId() != null) {
            especialista = especialistaRepository.findById(dados.especialistaId())
                    .orElseThrow(() -> new RecursoNaoEncontradoException("Especialista"));
        } else {
            List<Especialista> disponiveis = especialistaRepository.findByDisponivelTrue();
            if (disponiveis.isEmpty()) {
                throw new RecursoNaoEncontradoException("Nenhum especialista disponível");
            }
            especialista = disponiveis.get(0);
        }

        Chat chat = new Chat(dados, usuario, especialista);
        return new DadosListagemChat(chatRepository.save(chat));
    }

    public Page<DadosListagemChat> listar(Pageable pageable) {
        return chatRepository.findAll(pageable)
                .map(DadosListagemChat::new);
    }

    public DadosListagemChat buscarPorId(Integer id) {
        return chatRepository.findById(id)
                .map(DadosListagemChat::new)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Chat"));
    }

    @Transactional
    public List<DadosListagemChat> listarPorEspecialista(Integer especialistaId) {
        return chatRepository.findByEspecialistaId(especialistaId)
                .stream()
                .map(DadosListagemChat::new)
                .toList();
    }

    @Transactional
    public DadosListagemChat encerrar(Integer id) {
        Chat chat = chatRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Chat"));
        chat.encerrar();
        return new DadosListagemChat(chatRepository.save(chat));
    }

    @Transactional
    public void deletar(Integer id) {
        chatRepository.deleteById(id);
    }
}