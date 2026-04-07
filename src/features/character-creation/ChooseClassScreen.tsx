import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { getClasses, DndClass } from '../../services/characterService';

const ChooseClassScreen = () => {
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
    <View style={styles.container}>
      <FlatList
        data={classes}
        keyExtractor={(item) => item.index}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0E0915', 
    paddingTop: 50 
  },
  center: { 
    flex: 1, 
    backgroundColor: '#0E0915', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  item: { 
    paddingHorizontal: 20, 
    paddingVertical: 15, 
    borderBottomWidth: 1, 
    borderColor: 'rgba(255, 191, 0, 0.2)' 
  },
  text: { 
    color: '#fff', 
    fontSize: 18,
    fontWeight: '500'
  }
});

export default ChooseClassScreen;