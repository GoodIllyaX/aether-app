import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getSkills } from '../../api/apiClient';
import { useCharacterStore } from '../../store/useCharacterStore';
import { sharedStyles, THEME } from '../../theme/sharedStyles';

const SkillsScreen = () => {
    const navigation = useNavigation<any>();
    const [allSkills, setAllSkills] = useState<any[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const { chosenClass } = useCharacterStore();

    const maxSkills = chosenClass === 'Bard' ? 3 : chosenClass === 'Rogue' ? 4 : 2;

    useEffect(() => {
        getSkills().then((res) => {
            setAllSkills(res.results);
            setLoading(false);
        });
    }, []);

    const toggleSkill = (skillIndex: string) => {
        if (selectedSkills.includes(skillIndex)) {
            setSelectedSkills(selectedSkills.filter(id => id !== skillIndex));
        } else if (selectedSkills.length < maxSkills) {
            setSelectedSkills([...selectedSkills, skillIndex]);
        }
    };

    if (loading) return (
        <SafeAreaView style={sharedStyles.safeArea}>
            <ActivityIndicator size="large" color={THEME.gold} style={{ marginTop: 50 }} />
        </SafeAreaView>
    );

    return (
        <SafeAreaView style={sharedStyles.safeArea}>
        <View style={sharedStyles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={sharedStyles.arrow}>{'<'}</Text>
            </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
            <Text style={sharedStyles.headerTitle}>SKILLS</Text>
                <Text style={{ color: THEME.gold, fontSize: 12, fontWeight: '900' }}> SELECT {selectedSkills.length} / {maxSkills}
            </Text>
        </View>
            <TouchableOpacity>
                <Text style={sharedStyles.arrow}>{'>'}</Text>
            </TouchableOpacity>
        </View>

        <FlatList
            data={allSkills}
                keyExtractor={(item) => item.index}
                contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 10 }}
                renderItem={({ item }) => {
            const isSelected = selectedSkills.includes(item.index);
            return (
                <TouchableOpacity 
                    style={[sharedStyles.card, { borderColor: isSelected ? THEME.gold : 'transparent', borderWidth: 2 }]}
                    onPress={() => toggleSkill(item.index)}
            >
                    <Text style={{ color: THEME.white, fontSize: 18, flex: 1 }}>{item.name}</Text>
                    {isSelected && <Text style={{ color: THEME.gold, fontWeight: '900' }}>✓</Text>}
                </TouchableOpacity>
            );
        }}
        />

        <TouchableOpacity 
            style={[sharedStyles.confirmButton, { backgroundColor: selectedSkills.length === maxSkills ? THEME.gold : 'rgba(255,255,255,0.1)' }]}
            disabled={selectedSkills.length !== maxSkills}
            onPress={() => navigation.navigate('ChooseBackgroundScreen')}
        >
            <Text style={sharedStyles.confirmButtonText}>CONFIRM SKILLS</Text>
        </TouchableOpacity>
        </SafeAreaView>
    );
};

export default SkillsScreen;