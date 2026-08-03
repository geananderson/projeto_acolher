package com.example.service;

import com.example.DTO.DadosCadastroToken;
import com.example.DTO.DadosListagemToken;
import com.example.entity.AutenticacaoToken;
import com.example.entity.Usuario;
import com.example.exceptions.RecursoNaoEncontradoException;
import com.example.repository.AutenticacaoTokenRepository;
import com.example.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AutenticacaoTokenService {

    private final AutenticacaoTokenRepository repository;
    private final UsuarioRepository usuarioRepository;

    @Transactional
    public DadosListagemToken cadastrar(DadosCadastroToken dados) {
        Usuario usuario = usuarioRepository.findById(dados.usuarioId())
                .orElseThrow(() -> new RecursoNaoEncontradoException("Usuário"));
        AutenticacaoToken token = new AutenticacaoToken(
                usuario, dados.token(), dados.tipo(), dados.expiraEm());
        return new DadosListagemToken(repository.save(token));
    }

    public Page<DadosListagemToken> listar(Pageable pageable) {
        return repository.findAll(pageable)
                .map(DadosListagemToken::new);
    }

    public DadosListagemToken buscarPorId(Integer id) {
        return repository.findById(id)
                .map(DadosListagemToken::new)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Token"));
    }

    @Transactional
    public void marcarComoUsado(Integer id) {
        AutenticacaoToken token = repository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Token"));
        token.marcarComoUsado();
        repository.save(token);
    }

    @Transactional
    public void deletar(Integer id) {
        repository.deleteById(id);
    }
}
