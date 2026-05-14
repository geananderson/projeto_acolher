import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Button } from "../components/Button";
import { Input } from "../components/input";

const FRASES = [
  "Sua jornada para o bem-estar começa aqui.",
  "Estamos preparando um espaço seguro para você.",
  "Cuidar de si é o melhor investimento.",
  "Quase pronto! Vamos começar essa caminhada juntos.",
];

export default function Cadastro() {
  const router = useRouter();
  const [etapa, setEtapa] = useState<"formulario" | "carregando" | "sucesso">(
    "formulario",
  );
  const [currentFrase, setCurrentFrase] = useState(0);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Novo campo

  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let interval: any;
    if (etapa === "carregando") {
      progress.setValue(0);
      Animated.timing(progress, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
      }).start();

      interval = setInterval(() => {
        setCurrentFrase((prev) => (prev + 1) % FRASES.length);
      }, 2000);

      setTimeout(() => {
        setEtapa("sucesso");
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [etapa]);

  const handleCadastro = () => {
    // Validação de campos vazios
    if (
      nome.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      Alert.alert("Aviso", "Preencha todos os campos para continuar.");
      return;
    }

    // Validação de senhas iguais
    if (password !== confirmPassword) {
      Alert.alert(
        "Erro",
        "As senhas não coincidem. Verifique e tente novamente.",
      );
      return;
    }

    setEtapa("carregando");
  };

  if (etapa === "carregando") {
    return (
      <View style={styles.loadingContainer}>
        <Image
          source={require("@/src/assets/img1.png")}
          style={styles.loadingLogo}
        />
        <View style={styles.progressBarBg}>
          <Animated.View
            style={[
              styles.progressBarFill,
              {
                width: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
        </View>
        <View style={styles.fraseBox}>
          <Text style={styles.fraseText}>{FRASES[currentFrase]}</Text>
        </View>
      </View>
    );
  }

  if (etapa === "sucesso") {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successIconCircle}>
          <Feather name="check" size={50} color="#FFFFFF" />
        </View>
        <Text style={styles.successTitle}>Dados Cadastrados!</Text>
        <Text style={styles.successSubtitle}>
          Sua conta foi criada com sucesso. Agora você já pode acessar o
          sistema.
        </Text>
        <Button
          label="Voltar para o Login"
          onPress={() => router.replace("/")}
          style={styles.buttonDefault}
        />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: "padding", android: "height" })}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>

          <Image
            source={require("@/src/assets/img1.png")}
            style={styles.illustration}
          />

          <Text style={styles.title}>Criar Conta</Text>
          <Text style={styles.subtitle}>
            Preencha os dados abaixo para começar.
          </Text>

          <View style={styles.form}>
            <Input
              placeholder="Nome Completo"
              value={nome}
              onChangeText={setNome}
            />
            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              placeholder="Senha"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <Input
              placeholder="Confirmar Senha"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <Button
              label="Cadastrar"
              onPress={handleCadastro}
              style={styles.buttonDefault}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFDFD", padding: 32 },
  backButton: { marginTop: 40, marginBottom: 10 },
  illustration: { width: "100%", height: 220, resizeMode: "contain" },
  title: { fontSize: 32, fontWeight: "900" },
  subtitle: { fontSize: 16, color: "#666" },
  form: { marginTop: 24, gap: 12 },
  buttonDefault: {
    width: "100%",
    height: 48,
    backgroundColor: "#3366FF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  loadingLogo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 40,
  },
  progressBarBg: {
    width: "100%",
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: { height: "100%", backgroundColor: "#00BFA5" },
  fraseBox: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  fraseText: {
    fontSize: 18,
    textAlign: "center",
    color: "#333",
    fontStyle: "italic",
  },
  successContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  successIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#00BFA5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  successSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 22,
  },
});
