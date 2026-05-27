import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { LOCAL_CONFIG, CURRENT_SESSION } from '../../config';

type Props = StackScreenProps<any, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!name.trim() || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        try {
            const response = await fetch(`${LOCAL_CONFIG.BASE_URL_IP_API}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim(), password }),
            });

            const data = await response.json();

            if (!response.ok) {
                Alert.alert('Login Failed', data.error || 'Invalid name or password');
                return;
            }

            console.log('Logged in successfully:', data);
            CURRENT_SESSION.userName = data.user.name;
            navigation.replace('MainTabs');

        } catch (error) {
            console.error(error);
            Alert.alert('Network Error', 'Cannot connect to the server.');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#0D070B" />

            <Text style={styles.title}>LOGIN</Text>

            <View style={styles.form}>
            <Text style={styles.label}>Enter name :</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="John Pollo"
                placeholderTextColor="#443540"/>

            <Text style={styles.label}>Enter password :</Text>
            <View style={styles.passwordWrapper}>
                <TextInput
                    style={[styles.input, { flex: 1, borderWidth: 0, backgroundColor: 'transparent' }]}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password..."
                    placeholderTextColor="#443540"
                    secureTextEntry/>
                <TouchableOpacity style={styles.eyeIcon}>
                    <Text style={styles.eyeIconC}>👁</Text>
                </TouchableOpacity>
        </View>

        <TouchableOpacity 
            style={styles.primaryButton}
            onPress={handleLogin}>
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
        justifyContent: 'center' 
    },
    eyeIconC: {
        color: '#E1E1E1' 
    },
    title: { 
        fontSize: 32, 
        fontWeight: 'bold', 
        color: '#E1E1E1', 
        textAlign: 'center', 
        marginBottom: 40, 
        letterSpacing: 2 
    },
    form: { 
        width: '100%' 
    },
    label: { 
        color: '#E1E1E1',
        fontSize: 14, 
        marginBottom: 8, 
        marginTop: 16 
    },
    input: { 
        backgroundColor: '#1A1016', 
        borderRadius: 8, 
        padding: 14, 
        color: '#E1E1E1', 
        borderWidth: 1,
        borderColor: '#331B28' 
    },
    passwordWrapper: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#1A1016', 
        borderRadius: 8, 
        paddingRight: 14 
    },
    eyeIcon: { 
        marginLeft: 10 
    },
    primaryButton: { 
        backgroundColor: '#FFBF00', 
        borderRadius: 8, 
        padding: 16, 
        alignItems: 'center', 
        marginTop: 32 
    },
    primaryText: { 
        color: '#282828', 
        fontWeight: 'bold', 
        fontSize: 16 
    },
    secondaryButton: { 
        borderWidth: 1, 
        borderColor: '#FFBF00', 
        borderRadius: 8, 
        padding: 16,
        alignItems: 'center', 
        marginTop: 12 
    },
    secondaryText: { 
        color: '#FFBF00', 
        fontWeight: 'bold', 
        fontSize: 16 
    },
});