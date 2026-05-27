import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

type Props = StackScreenProps<any, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Auth');
        }, 750);
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#0D070B" />
            <Text style={styles.logoText}>AETHER</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D070B',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        fontSize: 42,
        fontFamily: 'Fraunces',
        fontWeight: 'bold',
        color: '#E1E1E1',
        letterSpacing: 6,
    },
});