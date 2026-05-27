import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useCharacterStore } from '../../store/useCharacterStore';
import { getClassDetails, ClassDetail} from '../../services/characterService';
import { CLASS_VISUALS, DEFAULT_VISUAL } from '../../constants/classVisuals';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';

const ClassDetailsScreen = ({ route }: any) => {
  const { classIndex } = route.params;
  const navigation = useNavigation<any>();
  const [details, setDetails] = useState<ClassDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const { setChosenClass } = useCharacterStore();

  const visuals = CLASS_VISUALS[classIndex] || DEFAULT_VISUAL;

  const handleConfirm = () => {
    if (details && details.subclasses) {
      setChosenClass(details.name); 
    
      navigation.navigate('ChooseArchetype', { 
        subclasses: details.subclasses,
        classColor: visuals.color,
        classIcon: visuals.detailIcon
      });
    }
  };

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
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.arrow}>{'<'}</Text>
        </TouchableOpacity>
      
        <Text style={styles.headerTitle}>{details?.name.toUpperCase() || 'LOADING...'}</Text>
      
        <TouchableOpacity>
          <Text style={styles.arrow}>{'>'}</Text>
        </TouchableOpacity>
      </View>

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

        <TouchableOpacity 
          style={[styles.confirmButton, { backgroundColor: visuals.color }]} 
          onPress={handleConfirm}
>
          <Text style={styles.confirmButtonText}>
            SELECT {details?.name.toUpperCase()}
          </Text>
        </TouchableOpacity>

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

  // btn
  confirmButton: {
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // Android
    shadowColor: '#000', // iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  confirmButtonText: {
    color: '#000', // #FFF
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1,
  },

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
});
export default ClassDetailsScreen;