import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Modal, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from "@expo/vector-icons";

export default function ListaDeConversas() {
  const router = useRouter();
  const [modalVisivel, setModalVisivel] = useState(false);
  const [novoNome, setNovoNome] = useState('');
  const [novoCrp, setNovoCrp] = useState('');

  // Transformamos a lista fixa em um Estado (useState)
  const [conversasAtivas, setConversasAtivas] = useState([
    { 
      id: '1', 
      nome: 'Apoio Imediato', 
      ultimaMsg: 'Como posso ajudar?', 
      foto: require('../../../assets/images/bot.jpg'),
      crp: null  // O bot não tem CRP
    },
    { 
      id: '2', 
      nome: 'Dr. Carlo Ancelotti', 
      ultimaMsg: 'Tudo sob controle por aqui.', 
      foto: require('../../../assets/images/ancelotti.jpg'),
      crp: '06/11111'
    },
    { 
      id: '3', 
      nome: 'Dra. Virginia Fonseca', 
      ultimaMsg: 'Olha o Direct!', 
      foto: require('../../../assets/images/virginia.jpg'),
      crp: '06/22222'
    },
    { 
      id: '4', 
      nome: 'Dr. Jair Bolsonaro', 
      ultimaMsg: 'Forte abraço.', 
      foto: require('../../../assets/images/bolsonaro.jpg'),
      crp: '06/33333'
    },
    { 
      id: '5', 
      nome: 'Dr. Neymar Júnior', 
      ultimaMsg: 'Foco na recuperação.', 
      foto: require('../../../assets/images/neymar.jpg'),
      crp: '06/44444'
    },
    { 
      id: '6', 
      nome: 'Dra. Deolane', 
      ultimaMsg: 'A mãe tá estourada!', 
      foto: require('../../../assets/images/deolane.jpg'),
      crp: '06/55555'
    },
    { 
      id: '7', 
      nome: 'Dr. Luiz Inácio',  
      ultimaMsg: 'Companheiro, como vai?', 
      foto: require('../../../assets/images/lula.jpg'),
      crp: '06/66666'
    },
  ]);

  //Função que lida com o salvamento do novo psicólogo
  const salvarPsicologo = () => {
    // não deixa salvar sem nome ou sem CRP
    if (!novoNome.trim() || !novoCrp.trim()) {
      alert('Por favor, preencha o Nome e o CRP.');
      return;
    }

    // Criamos o objeto do novo psicólogo
    const novoProfissional = {
      id: String(conversasAtivas.length + 1), // Gera um ID sequencial dinâmico
      nome: novoNome,
      ultimaMsg: `CRP: ${novoCrp} (Contato salvo)`, 
      foto: require('../../../assets/images/bot.jpg'), 
      crp: novoCrp
    };

    // adiciona o novo profissional no final da lista
    setConversasAtivas([...conversasAtivas, novoProfissional]);

    // Limpamos os campos do formulário e fechamos o modal
    setNovoNome('');
    setNovoCrp('');
    setModalVisivel(false);
  };

  return (
    <View style={styles.container}>
        
      {/* Cabeçalho da Lista */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Minhas Conversas</Text>
        <TouchableOpacity onPress={() => setModalVisivel(true)}>
          <Feather name="plus" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={conversasAtivas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => router.push('/chat/chat')}
          >
            <Image source={item.foto} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.msg} numberOfLines={1}>{item.ultimaMsg}</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#CCC" />
          </TouchableOpacity>
        )}
      />
      
      {/* Cadastro de Psicólogo */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cadastrar Psicólogo</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome do Profissional"
              value={novoNome}
              onChangeText={setNovoNome}
            />

            <TextInput
              style={styles.input}
              placeholder="CRP (Ex: 06/12345)"
              value={novoCrp}
              onChangeText={setNovoCrp}
            />

            <View style={styles.modalBotoes}>
              <TouchableOpacity 
                style={[styles.botaoModal, styles.botaoCancelar]} 
                onPress={() => setModalVisivel(false)}
              >
                <Text style={styles.textoBotao}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.botaoModal, styles.botaoSalvar]} 
                onPress={salvarPsicologo} // 3. Chamamos a nossa nova função aqui
              >
                <Text style={styles.textoBotao}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { 
    paddingTop: 50, 
    paddingBottom: 20, 
    paddingHorizontal: 20, 
    backgroundColor: '#00BFA5', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between' 
  },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  card: { 
    flexDirection: 'row', 
    padding: 15, 
    alignItems: 'center', 
    borderBottomWidth: 1, 
    borderBottomColor: '#F0F0F0' 
  },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#EEE', marginRight: 15 },
  nome: { fontWeight: 'bold', fontSize: 16, color: '#333' },
  msg: { color: '#666', fontSize: 14, marginTop: 2 },
  
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#FAFAFA',
  },
  modalBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  botaoModal: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  botaoCancelar: {
    backgroundColor: '#999',
  },
  botaoSalvar: {
    backgroundColor: '#00BFA5',
  },
  textoBotao: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});