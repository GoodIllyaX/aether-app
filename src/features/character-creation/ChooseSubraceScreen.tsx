import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { sharedStyles, THEME } from '../../theme/sharedStyles';

const ChooseSubraceScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { subraces, raceColor, raceIcon } = route.params;

    return (
    <SafeAreaView style={sharedStyles.safeArea}>
        <View style={sharedStyles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={sharedStyles.arrow}>{'<'}</Text>
            </TouchableOpacity>
            <Text style={sharedStyles.headerTitle}>CHOOSE SUBRACE</Text>
            <TouchableOpacity>
                <Text style={sharedStyles.arrow}>{'>'}</Text>
            </TouchableOpacity>
        </View>

        <FlatList
            data={subraces}
            keyExtractor={(item) => item.index}
            contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20 }}
            renderItem={({ item }) => (
                <TouchableOpacity 
                    style={sharedStyles.card}
                    onPress={() => navigation.navigate('SubraceDetailsScreen', { 
                        subraceIndex: item.index,
                        raceColor: raceColor,
                        raceIcon: raceIcon 
                    })}
                >
                <Text style={{ color: THEME.white, fontSize: 18, flex: 1 }}>{item.name}</Text>
                <Image source={{ uri: raceIcon }} style={{ width: 40, height: 40 }} resizeMode="contain" />
            </TouchableOpacity>
        )}
        />
    </SafeAreaView>
    );
};

export default ChooseSubraceScreen;