package com.example.service;

import com.example.DTO.DadosAtualizacaoUsuario;
import com.example.DTO.DadosCadastroUsuario;
import com.example.DTO.DadosListagemUsuario;
import com.example.entity.Usuario;
import com.example.exceptions.EmailJaCadastradoException;
import com.example.exceptions.RecursoNaoEncontradoException;
import com.example.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository repository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public DadosListagemUsuario cadastrar(DadosCadastroUsuario dados) {
        if (repository.existsByEmail(dados.email())) {
            throw new EmailJaCadastradoException();
        }
        Usuario usuario = new Usuario(dados);
        usuario.setSenha(passwordEncoder.encode(dados.senha()));
        return new DadosListagemUsuario(repository.save(usuario));
    }

    public Page<DadosListagemUsuario> listar(Pageable pageable) {
        return repository.findAll(pageable)
                .map(DadosListagemUsuario::new);
    }
    public DadosListagemUsuario buscarPorId(Integer id) {
        return repository.findById(id)
                .map(DadosListagemUsuario::new)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Usuário"));
    }

    @Transactional
    public DadosListagemUsuario atualizar(Integer id, DadosAtualizacaoUsuario dados) {
        Usuario usuario = repository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Usuário"));
        usuario.atualizar(dados);
        return new DadosListagemUsuario(repository.save(usuario));
    }

    @Transactional
    public void deletar(Integer id) {
        repository.deleteById(id);
    }
}
