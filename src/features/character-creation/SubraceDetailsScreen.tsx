import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getSubraceDetails } from '../../api/apiClient';
import { sharedStyles, THEME } from '../../theme/sharedStyles';

const SubraceDetailsScreen = () => {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const { subraceIndex, raceColor, raceIcon } = route.params;
    const [details, setDetails] = useState<any>(null);

    useEffect(() => {
        getSubraceDetails(subraceIndex).then(setDetails);
    }, [subraceIndex]);

    if (!details) return (
        <View style={sharedStyles.safeArea}>
            <ActivityIndicator size="large" color={raceColor} style={{marginTop: 50}} />
        </View>
    );

    return (
    <SafeAreaView style={sharedStyles.safeArea}>
        <View style={sharedStyles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={sharedStyles.arrow}>{'<'}</Text>
            </TouchableOpacity>
                <Text style={sharedStyles.headerTitle}>{details.name.toUpperCase()}</Text>
            <TouchableOpacity>
                <Text style={sharedStyles.arrow}>{'>'}</Text>
            </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ alignItems: 'center', marginVertical: 30 }}>
                <Image source={{ uri: raceIcon }} style={{ width: 180, height: 180 }} resizeMode="contain" />
                <Text style={{ color: THEME.white, fontSize: 32, fontWeight: 'bold' }}>{details.name.toUpperCase()}</Text>
            </View>

            <View style={{ paddingHorizontal: 25 }}>
                <Text style={{ color: raceColor, fontWeight: 'bold', marginBottom: 10 }}>DESCRIPTION</Text>
                <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, lineHeight: 24 }}>{details.desc}</Text>
            </View>

            <TouchableOpacity 
                style={[sharedStyles.confirmButton, { backgroundColor: raceColor }]}
                onPress={() => {
                    if (details.subraces && details.subraces.length > 0) {
                        navigation.navigate('ChooseSubrace', { 
                            subraces: details.subraces, 
                            raceColor, 
                            raceIcon 
                        });
                    } else {
                        navigation.navigate('AbilityScores');
                    }
}}
            >
            <Text style={sharedStyles.confirmButtonText}>CONFIRM {details.name.toUpperCase()}</Text>
            </TouchableOpacity>
        </ScrollView>
        </SafeAreaView>
    );
};

export default SubraceDetailsScreen;