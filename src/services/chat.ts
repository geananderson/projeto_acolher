import api from './api';
const { Client } = require("@stomp/stompjs");
const SockJS = require("sockjs-client");

let stompClient: any = null;

export function conectarChat(chatId: number, onMensagem: (msg: any) => void) {
  stompClient = new Client({
    webSocketFactory: () => new SockJS("https://roast-kettle-rippling.ngrok-free.dev/ws"),
    onConnect: () => {
      stompClient?.subscribe(`/topic/chat/${chatId}`, (frame: any) => {
        const mensagem = JSON.parse(frame.body);
        onMensagem(mensagem);
      });
    },
    onDisconnect: () => console.log("WebSocket desconectado"),
  });

  stompClient.activate();
}

export function enviarMensagemWS(chatId: number, remetenteId: number, texto: string) {
  stompClient?.publish({
    destination: `/app/chat/${chatId}`,
    body: JSON.stringify({
      remetenteId,
      chatId,
      conteudoTexto: texto,
    }),
  });
}

export function desconectarChat() {
  stompClient?.deactivate();
}

export async function listarEspecialistas() {
  const response = await api.get('/especialistas');
  return response.data.content;
}

export async function listarChatsPorEspecialista(especialistaId: number) {
  const response = await api.get(`/chats?especialistaId=${especialistaId}`);
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

export async function listarMensagensPorChat(chatId: number) {
  const response = await api.get(`/mensagens/por-chat/${chatId}`);
  return response.data;
}

export async function enviarMensagem(dados: {
  autorId: number;
  chatId: number;
  conteudoTexto: string;
  tipoMidia: string;
}) {
  const response = await api.post('/mensagens', dados);
  return response.data;
}

export async function listarMensagens() {
  const response = await api.get('/mensagens');
  return response.data.content;
}