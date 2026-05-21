import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AGENDA_COMPLETA = [
  {
    id: "1",
    paciente: "Gean Anderson",
    horario: "08:00",
    tipo: "Primeira Consulta",
    status: "Confirmado",
  },
  {
    id: "2",
    paciente: "José Matheus",
    horario: "09:00",
    tipo: "Retorno",
    status: "Confirmado",
  },
  {
    id: "3",
    paciente: "Marcos Gabriel",
    horario: "10:00",
    tipo: "Sessão de Terapia",
    status: "Confirmado",
  },
  {
    id: "4",
    paciente: "Maycon Mizael",
    horario: "11:00",
    tipo: "Sessão de Terapia",
    status: "Pendente",
  },
  {
    id: "5",
    paciente: "Tássio Ivanil",
    horario: "13:00",
    tipo: "Retorno",
    status: "Confirmado",
  },
  {
    id: "6",
    paciente: "Victor Rennan",
    horario: "14:00",
    tipo: "Primeira Consulta",
    status: "Pendente",
  },
  {
    id: "7",
    paciente: "Vinicius Albuquerque",
    horario: "15:00",
    tipo: "Sessão de Terapia",
    status: "Confirmado",
  },
  {
    id: "8",
    paciente: "Wesley Oliveira",
    horario: "16:00",
    tipo: "Retorno",
    status: "Confirmado",
  },
  {
    id: "9",
    paciente: "William Santos",
    horario: "17:00",
    tipo: "Sessão de Terapia",
    status: "Confirmado",
  },
  {
    id: "10",
    paciente: "Yago Bezerra",
    horario: "18:00",
    tipo: "Retorno",
    status: "Pendente",
  },
];

export default function DashboardEspecialista() {
  const router = useRouter();
  const [expandido, setExpandido] = useState(false);

  const dadosExibidos = expandido
    ? AGENDA_COMPLETA
    : AGENDA_COMPLETA.slice(0, 5);

  return (
    <SafeAreaView style={styles.container} edges={["top", "right", "left"]}>
      {/* 1. CABEÇALHO CLÍNICO */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Olá, Dr(a).</Text>
          <Text style={styles.doctorName}>Painel Clínico</Text>
        </View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => router.replace("/")}
        >
          <Feather name="log-out" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* 2. CORPO PRINCIPAL */}
      <View style={styles.content}>
        {/* CARDS DE MÉTRICAS (KPIs) */}
        <View style={styles.metricsContainer}>
          <View style={styles.metricCard}>
            <Feather name="calendar" size={20} color="#00BFA5" />
            <Text style={styles.metricValue}>{AGENDA_COMPLETA.length}</Text>
            <Text style={styles.metricLabel}>Sessões Hoje</Text>
          </View>

          <View style={styles.metricCard}>
            <Feather name="users" size={20} color="#00238e" />
            <Text style={styles.metricValue}>32</Text>
            <Text style={styles.metricLabel}>Pacientes</Text>
          </View>

          <View style={styles.metricCard}>
            <Feather name="trending-up" size={20} color="#FF9100" />
            <Text style={styles.metricValue}>96%</Text>
            <Text style={styles.metricLabel}>Presença</Text>
          </View>
        </View>

        {/* SEÇÃO DE AÇÕES RÁPIDAS */}
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.iconCircle, { backgroundColor: "#E0F2F1" }]}>
              <Feather name="file-text" size={20} color="#00BFA5" />
            </View>
            <Text style={styles.actionText}>Prontuários</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.iconCircle, { backgroundColor: "#E8EAF6" }]}>
              <Feather name="clock" size={20} color="#00238e" />
            </View>
            <Text style={styles.actionText}>Meus Horários</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.iconCircle, { backgroundColor: "#FFF3E0" }]}>
              <Feather name="dollar-sign" size={20} color="#FF9100" />
            </View>
            <Text style={styles.actionText}>Finanças</Text>
          </TouchableOpacity>
        </View>

        {/* 3. CONTAINER DESTACADO DA AGENDA */}
        <View style={styles.agendaWrapper}>
          <View style={styles.agendaHeader}>
            <Text style={styles.agendaSectionTitle}>Agenda de Hoje</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countIndicator}>
                {dadosExibidos.length}/{AGENDA_COMPLETA.length}
              </Text>
            </View>
          </View>

          <FlatList
            data={dadosExibidos}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            /* SOLUÇÃO DO PROBLEMA: Aumentado o paddingBottom para empurrar o botão para cima */
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 48 }}
            renderItem={({ item }) => (
              <View style={styles.appointmentCard}>
                <View style={styles.cardHeaderRow}>
                  <View style={styles.appointmentInfo}>
                    <Feather
                      name="clock"
                      size={15}
                      color="#00BFA5"
                      style={{ marginRight: 6 }}
                    />
                    <Text style={styles.appointmentTime}>{item.horario}</Text>
                    <Text style={styles.appointmentPatient}>
                      {" "}
                      - {item.paciente}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.statusTag,
                      {
                        backgroundColor:
                          item.status === "Confirmado" ? "#E0F2F1" : "#FFEBEE",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        {
                          color:
                            item.status === "Confirmado"
                              ? "#00BFA5"
                              : "#D32F2F",
                        },
                      ]}
                    >
                      {item.status}
                    </Text>
                  </View>
                </View>
                <Text style={styles.appointmentType}>{item.tipo}</Text>
              </View>
            )}
            ListFooterComponent={
              !expandido ? (
                <TouchableOpacity
                  style={styles.toggleAgendaButton}
                  onPress={() => setExpandido(true)}
                >
                  <Text style={styles.toggleAgendaText}>
                    Mostrar agenda completa
                  </Text>
                  <Feather name="chevron-down" size={16} color="#00238e" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.toggleAgendaButton}
                  onPress={() => setExpandido(false)}
                >
                  <Text style={[styles.toggleAgendaText, { color: "#D32F2F" }]}>
                    Recolher agenda
                  </Text>
                  <Feather name="chevron-up" size={16} color="#D32F2F" />
                </TouchableOpacity>
              )
            }
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                Nenhuma consulta agendada para hoje.
              </Text>
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00BFA5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  welcomeText: {
    fontSize: 14,
    color: "#ffffff",
    opacity: 0.8,
  },
  doctorName: {
    fontSize: 24,
    fontWeight: "900",
    color: "#ffffff",
  },
  logoutButton: {
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
  },
  content: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 22,
  },
  metricCard: {
    backgroundColor: "#F8FAFC",
    width: "30%",
    padding: 12,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
    marginTop: 6,
  },
  metricLabel: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 12,
  },
  actionsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  actionButton: {
    backgroundColor: "#F8FAFC",
    width: "30%",
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#475569",
  },
  agendaWrapper: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    marginHorizontal: -24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  agendaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 16,
    marginBottom: 12,
  },
  agendaSectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#334155",
  },
  countBadge: {
    backgroundColor: "#E2E8F0",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  countIndicator: {
    fontSize: 11,
    color: "#475569",
    fontWeight: "700",
  },
  appointmentCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#00BFA5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  appointmentInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  appointmentTime: {
    fontWeight: "bold",
    color: "#00BFA5",
    fontSize: 14,
  },
  appointmentPatient: {
    fontWeight: "700",
    color: "#1E293B",
    fontSize: 14,
  },
  appointmentType: {
    fontSize: 13,
    color: "#64748B",
    marginLeft: 21,
  },
  statusTag: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
  },
  toggleAgendaButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    gap: 6,
  },
  toggleAgendaText: {
    fontSize: 14,
    color: "#00238e",
    fontWeight: "700",
    textAlign: "center",
  },
  emptyText: {
    textAlign: "center",
    color: "#94A3B8",
    marginTop: 30,
    fontStyle: "italic",
  },
});
