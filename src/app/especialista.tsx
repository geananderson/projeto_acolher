import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
    idade: "22 anos",
    queixa: "Ansiedade com entregas da faculdade.",
    historicoClinico:
      "Paciente relata estresse com prazos acadêmicos. Apresenta boa evolução com técnicas de respiração.",
  },
  {
    id: "2",
    paciente: "José Matheus",
    horario: "09:00",
    tipo: "Retorno",
    status: "Confirmado",
    idade: "24 anos",
    queixa: "Acompanhamento de foco e TDAH.",
    historicoClinico:
      "Foco melhorou após adjustments na rotina de estudos. Manter estratégias visuais.",
  },
  {
    id: "3",
    paciente: "Marcos Gabriel",
    horario: "10:00",
    tipo: "Sessão de Terapia",
    status: "Confirmado",
    idade: "28 anos",
    queixa: "Transição de carreira e estresse profissional.",
    historicoClinico:
      "Sessão focada em mapeamento de competências. Ansiedade controlada.",
  },
  {
    id: "4",
    paciente: "Maycon Mizael",
    horario: "11:00",
    tipo: "Sessão de Terapia",
    status: "Pendente",
    idade: "21 anos",
    queixa: "Insônia crônica.",
    historicoClinico:
      "Primeiras queixas sobre higiene do sono. Avaliar evolução na próxima semana.",
  },
  {
    id: "5",
    paciente: "Tássio Ivanil",
    horario: "13:00",
    tipo: "Retorno",
    status: "Confirmado",
    idade: "26 anos",
    queixa: "Evolução clínica positiva, regulação emocional.",
    historicoClinico:
      "Paciente demonstra alto grau de autoconhecimento. Alta clínica em discussão.",
  },
  {
    id: "6",
    paciente: "Victor Rennan",
    horario: "14:00",
    tipo: "Primeira Consulta",
    status: "Pendente",
    idade: "23 anos",
    queixa: "Busca autoconhecimento.",
    historicoClinico:
      "Fase de entrevista inicial realizada. Estabelecendo rapport.",
  },
  {
    id: "7",
    paciente: "Vinicius Albuquerque",
    horario: "15:00",
    tipo: "Sessão de Terapia",
    status: "Confirmado",
    idade: "30 anos",
    queixa: "Gestão de tempo e Burnout.",
    historicoClinico:
      "Orientado a pausas programadas no trabalho. Redução de sintomas físicos de estresse.",
  },
  {
    id: "8",
    paciente: "Wesley Oliveira",
    horario: "16:00",
    tipo: "Retorno",
    status: "Confirmado",
    idade: "25 anos",
    queixa: "Superação de luto recente.",
    historicoClinico:
      "Espaço de escuta acolhedora. Paciente processando sentimentos de forma saudável.",
  },
  {
    id: "9",
    paciente: "William Santos",
    horario: "17:00",
    tipo: "Sessão de Terapia",
    status: "Confirmado",
    idade: "29 anos",
    queixa: "Dificuldade de comunicação interpessoal.",
    historicoClinico: "Treino de assertividade iniciado during a sessão.",
  },
  {
    id: "10",
    paciente: "Yago Bezerra",
    horario: "18:00",
    tipo: "Retorno",
    status: "Pendente",
    idade: "22 anos",
    queixa: "Ansiedade social.",
    historicoClinico:
      "Evitação de ambientes públicos reportada. Traçando plano de exposição gradual.",
  },
];

const AGENDAS_POR_DIA = {
  Hoje: [
    { id: "h1", hora: "08:00", status: "Ocupado", paciente: "Gean Anderson" },
    { id: "h2", hora: "09:00", status: "Ocupado", paciente: "José Matheus" },
    { id: "h3", hora: "10:00", status: "Ocupado", paciente: "Marcos Gabriel" },
    { id: "h4", hora: "11:00", status: "Ocupado", paciente: "Maycon Mizael" },
    { id: "h5", hora: "12:00", status: "Disponível", paciente: "" },
    { id: "h6", hora: "13:00", status: "Ocupado", paciente: "Tássio Ivanil" },
    { id: "h7", hora: "14:00", status: "Ocupado", paciente: "Victor Rennan" },
    { id: "h8", hora: "15:00", status: "Disponível", paciente: "" },
    { id: "h9", hora: "16:00", status: "Disponível", paciente: "" },
    {
      id: "h10",
      hora: "17:00",
      status: "Bloqueado",
      paciente: "Compromisso pessoal",
    },
  ],
  Amanhã: [
    { id: "h1", hora: "08:00", status: "Disponível", paciente: "" },
    {
      id: "h2",
      hora: "09:00",
      status: "Ocupado",
      paciente: "Vinicius Albuquerque",
    },
    { id: "h3", hora: "10:00", status: "Disponível", paciente: "" },
    { id: "h4", hora: "11:00", status: "Ocupado", paciente: "Wesley Oliveira" },
    {
      id: "h5",
      hora: "12:00",
      status: "Bloqueado",
      paciente: "Almoço Clínico",
    },
    { id: "h6", hora: "13:00", status: "Disponível", paciente: "" },
    { id: "h7", hora: "14:00", status: "Ocupado", paciente: "William Santos" },
    { id: "h8", hora: "15:00", status: "Ocupado", paciente: "Yago Bezerra" },
    { id: "h9", hora: "16:00", status: "Disponível", paciente: "" },
    { id: "h10", hora: "17:00", status: "Disponível", paciente: "" },
  ],
  Seg: [
    {
      id: "h1",
      hora: "08:00",
      status: "Bloqueado",
      paciente: "Reunião de Equipe",
    },
    {
      id: "h2",
      hora: "09:00",
      status: "Bloqueado",
      paciente: "Reunião de Equipe",
    },
    { id: "h3", hora: "10:00", status: "Ocupado", paciente: "Gean Anderson" },
    { id: "h4", hora: "11:00", status: "Disponível", paciente: "" },
    { id: "h5", hora: "12:00", status: "Disponível", paciente: "" },
    { id: "h6", hora: "13:00", status: "Ocupado", paciente: "Marcos Gabriel" },
    { id: "h7", hora: "14:00", status: "Disponível", paciente: "" },
    { id: "h8", hora: "15:00", status: "Ocupado", paciente: "Tássio Ivanil" },
    { id: "h9", hora: "16:00", status: "Ocupado", paciente: "Wesley Oliveira" },
    { id: "h10", hora: "17:00", status: "Disponível", paciente: "" },
  ],
  Ter: [
    { id: "h1", hora: "08:00", status: "Ocupado", paciente: "José Matheus" },
    { id: "h2", hora: "09:00", status: "Disponível", paciente: "" },
    { id: "h3", hora: "10:00", status: "Ocupado", paciente: "Maycon Mizael" },
    { id: "h4", hora: "11:00", status: "Disponível", paciente: "" },
    { id: "h5", hora: "12:00", status: "Disponível", paciente: "" },
    { id: "h6", hora: "13:00", status: "Bloqueado", paciente: "Supervisão" },
    { id: "h7", hora: "14:00", status: "Ocupado", paciente: "Victor Rennan" },
    { id: "h8", hora: "15:00", status: "Disponível", paciente: "" },
    { id: "h9", hora: "16:00", status: "Ocupado", paciente: "William Santos" },
    { id: "h10", hora: "17:00", status: "Ocupado", paciente: "Yago Bezerra" },
  ],
  Qua: [
    { id: "h1", hora: "08:00", status: "Disponível", paciente: "" },
    { id: "h2", hora: "09:00", status: "Disponível", paciente: "" },
    {
      id: "h3",
      hora: "10:00",
      status: "Ocupado",
      paciente: "Vinicius Albuquerque",
    },
    { id: "h4", hora: "11:00", status: "Disponível", paciente: "" },
    { id: "h5", hora: "12:00", status: "Disponível", paciente: "" },
    { id: "h6", hora: "13:00", status: "Disponível", paciente: "" },
    { id: "h7", hora: "14:00", status: "Disponível", paciente: "" },
    { id: "h8", hora: "15:00", status: "Ocupado", paciente: "Gean Anderson" },
    { id: "h9", hora: "16:00", status: "Bloqueado", paciente: "Particular" },
    { id: "h10", hora: "17:00", status: "Bloqueado", paciente: "Particular" },
  ],
};

const HISTORICO_FINANCEIRO = [
  {
    id: "f1",
    paciente: "Gean Anderson",
    data: "Hoje, 08:00",
    valor: "R$ 150,00",
    tipo: "Pix",
    status: "Recebido",
  },
  {
    id: "f2",
    paciente: "José Matheus",
    data: "Hoje, 09:00",
    valor: "R$ 120,00",
    tipo: "Cartão",
    status: "Recebido",
  },
  {
    id: "f3",
    paciente: "Marcos Gabriel",
    data: "Hoje, 10:00",
    valor: "R$ 120,00",
    tipo: "Pix",
    status: "Recebido",
  },
  {
    id: "f4",
    paciente: "Tássio Ivanil",
    data: "Hoje, 13:00",
    valor: "R$ 120,00",
    tipo: "Convênio",
    status: "Recebido",
  },
  {
    id: "f5",
    paciente: "Vinicius Albuquerque",
    data: "Ontem",
    valor: "R$ 120,00",
    tipo: "Pix",
    status: "Recebido",
  },
  {
    id: "f6",
    paciente: "Wesley Oliveira",
    data: "Ontem",
    valor: "R$ 120,00",
    tipo: "Cartão",
    status: "Recebido",
  },
  {
    id: "f7",
    paciente: "William Santos",
    data: "20 Mai",
    valor: "R$ 120,00",
    tipo: "Pix",
    status: "Recebido",
  },
];

export default function DashboardEspecialista() {
  const router = useRouter();

  useEffect(() => {
    if (Platform.OS === "android") {
      try {
        const NavigationBar = require("expo-navigation-bar");
        NavigationBar.setButtonStyleAsync("light");
      } catch (e) {
        console.log("Erro ao carregar os modulos de navegacao");
      }
    }
  }, []);

  const [telaAtiva, setTelaAtiva] = useState<
    "home" | "prontuarios" | "horarios" | "financas"
  >("home");
  const [expandido, setExpandido] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [pacienteSelecionado, setPacienteSelecionado] = useState<any>(null);
  const [modalMetricaVisivel, setModalMetricaVisivel] = useState(false);
  const [pesquisaProntuario, setPesquisaProntuario] = useState("");
  const [verHistoricoProntuario, setVerHistoricoProntuario] =
    useState<any>(null);
  const [diaSelecionado, setDiaSelecionado] = useState<
    "Hoje" | "Amanhã" | "Seg" | "Ter" | "Qua"
  >("Hoje");
  const [gradeHorarios, setGradeHorarios] = useState<any>(AGENDAS_POR_DIA);

  const dadosAgenda = expandido ? AGENDA_COMPLETA : AGENDA_COMPLETA.slice(0, 5);
  const prontuariosFiltrados = AGENDA_COMPLETA.filter((p) =>
    p.paciente.toLowerCase().includes(pesquisaProntuario.toLowerCase()),
  );

  const handleToggleHorario = (id: string) => {
    setGradeHorarios((prev: any) => ({
      ...prev,
      [diaSelecionado]: prev[diaSelecionado].map((item: any) => {
        if (item.id === id) {
          if (item.status === "Disponível") {
            return {
              ...item,
              status: "Bloqueado",
              paciente: "Intervalo Clínico",
            };
          } else if (item.status === "Bloqueado") {
            return { ...item, status: "Disponível", paciente: "" };
          }
        }
        return item;
      }),
    }));
  };

  const horariosExibidos = gradeHorarios[diaSelecionado] || [];

  return (
    <View style={styles.masterContainer}>
      <StatusBar style="light" backgroundColor="#000000" />

      <SafeAreaView
        style={styles.container}
        edges={["top", "right", "left", "bottom"]}
      >
        <View style={styles.header}>
          {telaAtiva === "home" ? (
            <View>
              <Text style={styles.welcomeText}>Olá, Dr(a).</Text>
              <Text style={styles.doctorName}>Painel Clínico</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.backHeaderButton}
              onPress={() => setTelaAtiva("home")}
            >
              <Feather name="arrow-left" size={24} color="#FFFFFF" />
              <Text style={styles.doctorNameHeader}>
                {telaAtiva === "prontuarios" && "Prontuários"}
                {telaAtiva === "horarios" && "Meus Horários"}
                {telaAtiva === "financas" && "Finanças Clínicas"}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => router.replace("/")}
          >
            <Feather name="log-out" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {telaAtiva === "home" && (
            <>
              <View style={styles.metricsContainer}>
                <TouchableOpacity
                  style={styles.metricCard}
                  onPress={() => setModalMetricaVisivel(true)}
                  activeOpacity={0.7}
                >
                  <Feather name="calendar" size={20} color="#00BFA5" />
                  <Text style={styles.metricValue}>
                    {AGENDA_COMPLETA.length}
                  </Text>
                  <Text style={styles.metricLabel}>Sessões de hoje</Text>
                </TouchableOpacity>
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

              <Text style={styles.sectionTitle}>Ações Rápidas</Text>
              <View style={styles.actionsGrid}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => setTelaAtiva("prontuarios")}
                >
                  <View
                    style={[styles.iconCircle, { backgroundColor: "#E0F2F1" }]}
                  >
                    <Feather name="file-text" size={20} color="#00BFA5" />
                  </View>
                  <Text style={styles.actionText}>Prontuários</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => setTelaAtiva("horarios")}
                >
                  <View
                    style={[styles.iconCircle, { backgroundColor: "#E8EAF6" }]}
                  >
                    <Feather name="clock" size={20} color="#00238e" />
                  </View>
                  <Text style={styles.actionText}>Meus Horários</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => setTelaAtiva("financas")}
                >
                  <View
                    style={[styles.iconCircle, { backgroundColor: "#FFF3E0" }]}
                  >
                    <Feather name="dollar-sign" size={20} color="#FF9100" />
                  </View>
                  <Text style={styles.actionText}>Finanças</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.agendaWrapper}>
                <View style={styles.agendaHeader}>
                  <Text style={styles.agendaSectionTitle}>Agenda de Hoje</Text>
                  <View style={styles.countBadge}>
                    <Text style={styles.countIndicator}>
                      {dadosAgenda.length}/{AGENDA_COMPLETA.length}
                    </Text>
                  </View>
                </View>
                <FlatList
                  data={dadosAgenda}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 48,
                  }}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.appointmentCard}
                      onPress={() => {
                        setPacienteSelecionado(item);
                        setModalVisivel(true);
                      }}
                      activeOpacity={0.7}
                    >
                      <View style={styles.cardHeaderRow}>
                        <View style={styles.appointmentInfo}>
                          <Feather
                            name="clock"
                            size={15}
                            color="#00BFA5"
                            style={{ marginRight: 6 }}
                          />
                          <Text style={styles.appointmentTime}>
                            {item.horario}
                          </Text>
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
                                item.status === "Confirmado"
                                  ? "#E0F2F1"
                                  : "#FFEBEE",
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
                    </TouchableOpacity>
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
                        <Feather
                          name="chevron-down"
                          size={16}
                          color="#00238e"
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={styles.toggleAgendaButton}
                        onPress={() => setExpandido(false)}
                      >
                        <Text
                          style={[
                            styles.toggleAgendaText,
                            { color: "#D32F2F" },
                          ]}
                        >
                          Recolher agenda
                        </Text>
                        <Feather name="chevron-up" size={16} color="#D32F2F" />
                      </TouchableOpacity>
                    )
                  }
                />
              </View>
            </>
          )}

          {telaAtiva === "prontuarios" && (
            <View style={{ flex: 1 }}>
              <View style={styles.searchContainer}>
                <Feather
                  name="search"
                  size={18}
                  color="#94A3B8"
                  style={{ marginRight: 8 }}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Buscar paciente pelo nome..."
                  placeholderTextColor="#94A3B8"
                  value={pesquisaProntuario}
                  onChangeText={setPesquisaProntuario}
                />
              </View>
              <FlatList
                data={prontuariosFiltrados}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
                renderItem={({ item }) => (
                  <View style={styles.prontuarioCard}>
                    <View style={styles.prontuarioMainInfo}>
                      <Text style={styles.prontuarioPatientName}>
                        {item.paciente}
                      </Text>
                      <Text style={styles.prontuarioPatientAge}>
                        Idade: {item.idade}
                      </Text>
                    </View>
                    {verHistoricoProntuario === item.id ? (
                      <View style={styles.historicoExpandidoBox}>
                        <Text style={styles.historicoTitle}>
                          Evolução Clínica Recente:
                        </Text>
                        <Text style={styles.historicoText}>
                          {item.historicoClinico}
                        </Text>
                        <TouchableOpacity
                          style={styles.fecharProntuarioBtn}
                          onPress={() => setVerHistoricoProntuario(null)}
                        >
                          <Text style={styles.fecharProntuarioBtnText}>
                            Fechar Prontuário
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={styles.abrirProntuarioBtn}
                        onPress={() => setVerHistoricoProntuario(item.id)}
                      >
                        <Feather
                          name="folder"
                          size={16}
                          color="#00238e"
                          style={{ marginRight: 6 }}
                        />
                        <Text style={styles.abrirProntuarioBtnText}>
                          Acessar Prontuário
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              />
            </View>
          )}

          {telaAtiva === "horarios" && (
            <View style={{ flex: 1 }}>
              <View style={styles.daysContainer}>
                {(["Hoje", "Amanhã", "Seg", "Ter", "Qua"] as const).map(
                  (dia) => (
                    <TouchableOpacity
                      key={dia}
                      style={[
                        styles.dayButton,
                        diaSelecionado === dia && styles.dayButtonActive,
                      ]}
                      onPress={() => setDiaSelecionado(dia)}
                    >
                      <Text
                        style={[
                          styles.dayButtonText,
                          diaSelecionado === dia && styles.dayButtonTextActive,
                        ]}
                      >
                        {dia}
                      </Text>
                    </TouchableOpacity>
                  ),
                )}
              </View>
              <Text style={styles.helperText}>
                Toque nos horários vagos para bloquear/liberar atendimentos.
              </Text>
              <FlatList
                data={horariosExibidos}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 30 }}
                renderItem={({ item }) => (
                  <View style={styles.rowHorario}>
                    <Text style={styles.horaLabel}>{item.hora}</Text>
                    <TouchableOpacity
                      style={[
                        styles.statusBoxHorario,
                        item.status === "Ocupado" && styles.boxOcupado,
                        item.status === "Disponível" && styles.boxDisponivel,
                        item.status === "Bloqueado" && styles.boxBloqueado,
                      ]}
                      onPress={() => handleToggleHorario(item.id)}
                      disabled={item.status === "Ocupado"}
                      activeOpacity={0.7}
                    >
                      <View style={styles.statusBoxFlex}>
                        <Text
                          style={[
                            styles.statusBoxText,
                            item.status === "Ocupado" && styles.txtOcupado,
                            item.status === "Disponível" &&
                              styles.txtDisponivel,
                            item.status === "Bloqueado" && styles.txtBloqueado,
                          ]}
                        >
                          {item.status === "Ocupado"
                            ? `Sessão: ${item.paciente}`
                            : item.status}
                        </Text>
                        {item.status !== "Ocupado" && (
                          <Feather
                            name={
                              item.status === "Disponível" ? "unlock" : "lock"
                            }
                            size={14}
                            color={
                              item.status === "Disponível"
                                ? "#00BFA5"
                                : "#D32F2F"
                            }
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          )}

          {telaAtiva === "financas" && (
            <View style={{ flex: 1 }}>
              <View style={styles.financesSummaryContainer}>
                <View style={[styles.financeCard, { borderColor: "#00BFA5" }]}>
                  <Text style={styles.financeCardLabel}>Faturamento Maio</Text>
                  <Text style={[styles.financeCardValue, { color: "#00BFA5" }]}>
                    R$ 4.850,00
                  </Text>
                </View>
                <View style={[styles.financeCard, { borderColor: "#FF9100" }]}>
                  <Text style={styles.financeCardLabel}>
                    A Receber (Pendentes)
                  </Text>
                  <Text style={[styles.financeCardValue, { color: "#FF9100" }]}>
                    R$ 360,00
                  </Text>
                </View>
              </View>
              <View style={styles.chartSimulationBox}>
                <View style={styles.chartHeaderRow}>
                  <Text style={styles.chartTitle}>
                    Meta Mensal de Atendimentos
                  </Text>
                  <Text style={styles.chartPercentText}>85% Concluído</Text>
                </View>
                <View style={styles.progressBarBackground}>
                  <View style={styles.progressBarFill} />
                </View>
              </View>
              <Text style={styles.sectionTitle}>Últimos Recebimentos</Text>
              <FlatList
                data={HISTORICO_FINANCEIRO}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
                renderItem={({ item }) => (
                  <View style={styles.transactionCard}>
                    <View style={styles.transactionLeft}>
                      <View style={styles.iconFinanceCircle}>
                        <Feather
                          name="arrow-down-left"
                          size={16}
                          color="#00BFA5"
                        />
                      </View>
                      <View>
                        <Text style={styles.transactionName}>
                          {item.paciente}
                        </Text>
                        <Text style={styles.transactionMeta}>
                          {item.data} • {item.tipo}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.transactionRight}>
                      <Text style={styles.transactionValue}>{item.valor}</Text>
                      <Text style={styles.transactionStatusText}>
                        {item.status}
                      </Text>
                    </View>
                  </View>
                )}
              />
            </View>
          )}
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalMetricaVisivel}
          onRequestClose={() => setModalMetricaVisivel(false)}
        >
          <TouchableWithoutFeedback
            onPress={() => setModalMetricaVisivel(false)}
          >
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>
                      Status dos Atendimentos
                    </Text>
                    <TouchableOpacity
                      onPress={() => setModalMetricaVisivel(false)}
                    >
                      <Feather name="x" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.modalBody}>
                    <Text style={styles.modalPatientName}>Resumo de Hoje</Text>
                    <View style={styles.statusReportContainer}>
                      <View style={styles.statusReportRow}>
                        <View
                          style={[
                            styles.statusDot,
                            { backgroundColor: "#00BFA5" },
                          ]}
                        />
                        <Text style={styles.statusReportLabel}>
                          Sessões Confirmadas:
                        </Text>
                        <Text style={styles.statusReportValue}>
                          7 pacientes
                        </Text>
                      </View>
                      <View style={styles.statusReportRow}>
                        <View
                          style={[
                            styles.statusDot,
                            { backgroundColor: "#FF9100" },
                          ]}
                        />
                        <Text style={styles.statusReportLabel}>
                          Sessões Pendentes:
                        </Text>
                        <Text style={styles.statusReportValue}>
                          3 pacientes
                        </Text>
                      </View>
                      <View style={styles.statusReportRow}>
                        <View
                          style={[
                            styles.statusDot,
                            { backgroundColor: "#E2E8F0" },
                          ]}
                        />
                        <Text style={styles.statusReportLabel}>
                          Horários Bloqueados:
                        </Text>
                        <Text style={styles.statusReportValue}>
                          2 intervalos
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={[
                        styles.modalActionButtonPrimary,
                        { backgroundColor: "#00BFA5" },
                      ]}
                      onPress={() => setModalMetricaVisivel(false)}
                    >
                      <Text
                        style={[
                          styles.modalActionButtonText,
                          { color: "#00238e" },
                        ]}
                      >
                        Entendido
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisivel}
          onRequestClose={() => setModalVisivel(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisivel(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>
                      Detalhes do Agendamento
                    </Text>
                    <TouchableOpacity onPress={() => setModalVisivel(false)}>
                      <Feather name="x" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                  {pacienteSelecionado && (
                    <View style={styles.modalBody}>
                      <Text style={styles.modalPatientName}>
                        {pacienteSelecionado.paciente}
                      </Text>
                      <Text style={styles.modalPatientMeta}>
                        Idade: {pacienteSelecionado.idade} | Horário:{" "}
                        {pacienteSelecionado.horario}
                      </Text>
                      <View style={styles.infoBox}>
                        <Text style={styles.infoBoxTitle}>
                          Última queixa / Observações:
                        </Text>
                        <Text style={styles.infoBoxText}>
                          {pacienteSelecionado.queixa}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={[
                          styles.modalActionButtonPrimary,
                          { backgroundColor: "#00BFA5" },
                        ]}
                        onPress={() => {
                          setModalVisivel(false);
                          router.push("/chat/chat");
                        }}
                      >
                        <Feather
                          name="message-square"
                          size={18}
                          color="#00238e"
                          style={{ marginRight: 8 }}
                        />
                        <Text
                          style={[
                            styles.modalActionButtonText,
                            { color: "#00238e" },
                          ]}
                        >
                          Abrir Chat com Paciente
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.modalActionButtonSecondary,
                          { borderColor: "#00BFA5" },
                        ]}
                        onPress={() => {
                          setModalVisivel(false);
                          setTelaAtiva("prontuarios");
                          setVerHistoricoProntuario(pacienteSelecionado.id);
                        }}
                      >
                        <Feather
                          name="edit-3"
                          size={18}
                          color="#00BFA5"
                          style={{ marginRight: 8 }}
                        />
                        <Text
                          style={[
                            styles.modalActionButtonText,
                            { color: "#00BFA5" },
                          ]}
                        >
                          Ir para o Prontuário
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  masterContainer: { flex: 1, backgroundColor: "#000000" },
  container: { flex: 1, backgroundColor: "#000000" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: "#00BFA5",
  },
  welcomeText: { fontSize: 14, color: "#ffffff", opacity: 0.8 },
  doctorName: { fontSize: 24, fontWeight: "900", color: "#ffffff" },
  logoutButton: {
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
  },
  content: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
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
  actionText: { fontSize: 12, fontWeight: "600", color: "#475569" },
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
  agendaSectionTitle: { fontSize: 16, fontWeight: "700", color: "#334155" },
  countBadge: {
    backgroundColor: "#E2E8F0",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  countIndicator: { fontSize: 11, color: "#475569", fontWeight: "700" },
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
  appointmentInfo: { flexDirection: "row", alignItems: "center" },
  appointmentTime: { fontWeight: "bold", color: "#00BFA5", fontSize: 14 },
  appointmentPatient: { fontWeight: "700", color: "#1E293B", fontSize: 14 },
  appointmentType: { fontSize: 13, color: "#64748B", marginLeft: 21 },
  statusTag: { paddingVertical: 3, paddingHorizontal: 8, borderRadius: 8 },
  statusText: { fontSize: 11, fontWeight: "700" },
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
  backHeaderButton: { flexDirection: "row", alignItems: "center", gap: 12 },
  doctorNameHeader: { fontSize: 22, fontWeight: "900", color: "#ffffff" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 46,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  searchInput: { flex: 1, color: "#1E293B", fontSize: 14, fontWeight: "500" },
  prontuarioCard: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  prontuarioMainInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  prontuarioPatientName: { fontSize: 16, fontWeight: "700", color: "#1E293B" },
  prontuarioPatientAge: { fontSize: 13, color: "#64748B", fontWeight: "600" },
  abrirProntuarioBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8EAF6",
    height: 38,
    borderRadius: 10,
  },
  abrirProntuarioBtnText: { color: "#00238e", fontSize: 13, fontWeight: "700" },
  historicoExpandidoBox: {
    marginTop: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 14,
  },
  historicoTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#475569",
    marginBottom: 4,
  },
  historicoText: {
    fontSize: 14,
    color: "#334155",
    lineHeight: 20,
    marginBottom: 12,
  },
  fecharProntuarioBtn: {
    backgroundColor: "#FFEBEE",
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  fecharProntuarioBtnText: {
    color: "#D32F2F",
    fontSize: 12,
    fontWeight: "700",
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  dayButton: {
    backgroundColor: "#F1F5F9",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    minWidth: 60,
    alignItems: "center",
  },
  dayButtonActive: { backgroundColor: "#00BFA5" },
  dayButtonText: { fontSize: 13, fontWeight: "700", color: "#475569" },
  dayButtonTextActive: { color: "#FFFFFF" },
  helperText: {
    fontSize: 12,
    color: "#64748B",
    fontStyle: "italic",
    marginBottom: 16,
  },
  rowHorario: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 14,
  },
  horaLabel: { fontSize: 15, fontWeight: "700", color: "#334155", width: 50 },
  statusBoxHorario: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
    borderWidth: 1,
  },
  statusBoxFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusBoxText: { fontSize: 14, fontWeight: "600" },
  boxOcupado: { backgroundColor: "#E8EAF6", borderColor: "#C5CAE9" },
  boxDisponivel: { backgroundColor: "#E0F2F1", borderColor: "#B2DFDB" },
  boxBloqueado: { backgroundColor: "#FFEBEE", borderColor: "#FFCDD2" },
  txtOcupado: { color: "#00238e", fontWeight: "700" },
  txtDisponivel: { color: "#00BFA5" },
  txtBloqueado: { color: "#D32F2F" },
  financesSummaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  financeCard: {
    backgroundColor: "#F8FAFC",
    width: "48%",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  financeCardLabel: { fontSize: 12, fontWeight: "600", color: "#64748B" },
  financeCardValue: { fontSize: 18, fontWeight: "800", marginTop: 4 },
  chartSimulationBox: {
    backgroundColor: "#F8FAFC",
    width: "100%",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  chartHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  chartTitle: { fontSize: 13, fontWeight: "700", color: "#334155" },
  chartPercentText: { fontSize: 13, fontWeight: "700", color: "#00238e" },
  progressBarBackground: {
    height: 10,
    backgroundColor: "#E2E8F0",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    width: "85%",
    backgroundColor: "#00238e",
    borderRadius: 5,
  },
  transactionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F1F5F9",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  transactionLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconFinanceCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#E0F2F1",
    justifyContent: "center",
    alignItems: "center",
  },
  transactionName: { fontSize: 14, fontWeight: "700", color: "#1E293B" },
  transactionMeta: { fontSize: 12, color: "#64748B", marginTop: 2 },
  transactionRight: { alignItems: "flex-end" },
  transactionValue: { fontSize: 14, fontWeight: "700", color: "#1E293B" },
  transactionStatusText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#00BFA5",
    marginTop: 2,
    textTransform: "uppercase",
  },
  statusReportContainer: { marginVertical: 22, gap: 14 },
  statusReportRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
  statusReportLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    flex: 1,
  },
  statusReportValue: { fontSize: 14, fontWeight: "700", color: "#00BFA5" },
  infoBox: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    padding: 16,
    borderRadius: 12,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  infoBoxTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#00BFA5",
    marginBottom: 6,
  },
  infoBoxText: { fontSize: 14, color: "#FFFFFF", lineHeight: 20 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#00238e",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 32,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    paddingBottom: 12,
  },
  modalTitle: { fontSize: 16, fontWeight: "700", color: "#00BFA5" },
  modalBody: { marginTop: 16 },
  modalPatientName: { fontSize: 22, fontWeight: "900", color: "#FFFFFF" },
  modalPatientMeta: {
    fontSize: 14,
    color: "#E2E8F0",
    marginTop: 4,
    opacity: 0.9,
  },
  modalActionButtonPrimary: {
    backgroundColor: "#00BFA5",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    borderRadius: 12,
    marginBottom: 12,
  },
  modalActionButtonSecondary: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#00BFA5",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    borderRadius: 12,
  },
  modalActionButtonText: { fontSize: 15, fontWeight: "700" },
});
