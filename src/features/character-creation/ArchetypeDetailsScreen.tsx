import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getSubclassDetails, SubclassDetail } from '../../services/characterService';
import { useCharacterStore } from '../../store/useCharacterStore';

const ArchetypeDetailsScreen = ({ route }: any) => {
    const { subclassIndex, classColor, classIcon } = route.params;
    const navigation = useNavigation<any>();
    const [details, setDetails] = useState<SubclassDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const { setChosenArchetype } = useCharacterStore();

    useEffect(() => {
    const fetchDetails = async () => {
        try {
        const data = await getSubclassDetails(subclassIndex);
        setDetails(data);
        } finally {
        setLoading(false);
        }
    };
    fetchDetails();
    }, [subclassIndex]);

    const handleConfirm = () => {
    if (details) {
        setChosenArchetype(details.name);
        console.log(`Archetype ${details.name} confirmed!`);
        navigation.navigate('ChooseRace');
    }
    };

    if (loading) {
    return (
        <View style={styles.center}>
        <ActivityIndicator size="large" color={classColor || "#FFBF00"} />
        </View>
    );
    }

    return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.arrow}>{'<'}</Text>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>{details?.name.toUpperCase()}</Text>
        
        <TouchableOpacity>
            <Text style={styles.arrow}>{'>'}</Text>
        </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: classIcon }} style={styles.archetypeImage} resizeMode="contain" />

        <View style={styles.infoSection}>
            <Text style={[styles.sectionTitle, { color: classColor }]}>DESCRIPTION</Text>
            {details?.desc.map((paragraph, index) => (
            <Text key={index} style={styles.descriptionText}>
                {paragraph}
            </Text>
            ))}
        </View>

        <TouchableOpacity 
            style={[styles.confirmButton, { backgroundColor: classColor }]} 
            onPress={handleConfirm}
        >
            <Text style={styles.confirmButtonText}>
                CONFIRM {details?.name.toUpperCase()}
            </Text>
        </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#0E0915' },
    container: { padding: 20, alignItems: 'center' },
    center: { flex: 1, backgroundColor: '#0E0915', justifyContent: 'center', alignItems: 'center' },
    
    headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 15,
    },
    headerTitle: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
    arrow: { color: '#FFD700', fontSize: 30, fontWeight: '300' },

    archetypeImage: { width: 200, height: 200, marginBottom: 30 },

    infoSection: { width: '100%', marginBottom: 20 },
    sectionTitle: { fontSize: 16, fontWeight: '900', marginBottom: 10, letterSpacing: 1 },
    descriptionText: { color: '#BDC3C7', fontSize: 16, lineHeight: 24, marginBottom: 15 },

    confirmButton: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center',
    },
    confirmButtonText: { color: '#000', fontSize: 18, fontWeight: '900' },
});

export default ArchetypeDetailsScreen;