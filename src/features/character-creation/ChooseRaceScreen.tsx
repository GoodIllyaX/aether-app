import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getRaces } from '../../api/apiClient';
import { RACE_VISUALS } from '../../constants/raceVisuals';
import { sharedStyles } from '../../theme/sharedStyles';

const ChooseRaceScreen = () => {
    const [races, setRaces] = useState<any[]>([]);
    const navigation = useNavigation<any>();

    useEffect(() => {
        getRaces().then(res => setRaces(res.results));
    }, []);

    const handleNext = () => {
        navigation.navigate('RaceDetails');
    };

    return (
        <View style={sharedStyles.safeArea}>
            <View style={sharedStyles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={sharedStyles.arrow}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={sharedStyles.headerTitle}>CHOOSE RACE</Text>
                <TouchableOpacity onPress={handleNext}>
                    <Text style={sharedStyles.arrow}>{'>'}</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={races}
                keyExtractor={(item) => item.index}
                renderItem={({ item }) => {
                    const raceVisual = RACE_VISUALS[item.index] || { color: '#FFBF00', icon: '' };

                    return (
                        <TouchableOpacity 
                            style={styles.raceCard}
                            onPress={() => navigation.navigate('RaceDetails', { 
                                raceIndex: item.index,
                                raceName: item.name,
                                raceIcon: raceVisual.icon,
                                raceColor: raceVisual.color
                            })}
                        >
                            <Text style={styles.raceName}>{item.name}</Text>
                            <Image source={{ uri: raceVisual.icon }} style={styles.miniIcon} />
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    raceCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#221C2B',
    },
    raceName: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'Inter-Regular',
    },
    miniIcon: {
        width: 40,
        height: 40,
    }
});

export default ChooseRaceScreen;