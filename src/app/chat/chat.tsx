import { Feather } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  conectarChat,
  desconectarChat,
  enviarMensagem,
  enviarMensagemWS,
} from '../../services/chat';
import { getIdUsuarioLogado } from '../../services/perfil';

export default function Chat() {
  const router = useRouter();
  const { chatId } = useLocalSearchParams();
  const flatListRef = useRef<FlatList>(null);

  const [mensagens, setMensagens] = useState<{
    id: string;
    text: string;
    fromMe: boolean;
  }[]>([]);
  const [texto, setTexto] = useState("");
  const [etapa, setEtapa] = useState(1);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);

  useEffect(() => {
    async function inicializar() {
      const id = await getIdUsuarioLogado();
      setUsuarioId(id);

      // mensagem de boas vindas do robô
      setMensagens([{
        id: "boas_vindas",
        text: "Olá! Seja muito bem-vindo. 😊\nQual é o seu nome?",
        fromMe: false,
      }]);

      // conecta no WebSocket se já tiver um chatId real
      if (chatId) {
        conectarChat(Number(chatId), (novaMensagem) => {
          // mensagens chegando do outro usuário via WebSocket
          if (novaMensagem.remetenteId !== id) {
            setMensagens((atual) => [
              ...atual,
              {
                id: Math.random().toString(),
                text: novaMensagem.conteudoTexto,
                fromMe: false,
              },
            ]);
          }
        });
      }
    }

    inicializar();

    return () => desconectarChat(); // desconecta ao sair da tela
  }, []);

  const handleEnviarMensagem = async () => {
    if (texto.trim() === "") return;

    const novaMensagem = {
      id: Math.random().toString(),
      text: texto,
      fromMe: true,
    };

    setMensagens((atual) => [...atual, novaMensagem]);
    const textoEnviado = texto;
    setTexto("");

    try {
      if (usuarioId && chatId) {
        // salva no banco via HTTP
        await enviarMensagem({
          autorId: usuarioId,
          chatId: Number(chatId),
          conteudoTexto: textoEnviado,
          tipoMidia: 'texto',
        });

        // envia em tempo real via WebSocket para o outro usuário
        enviarMensagemWS(Number(chatId), usuarioId, textoEnviado);
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }

    // fluxo do robô (só enquanto não há especialista)
    if (etapa === 1) {
      setMensagens((atual) => [...atual, {
        id: Math.random().toString(),
        text: `Prazer em te conhecer, ${textoEnviado}! Como você está se sentindo hoje?`,
        fromMe: false,
      }]);
      setEtapa(2);
    } else if (etapa === 2) {
      setMensagens((atual) => [...atual, {
        id: Math.random().toString(),
        text: "Entendi perfeitamente. Obrigado por compartilhar isso comigo. ❤️\n\nVocê gostaria de conversar com um de nossos especialistas agora?",
        fromMe: false,
      }]);
      setEtapa(3);
    } else if (etapa === 3) {
      const resposta = textoEnviado.toLowerCase();
      const textoRobo = resposta.includes("sim") || resposta.includes("quero") || resposta.includes("vms")
        ? "Perfeito! Estou transferindo você para um especialista agora. Aguarde um momento. 👩‍⚕️"
        : "Entendido! Se precisar de qualquer coisa, estarei aqui. Cuide-se bem! ❤️";

      setMensagens((atual) => [...atual, {
        id: Math.random().toString(),
        text: textoRobo,
        fromMe: false,
      }]);
      setEtapa(4);
    }

    // rola para o final da lista
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={1}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Apoio Humanizado</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        ref={flatListRef}
        data={mensagens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.balao, item.fromMe ? styles.minhaMsg : styles.outraMsg]}>
            <Text style={[styles.textoMsg, item.fromMe ? styles.textoBranco : styles.textoPreto]}>
              {item.text}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.listaConteudo}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem..."
          value={texto}
          onChangeText={setTexto}
        />
        <TouchableOpacity style={styles.botaoEnviar} onPress={handleEnviarMensagem}>
          <Feather name="send" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#FFF",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  listaConteudo: { padding: 20 },
  balao: { padding: 12, borderRadius: 15, marginBottom: 10, maxWidth: "80%" },
  minhaMsg: { alignSelf: "flex-end", backgroundColor: "#00BFA5" },
  outraMsg: { alignSelf: "flex-start", backgroundColor: "#E0E0E0" },
  textoMsg: { fontSize: 16 },
  textoBranco: { color: "#FFF" },
  textoPreto: { color: "#333" },
  inputContainer: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#FFF",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
    marginRight: 10,
  },
  botaoEnviar: {
    backgroundColor: "#00BFA5",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});