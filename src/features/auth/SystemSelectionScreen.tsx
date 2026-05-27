import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
// import { SUPABASE_CONFIG } from '../../config';
import { SUPABASE_CONFIG } from '../../config.web';

type Props = StackScreenProps<any, 'SystemSelection'>;

export default function SystemSelectionScreen({ navigation }: Props) {
    const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
    const logoBaseUrl = `${SUPABASE_CONFIG.ASSETS_URL}/ttrpg-system-logo`;

    const handleSystemSelect = (system: string) => {
        setSelectedSystem(system);
        console.log('Selected system:', system);
        navigation.replace('MainTabs');
    };

    const handleSkip = () => {
        navigation.replace('MainTabs');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#0D070B" />

            <View style={styles.header}>
                <Text style={styles.title}>Choose your ttrpg</Text>
                <Text style={styles.subtitle}> Select the system you want to use for your creations.</Text>
            </View>

            <View style={styles.cardsWrapper}>
                <TouchableOpacity
                        style={[
                            styles.card,
                            selectedSystem === '2014' ? styles.cardSelected : styles.cardUnselected,
                            ]}
                        onPress={() => handleSystemSelect('2014')}>
                    <Text style={[styles.cardLabel, selectedSystem === '2014' ? styles.textDark : styles.textLight]}> D&D 5e </Text>
                    <Image
                        source={{ uri: selectedSystem === '2014' ? `${logoBaseUrl}/BL-dragon.png` : `${logoBaseUrl}/RED-dragon.png` }}
                        style={styles.logo}
                        resizeMode="contain"/>

                    <Text style={[styles.cardYear, selectedSystem === '2014' ? styles.textDark : styles.textLight]}> 2014 </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.card,
                        selectedSystem === '2024' ? styles.cardSelected : styles.cardUnselected,
                    ]}
                    onPress={() => handleSystemSelect('2024')}>
                    <Text style={[styles.cardLabel, selectedSystem === '2024' ? styles.textDark : styles.textLight]}> D&D 5e </Text>

                    <Image
                        source={{ uri: selectedSystem === '2024' ? `${logoBaseUrl}/BL-dragon.png` : `${logoBaseUrl}/RED-dragon.png` }}
                        style={styles.logo}
                        resizeMode="contain"/>
                    <Text style={[styles.cardYear, selectedSystem === '2024' ? styles.textDark : styles.textLight]}> 2024 </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerNote}>Don't worry, you can change this at any time.</Text>
        
                <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D070B',
        padding: 24,
        justifyContent: 'space-between',
        paddingTop: 80,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#E1E1E1',
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 14,
        color: '#8A8A8A',
        textAlign: 'center',
        paddingHorizontal: 20,
        lineHeight: 20,
    },
    cardsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
        marginVertical: 40,
    },
    card: {
        flex: 1,
        height: 180,
        borderRadius: 12,
        borderWidth: 1,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardSelected: {
        backgroundColor: '#F2B84B',
        borderColor: '#F2B84B',
    },
    cardUnselected: {
        backgroundColor: '#160E14',
        borderColor: '#44283C',
    },
    cardLabel: {
        fontSize: 12,
        fontWeight: '600',
    },
    cardYear: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textDark: {
        color: '#0D070B',
    },
    textLight: {
        color: '#8A8A8A',
    },
    logo: {
        width: 60,
        height: 60,
    },
    footer: {
        alignItems: 'center',
        gap: 30,
    },
    footerNote: {
        fontSize: 12,
        color: '#666666',
        textAlign: 'center',
    },
    skipButton: {
        paddingVertical: 12,
        paddingHorizontal: 40,
    },
    skipText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#E1E1E1',
    },
});