package com.example.service;

import com.example.DTO.DadosAtualizacaoEspecialista;
import com.example.DTO.DadosCadastroEspecialista;
import com.example.DTO.DadosListagemEspecialista;
import com.example.entity.Especialista;
import com.example.entity.Usuario;
import com.example.exceptions.RecursoNaoEncontradoException;
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
public class EspecialistaService {

    private final EspecialistaRepository repository;
    private final UsuarioRepository usuarioRepository;

    @Transactional
    public DadosListagemEspecialista cadastrar(DadosCadastroEspecialista dados) {
        Usuario usuario = usuarioRepository.findById(dados.usuarioId())
                .orElseThrow(() -> new RecursoNaoEncontradoException("Usuário"));
        Especialista especialista = new Especialista(dados, usuario);
        return new DadosListagemEspecialista(repository.save(especialista));
    }

    public Page<DadosListagemEspecialista> listar(Pageable pageable) {
        return repository.findAll(pageable)
                .map(DadosListagemEspecialista::new);
    }

    public DadosListagemEspecialista buscarPorId(Integer id) {
        return repository.findById(id)
                .map(DadosListagemEspecialista::new)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Especialista"));
    }

    @Transactional
    public DadosListagemEspecialista atualizar(Integer id, DadosAtualizacaoEspecialista dados) {
        Especialista especialista = repository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Especialista"));
        especialista.atualizar(dados);
        return new DadosListagemEspecialista(repository.save(especialista));
    }

    @Transactional
    public void deletar(Integer id) {
        repository.deleteById(id);
    }
}
