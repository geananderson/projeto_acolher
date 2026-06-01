import api from './api';

export async function listarEspecialistas() {
  const response = await api.get('/especialistas');
  return response.data.content;
}

export async function criarChat(usuarioId: number, especialistaId: number) {
  const response = await api.post('/chats', {
    usuarioId,
    especialistaId,
    prioridade: 'media'
  });
  return response.data;
}

export async function enviarMensagem(autorId: number, conteudoTexto: string) {
  const response = await api.post('/mensagens', {
    autorId,
    conteudoTexto,
    tipoMidia: 'texto'
  });
  return response.data;
}

export async function listarMensagens() {
  const response = await api.get('/mensagens');
  return response.data.content;
}