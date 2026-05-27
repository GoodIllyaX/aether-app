import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { LOCAL_CONFIG, CURRENT_SESSION } from '../../config';

type Props = StackScreenProps<any, 'Register'>;


export default function RegisterScreen({ navigation }: Props) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        if (!name.trim() || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match!');
            return;
        }

        try {
            const response = await fetch(`${LOCAL_CONFIG.BASE_URL_IP_API}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim(), password }),
            });

            const data = await response.json();

            if (!response.ok) {
                Alert.alert('Registration Failed', data.error || 'Something went wrong');
                return;
            }

            console.log('User registered successfully:', data);
            CURRENT_SESSION.userName = data.user.name;
            navigation.replace('SystemSelection');

        } catch (error) {
            console.error(error);
            Alert.alert('Network Error', 'Cannot connect to the server. Check your Wi-Fi and Node.js server!');
        }
    };

    return (
        <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0D070B" />
        <Text style={styles.title}>REGISTER</Text>

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
                        style={[styles.input, { flex: 1, backgroundColor: 'transparent' }]}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Enter your password..."
                        placeholderTextColor="#443540"
                        secureTextEntry/>
                </View>

                <Text style={styles.label}>Confirm password :</Text>
                <View style={styles.passwordWrapper}>
                    <TextInput
                        style={[styles.input, { flex: 1, backgroundColor: 'transparent' }]}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="Enter your password..."
                        placeholderTextColor="#443540"
                        secureTextEntry/>
                </View>

                <TouchableOpacity 
                    style={styles.primaryButton}
                    onPress={handleRegister}>
                <Text style={styles.primaryText}>Create account</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.secondaryButton}
                    onPress={() => navigation.replace('Login')}>
                <Text style={styles.secondaryText}>Log in</Text>
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