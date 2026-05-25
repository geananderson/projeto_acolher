import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";

export default function Menu() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <TouchableOpacity
        style={styles.option}
        onPress={() => router.replace("/")}
      >
        <Feather name="log-out" size={20} color="red" />
        <Text style={[styles.optionText, { color: "red" }]}>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: "#F8F9FA" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 30 },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
  optionText: { marginLeft: 15, fontWeight: "bold" },
});
