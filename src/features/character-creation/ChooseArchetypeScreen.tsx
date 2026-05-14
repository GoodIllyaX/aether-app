import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { sharedStyles} from '../../theme/sharedStyles';

const ChooseArchetypeScreen = ({ route }: any) => {
    const {subclasses, classColor, classIcon } = route.params;
    const navigation = useNavigation<any>();

    const [selectedIndex, setSelectedIndex] = useState<string | null>(null);

    return (
    <SafeAreaView style={styles.container}>
    <View style={sharedStyles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={sharedStyles.arrow}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={sharedStyles.headerTitle}>CHOOSE SUBCLASS</Text>
        <TouchableOpacity><Text style={sharedStyles.arrow}>{'>'}</Text></TouchableOpacity>
    </View>

        <FlatList
        data={subclasses}
        keyExtractor={(item) => item.index}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
            const isSelected = selectedIndex === item.index;

            return (
                <TouchableOpacity 
                style={[
                    styles.card, 
                    { borderColor: isSelected ? classColor : 'transparent', borderWidth: 2 }
                ]}
                onPress={() => {
                    setSelectedIndex(item.index);

                    navigation.navigate('ArchetypeDetails', { 
                        subclassIndex: item.index,
                        classColor: classColor,
                        classIcon: classIcon
                    });
                }}
                >
                <Image source={{ uri: classIcon }} style={styles.icon} />
                <View>
                    <Text style={styles.archetypeName}>{item.name.toUpperCase()}</Text>
                    <Text style={styles.tapText}>Tap to learn more</Text>
                </View>
                </TouchableOpacity>
            );
        }}
        />
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        paddingVertical: 15,
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 26,
        fontWeight: 'bold',
    },
    arrow: {
        color: '#FFD700',
        fontSize: 30,
        fontWeight: '300',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
    },
    icon: { width: 45, height: 45, marginRight: 15 },
    archetypeName: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    tapText: { color: 'rgba(255,255,255,0.5)', fontSize: 12 },

    container: { flex: 1, backgroundColor: '#0E0915', },
    listContent: { padding: 20, },
});

export default ChooseArchetypeScreen;