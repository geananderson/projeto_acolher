import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from "@expo/vector-icons";

export default function ListaDeConversas() {
  const router = useRouter();

  const conversasAtivas = [
    { id: '1', nome: 'Apoio Humanizado', ultimaMsg: 'Como posso ajudar?' },
    // Outras conversas...
  ];

  return (
    <View style={styles.container}>
        
      {/* Cabeçalho da Lista */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Minhas Conversas</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={conversasAtivas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => router.push('/chat/chat')} // Navega para o chat.tsx (mensagens)
          >
            <View style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.msg} numberOfLines={1}>{item.ultimaMsg}</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#CCC" />
          </TouchableOpacity>
        )}
      />
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
  msg: { color: '#666', fontSize: 14, marginTop: 2 }
});