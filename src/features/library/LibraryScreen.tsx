import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { THEME } from '../../theme/sharedStyles';

const MOCK_CHARACTERS = [
  { id: '1', name: 'THRORID', race: 'Dragonborn', class: 'Paladin', level: 1 },
  { id: '2', name: 'VORGAX', race: 'Orc', class: 'Barbarian', level: 3 },
];

const LibraryScreen = () => {
  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.charCard}>
      <View style={styles.cardInfo}>
        <Text style={styles.charName}>{item.name}</Text>
        <Text style={styles.charDetails}>{item.race} • {item.class}</Text>
      </View>
      <View style={styles.levelBadge}>
        <Text style={styles.levelText}>LVL {item.level}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MY LIBRARY</Text>
      </View>
      
      <FlatList
        data={MOCK_CHARACTERS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No characters found. Create your first hero!</Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  headerTitle: {
    color: THEME.gold,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 1,
  },
  listContent: {
    padding: 20,
  },
  charCard: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  cardInfo: {
    flex: 1,
  },
  charName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  charDetails: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
    marginTop: 4,
  },
  levelBadge: {
    backgroundColor: 'rgba(255,215,0,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: THEME.gold,
  },
  levelText: {
    color: THEME.gold,
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyText: {
    color: 'rgba(255,255,255,0.3)',
    textAlign: 'center',
    marginTop: 50,
  }
});

export default LibraryScreen;