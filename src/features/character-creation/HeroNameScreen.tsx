import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { sharedStyles, THEME } from '../../theme/sharedStyles';
import { RANDOM_NAMES } from '../../constants/randomNames';
import { useCharacterStore } from '../../store/useCharacterStore';

const HeroNameScreen = () => {
    const navigation = useNavigation<any>();
    const [name, setName] = useState('');
    const { setHeroName } = useCharacterStore();

    const handleRandomize = () => {
        const randomIndex = Math.floor(Math.random() * RANDOM_NAMES.length);
        setName(RANDOM_NAMES[randomIndex]);
    };

    const handleNext = () => {
        setHeroName(name);
        navigation.navigate('ChooseClass');
    };

    return (
        <SafeAreaView style={sharedStyles.safeArea}>
            <View style={sharedStyles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={sharedStyles.arrow}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={sharedStyles.headerTitle}>HERO</Text>
                <TouchableOpacity onPress={handleNext}>
                    <Text style={sharedStyles.arrow}>{'>'}</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, paddingHorizontal: 25, justifyContent: 'center' }}>
                <Text style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginBottom: 10 }}>
                    Don't have a name? Click the <Text style={{ color: THEME.gold }}>dice to roll</Text> a random one.
                </Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Character name..."
                        placeholderTextColor="rgba(255,255,255,0.3)"
                        value={name}
                        onChangeText={setName}
                    />
                    <TouchableOpacity onPress={handleRandomize} style={styles.diceButton}>
                        <Text style={{ fontSize: 24 }}>🎲</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    style={[sharedStyles.confirmButton, { backgroundColor: name ? THEME.gold : 'rgba(255,255,255,0.1)' }]}
                    onPress={handleNext}
                    disabled={!name}
                >
                    <Text style={sharedStyles.confirmButtonText}>Next Step</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('ChooseClass')} style={{ alignItems: 'center' }}>
                    <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16 }}>Skip</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 60,
        color: THEME.white,
        fontSize: 18,
        fontFamily: 'Inter-Regular',
    },
    diceButton: {
        padding: 10,
    }
});

export default HeroNameScreen;