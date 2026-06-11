import { Feather } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
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
import { enviarMensagem } from '../../services/chat';
import { getIdUsuarioLogado } from '../../services/perfil';

const MENSAGENS_INICIAIS: {
  id: string;
  text: string;
  fromMe: boolean;
}[] = [];

export default function Chat() {
  const router = useRouter();
  const { chatId } = useLocalSearchParams();
  const [mensagens, setMensagens] = useState(MENSAGENS_INICIAIS);
  const [texto, setTexto] = useState("");
  const [etapa, setEtapa] = useState(1);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);

  useEffect(() => {
    async function carregarUsuario() {
      const id = await getIdUsuarioLogado();
      setUsuarioId(id);
    }
    carregarUsuario();

    setMensagens([{
      id: "boas_vidas",
      text: "Olá! Seja muito bem-vindo. 😊\nQual é o seu nome?",
      fromMe: false,
    }]);
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
        await enviarMensagem({
          autorId: usuarioId,
          chatId: Number(chatId),
          conteudoTexto: textoEnviado,
          tipoMidia: 'texto',
        });
      }
    } catch (error) {
      console.error('Erro ao salvar mensagem:', error);
    }
    

    if (etapa === 1) {
      const respostaRobo = {
        id: Math.random().toString(),
        text: "Prazer em te conhecer, " + textoEnviado + "! Como você está se sentindo hoje?",
        fromMe: false,
      };
      setMensagens((atual) => [...atual, respostaRobo]);
      setEtapa(2);
    } else if (etapa === 2) {
      const respostaRobo = {
        id: Math.random().toString(),
        text: "Entendi perfeitamente. Obrigado por compartilhar isso comigo. ❤️\n\nVocê gostaria de conversar com um de nossos especialistas agora para ter um apoio mais direcionado?",
        fromMe: false,
      };
      setMensagens((atual) => [...atual, respostaRobo]);
      setEtapa(3);
    } else if (etapa === 3) {
      const respostaUsuario = textoEnviado.toLowerCase();
      let textoRobo = "";

      if (respostaUsuario.includes("sim") || respostaUsuario.includes("quero") || respostaUsuario.includes("vms")) {
        textoRobo = "Perfeito! Estou transferindo você para um de nossos especialistas humanos agora mesmo. Por favor, aguarde um momento. 👩‍⚕️👨‍⚕️";
      } else {
        textoRobo = "Entendido! Se precisar de qualquer coisa no futuro, estarei aqui. Cuide-se bem! E lembre-se: você não está sozinho(a) ❤️";
      }

      setMensagens((atual) => [...atual, {
        id: Math.random().toString(),
        text: textoRobo,
        fromMe: false,
      }]);
      setEtapa(4);
    }
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