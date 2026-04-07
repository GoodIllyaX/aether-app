import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ClassDetailsScreen = ({ route }: any) => {
  const { classIndex } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Class Detail:{classIndex}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0E0915', justifyContent: 'center', alignItems: 'center' },
  text: { color: 'white', fontSize: 20 }
});

export default ClassDetailsScreen;