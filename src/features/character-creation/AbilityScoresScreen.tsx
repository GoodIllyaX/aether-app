import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { sharedStyles, THEME } from '../../theme/sharedStyles';
import { useCharacterStore } from '../../store/useCharacterStore';

const abilities = [
    { id: 'str', name: 'STR', full: 'Strength' },
    { id: 'dex', name: 'DEX', full: 'Dexterity' },
    { id: 'con', name: 'CON', full: 'Constitution' },
    { id: 'int', name: 'INT', full: 'Intelligence' },
    { id: 'wis', name: 'WIS', full: 'Wisdom' },
    { id: 'cha', name: 'CHA', full: 'Charisma' },
];

const costMap: Record<number, number> = {
    8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9
};

const AbilityScoresScreen = () => {
    const navigation = useNavigation<any>();
    const { setAbilityScores } = useCharacterStore();
    const [scores, setScores] = useState<Record<string, string>>({
        str: '8', dex: '8', con: '8', int: '8', wis: '8', cha: '8'
    });

    const pointsUsed = useMemo(() => {
    return Object.values(scores).reduce((acc, scoreStr) => {
        const val = parseInt(scoreStr) || 8;
        return acc + (costMap[val] !== undefined ? costMap[val] : (val > 15 ? 9 : 0));
    }, 0);
}, [scores]);

    const pointsLeft = 27 - pointsUsed;

    const handleScoreChange = (id: string, value: string) => {
        let numericValue = value.replace(/[^0-9]/g, '');
        if (parseInt(numericValue) > 15) numericValue = '15';
            setScores(prev => ({ ...prev, [id]: numericValue }));
        };

    const handleConfirm = () => {
        const finalScores = {
            str: parseInt(scores.str),
            dex: parseInt(scores.dex),
            con: parseInt(scores.con),
            int: parseInt(scores.int),
            wis: parseInt(scores.wis),
            cha: parseInt(scores.cha),
        };
        setAbilityScores(finalScores);
        navigation.navigate('SkillsScreen');
    };

    return (
    <SafeAreaView style={sharedStyles.safeArea}>
        <View style={sharedStyles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={sharedStyles.arrow}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={sharedStyles.headerTitle}>ABILITY SCORES</Text>
        <TouchableOpacity>
            <Text style={sharedStyles.arrow}>{'>'}</Text>
        </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <Text style={styles.infoText}>Enter your base ability scores:</Text>

        <View style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                padding: 15,
                borderRadius: 12,
                marginBottom: 20,
                alignItems: 'center'
            }}>
            <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 'bold' }}>
                POINTS LEFT
            </Text>
            <Text style={{ 
                color: pointsLeft < 0 ? '#CE0E0E' : THEME.gold, 
                fontSize: 24, 
                fontWeight: '900',
                marginTop: 5 
            }}>
                {pointsLeft} / 27
            </Text>
        </View>
        
        <View style={styles.grid}>
            {abilities.map((ability) => (
            <View key={ability.id} style={[sharedStyles.card, styles.abilityCard]}>
                <Text style={styles.abilityLabel}>{ability.name}</Text>
                <TextInput
                    style={styles.scoreInput}
                    keyboardType="numeric"
                    value={scores[ability.id as keyof typeof scores]}
                    onChangeText={(val) => handleScoreChange(ability.id, val)}
                    placeholder="10"
                    placeholderTextColor="rgba(255,255,255,0.2)"
                />
                <Text style={styles.fullAbilityName}>{ability.full}</Text>
            </View>
            ))}
        </View>

        <TouchableOpacity 
            style={[sharedStyles.confirmButton, { backgroundColor: THEME.gold, marginTop: 40 }]}
            onPress={handleConfirm}
        >
            <Text style={sharedStyles.confirmButtonText}>CONFIRM SCORES</Text>
        </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    infoText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center'
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    abilityCard: {
        width: '48%',
        flexDirection: 'column',
        paddingVertical: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,215,0,0.1)',
    },
    abilityLabel: {
        color: THEME.gold,
        fontSize: 14,
        fontWeight: '900',
        marginBottom: 10,
    },
    scoreInput: {
        color: '#FFFFFF',
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 0,
        width: '100%',
    },
    fullAbilityName: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 10,
        marginTop: 5,
        textTransform: 'uppercase'
    }
});

export default AbilityScoresScreen;