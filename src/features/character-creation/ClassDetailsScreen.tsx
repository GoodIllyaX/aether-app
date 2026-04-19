import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { getClassDetails, ClassDetail } from '../../services/characterService';
import { CLASS_VISUALS, DEFAULT_VISUAL } from '../../constants/classVisuals';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';

const ClassDetailsScreen = ({ route }: any) => {
  const { classIndex } = route.params;
  const navigation = useNavigation<any>();
  const [details, setDetails] = useState<ClassDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const visuals = CLASS_VISUALS[classIndex] || DEFAULT_VISUAL;

  useEffect(() => {
    navigation.setOptions({ headerLeft: () => null });
    const fetchDetails = async () => {
      try {
        const data = await getClassDetails(classIndex);
        setDetails(data);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [classIndex, navigation]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FFBF00" />
      </View>
    );
  }

  if (!details) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        <Image 
          source={{ uri: visuals.detailIcon }} 
          style={styles.classImage}
          resizeMode="contain"
        />
        
        <View style={[styles.header, { borderColor: visuals.color }]}>
          <Text style={styles.className}>{details.name.toUpperCase()}</Text>
          <Text style={styles.tagline}>{visuals.tagline}</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>HIT DIE</Text>
            <Text style={styles.statValue}>d{details.hit_die}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>SAVING THROWS</Text>
            {details.saving_throws.map((save, i) => (
              <Text key={i} style={styles.statValueSmall}>{save.name}</Text>
            ))}
          </View>
        </View>

        {/* Proficiencies Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROFICIENCIES</Text>
          <View style={styles.chipContainer}>
            {details.proficiencies.slice(0, 6).map((p, i) => (
              <View key={i} style={styles.chip}>
                <Text style={styles.chipText}>{p.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0E0915' },
  container: { padding: 20 },
  center: { flex: 1, backgroundColor: '#0E0915', justifyContent: 'center', alignItems: 'center' },
  header: {
    paddingVertical: 30,
    borderBottomWidth: 2,
    marginBottom: 20,
  },
  className: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: 2,
  },
  tagline: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    marginTop: 10,
    fontStyle: 'italic',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 15,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  statLabel: { color: '#FFBF00', fontSize: 12, fontWeight: 'bold', marginBottom: 5 },
  statValue: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  statValueSmall: { color: '#FFF', fontSize: 14 },
  section: { marginTop: 10 },
  sectionTitle: { color: '#FFBF00', fontSize: 16, fontWeight: 'bold', marginBottom: 15 },
  chipContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: {
    backgroundColor: 'rgba(255, 191, 0, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 191, 0, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: { color: '#FFF', fontSize: 12 },

  classImage: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
});
export default ClassDetailsScreen;