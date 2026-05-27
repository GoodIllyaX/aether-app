import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { sharedStyles, THEME } from '../../theme/sharedStyles';

const SystemSelectionScreen = () => {
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView style={sharedStyles.safeArea}>
        <View style={sharedStyles.headerContainer}>
            <View style={{ width: 30 }} />
                <Text style={sharedStyles.headerTitle}>CHOOSE SYSTEM</Text>
            <View style={{ width: 30 }} />
        </View>

        <View style={{ flex: 1, paddingHorizontal: 25, justifyContent: 'center' }}>
        
        <TouchableOpacity 
            style={[sharedStyles.card, { borderColor: THEME.gold, borderWidth: 2 }]}
            onPress={() => navigation.navigate('HeroNameScreen')}
        >
            <View style={{ flex: 1 }}>
                <Text style={{ color: THEME.white, fontSize: 22, fontWeight: '900' }}>D&D 5e</Text>
                <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginTop: 5 }}> Classic high fantasy adventure </Text>
            </View>
            <Text style={sharedStyles.arrow}>{'>'}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={[sharedStyles.card, { opacity: 0.4 }]}
            disabled={true}
        >
            <View style={{ flex: 1 }}>
                <Text style={{ color: THEME.white, fontSize: 22, fontWeight: '900' }}>PATHFINDER 2E</Text>
                <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginTop: 5 }}> Advanced tactical combat (Locked) </Text>
            </View>
        </TouchableOpacity>

        </View>
    </SafeAreaView>
    );
};

export default SystemSelectionScreen;