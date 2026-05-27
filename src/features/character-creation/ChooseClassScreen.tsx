import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getClasses, DndClass } from '../../services/characterService';
import { useCharacterStore } from '../../store/useCharacterStore';
import { useNavigation } from '@react-navigation/native';

const ChooseClassScreen = () => {
  const setClass = useCharacterStore((state) => state.setChosenClass);
  const navigation = useNavigation<any>();
  const [classes, setClasses] = useState<DndClass[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await getClasses();
        setClasses(data);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FFBF00" />
        <Text style={{ color: '#FFBF00', marginTop: 10 }}>Loading artifacts...</Text>
      </View>
    );
  }

return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => {/* Logic ex */}}>
          <Text style={styles.arrow}>{'<'}</Text>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>CHOOSE CLASS</Text>
        
        <TouchableOpacity>
          <Text style={styles.arrow}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={classes}
        keyExtractor={(item) => item.index}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.item}
            onPress={() => {
              setClass(item); 
              navigation.navigate('ClassDetails', { classIndex: item.index });
            }}
          >
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0E0915' },
  
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: 'bold',
  },
  arrow: {
    color: '#FFD700',
    fontSize: 30,
    fontWeight: '300',
  },

  center: { flex: 1, backgroundColor: '#0E0915', justifyContent: 'center', alignItems: 'center' },
  item: { padding: 20, borderBottomWidth: 1, borderColor: 'rgba(255, 191, 0, 0.2)' },
  text: { color: '#fff', fontSize: 18 }
});

export default ChooseClassScreen;