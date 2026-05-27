import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getRaceDetails } from '../../api/apiClient';
import { sharedStyles, THEME } from '../../theme/sharedStyles';
import { useCharacterStore } from '../../store/useCharacterStore';

const RaceDetailsScreen = () => {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const { raceIndex, raceName, raceIcon, raceColor } = route.params;
    const [details, setDetails] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const { setChosenRace } = useCharacterStore();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const data = await getRaceDetails(raceIndex);
                setDetails(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [raceIndex]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={raceColor || THEME.gold} />
            </View>
        );
    }

    if (!details) return null;

    return (
        <ScrollView style={sharedStyles.safeArea} showsVerticalScrollIndicator={false}>
            <View style={sharedStyles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={sharedStyles.arrow}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={sharedStyles.headerTitle}>{raceName.toUpperCase()}</Text>
                <View style={{ width: 30 }} /> 
            </View>

            <View style={styles.centerContent}>
                <Image source={{ uri: raceIcon }} style={styles.bigIcon} resizeMode="contain" />
                <Text style={[styles.raceTitle, { color: THEME.white }]}>{raceName.toUpperCase()}</Text>
            </View>

            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: raceColor || THEME.gold }]}>DESCRIPTION</Text>
                <Text style={styles.descriptionText}>{details.alignment}</Text>
            </View>


            <View style={styles.statsRow}>
                {details.ability_bonuses.map((bonus: any) => (
                    <View key={bonus.ability_score.index} style={styles.statBox}>
                        <Text style={styles.statLabel}>{bonus.ability_score.name}</Text>
                        <Text style={styles.statValue}>+{bonus.bonus}</Text>
                    </View>
                ))}
            </View>

            <TouchableOpacity 
                style={[sharedStyles.confirmButton, { backgroundColor: raceColor || THEME.gold }]}
                onPress={() => {
                    setChosenRace(raceName); 
                    console.log('Race Confirmed:', raceName);
                    if (details.subraces && details.subraces.length > 0) {
                        navigation.navigate('ChooseSubrace', { 
                            subraces: details.subraces, 
                            raceColor: raceColor, 
                            raceIcon: raceIcon 
                        });
                    } else {
                        navigation.navigate('AbilityScores'); 
                    }
                }}
            >
                <Text style={sharedStyles.confirmButtonText}>CONFIRM {raceName.toUpperCase()}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0E0915',
    },
    centerContent: {
        alignItems: 'center',
        marginVertical: 30,
    },
    bigIcon: {
        width: 180,
        height: 180,
        marginBottom: 20,
    },
    raceTitle: {
        fontSize: 32,
        fontFamily: 'Fraunces-Bold',
        fontWeight: 'bold',
    },
    section: {
        paddingHorizontal: 25,
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        letterSpacing: 1,
    },
    descriptionText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 16,
        lineHeight: 24,
    },
    statsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    statBox: {
        width: '47%',
        backgroundColor: 'rgba(255,255,255,0.05)',
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        alignItems: 'center',
    },
    statLabel: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 12,
        marginBottom: 5,
    },
    statValue: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '900',
    }
});

export default RaceDetailsScreen;