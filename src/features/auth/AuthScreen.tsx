import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

type Props = StackScreenProps<any, 'Auth'>;

export default function AuthScreen({ navigation }: Props) {
    return (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0D070B" />
        <View style={styles.logoWrapper}>
            <Text style={styles.logoText}>AETHER</Text>
        </View>

        <View style={styles.buttonWrapper}>
            <TouchableOpacity 
                style={styles.primaryButton}
                onPress={() => navigation.replace('Login')}>
                <Text style={styles.primaryText}>Log in</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={() => navigation.replace('Register')}>
                <Text style={styles.secondaryText}>Create account</Text>
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
        paddingVertical: 100,
    },
    logoWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        fontSize: 48,
        fontFamily: 'Fraunces',
        fontWeight: 'bold',
        color: '#BECFE4',
        letterSpacing: 8,
    },
    buttonWrapper: {
        width: '100%',
        gap: 12,
    },
    primaryButton: {
        backgroundColor: '#FFBF00',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
    },
    primaryText: {
        color: '#282828',
        fontWeight: 'bold',
        fontSize: 16,
    },
    secondaryButton: {
        borderWidth: 1,
        borderColor: '#FFBF00',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
    },
    secondaryText: {
        color: '#FFBF00',
        fontWeight: 'bold',
        fontSize: 16,
    },
});