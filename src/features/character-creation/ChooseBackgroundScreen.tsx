import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, TextInput, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { sharedStyles, THEME } from '../../theme/sharedStyles';
import { useCharacterStore } from '../../store/useCharacterStore';

import { characterService } from '../../services/characterService';

const STATIC_BACKGROUNDS = [
    { index: 'acolyte', name: 'Acolyte' },
    { index: 'criminal', name: 'Criminal' },
    { index: 'folk-hero', name: 'Folk Hero' },
    { index: 'noble', name: 'Noble' },
    { index: 'sage', name: 'Sage' },
    { index: 'soldier', name: 'Soldier' },
];

const ALIGNMENTS = [
    'Lawful Good', 'Neutral Good', 'Chaotic Good',
    'Lawful Neutral', 'True Neutral', 'Chaotic Neutral',
    'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'
];

const ChooseBackgroundScreen = () => {
const navigation = useNavigation<any>();
const [selected, setSelected] = useState('acolyte');
const [personalStory, setPersonalStory] = useState('');
const [appearanceValue, setAppearanceValue] = useState('');

const [isAlignmentOpen, setIsAlignmentOpen] = useState(false);
const [selectedAlignment, setSelectedAlignment] = useState('True Neutral');

const [faith, setFaith] = useState('');
const [ideal, setIdeal] = useState('');
const [bond1, setBond1] = useState('');
const [bond2, setBond2] = useState('');

const char = useCharacterStore();

const charStore = useCharacterStore();

const handleFinish = async () => {
const characterData = {
    name: charStore.heroName,
    race: charStore.chosenRace?.name || charStore.chosenRace,
    class: charStore.chosenClass?.name || charStore.chosenClass,
    stats: charStore.abilityScores,
    skills: charStore.selectedSkills,
    background: charStore.background,
    bio: {
        alignment: selectedAlignment,
        story: personalStory,
        appearance: appearanceValue,
        faith: faith,
        ideal: ideal,
        bond: `${bond1}\n${bond2}`
    }
};
const response = await characterService.saveCharacter(characterData);

console.log('OK SAVE:', response);

navigation.reset({
    index: 0,
    routes: [
        { 
            name: 'CharacterSheetScreen', 
            params: { character: characterData } 
        }
    ],
});
};

return (
    <SafeAreaView style={sharedStyles.safeArea}>
        <View style={sharedStyles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={sharedStyles.arrow}>{'<'}</Text>
            </TouchableOpacity>
            <Text style={sharedStyles.headerTitle}>BACKGROUND</Text>
            <TouchableOpacity>
                <Text style={sharedStyles.arrow}>{'>'}</Text>
            </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
            <View> 
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.selector}>
                    {STATIC_BACKGROUNDS.map((item) => (
                        <TouchableOpacity 
                            key={item.index}
                            onPress={() => setSelected(item.index)}
                            style={[styles.tab, selected === item.index && { borderColor: THEME.gold }]}
                        >
                            <Text style={{ color: selected === item.index ? THEME.gold : THEME.white }}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <View style={{ paddingHorizontal: 25 }}>
                <Text style={styles.sectionTitle}>CHARACTER STORY</Text>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.textArea}
                        placeholder="Describe your character's past..."
                        placeholderTextColor="rgba(255,255,255,0.3)"
                        multiline={true}
                        scrollEnabled={false}
                        value={personalStory}
                        onChangeText={setPersonalStory}
                        textAlignVertical="top"
                    />
                </View>
            </View>

            <View style={{ paddingHorizontal: 25, marginTop: 20 }}>
                <Text style={styles.sectionTitle}>CHARACTER APPEARANCE</Text>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.textArea}
                        placeholder="Describe your hero..."
                        placeholderTextColor="rgba(255,255,255,0.3)"
                        multiline={true}
                        scrollEnabled={false}
                        value={appearanceValue}
                        onChangeText={setAppearanceValue}
                        textAlignVertical="top"
                    />
                </View>
            </View>
            
            <View style={{ paddingHorizontal: 25 }}>
                <Text style={styles.sectionTitle}>ALIGNMENT</Text> 
                <TouchableOpacity 
                    style={[styles.inputWrapper, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderColor: isAlignmentOpen ? THEME.gold : 'rgba(255,255,255,0.1)' }]}
                    onPress={() => setIsAlignmentOpen(!isAlignmentOpen)}
                >
                    <Text style={{ color: THEME.white, fontSize: 16 }}>{selectedAlignment}</Text>
                    <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{isAlignmentOpen ? '▲' : '▼'}</Text>
                </TouchableOpacity>

                {isAlignmentOpen && (
                    <View style={styles.alignmentGrid}>
                        {ALIGNMENTS.map((align) => (
                            <TouchableOpacity 
                                key={align}
                                style={[styles.alignmentCell, selectedAlignment === align && { borderColor: THEME.gold, borderWidth: 1 }]}
                                onPress={() => {
                                    setSelectedAlignment(align);
                                    setIsAlignmentOpen(false);
                                }}
                            >
                                <Text style={[styles.alignmentText, selectedAlignment === align && { color: THEME.gold, fontWeight: 'bold' }]}>
                                    {align.replace(' ', '\n')}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                <View style={{ marginTop: 10 }}>
                    <Text style={styles.sectionTitle}>Faith</Text>
                    <View style={styles.inputWrapperSmall}>
                        <TextInput style={styles.inputSmall} placeholder="Faith..." placeholderTextColor="rgba(255,255,255,0.2)" value={faith} onChangeText={setFaith} />
                    </View>

                    <Text style={styles.sectionTitle}>Ideal</Text>
                    <View style={styles.inputWrapperSmall}>
                        <TextInput style={styles.inputSmall} placeholder="Ideal..." placeholderTextColor="rgba(255,255,255,0.2)" value={ideal} onChangeText={setIdeal} />
                    </View>

                    <Text style={styles.sectionTitle}>Bond</Text>
                    <View style={styles.inputWrapperSmall}>
                        <TextInput style={styles.inputSmall} placeholder="Bond 1..." placeholderTextColor="rgba(255,255,255,0.2)" value={bond1} onChangeText={setBond1} />
                    </View>
                    <View style={[styles.inputWrapperSmall, { marginTop: 10 }]}>
                        <TextInput style={styles.inputSmall} placeholder="Bond 2..." placeholderTextColor="rgba(255,255,255,0.2)" value={bond2} onChangeText={setBond2} />
                    </View>
                </View>

                <Text style={styles.sectionTitle}>TRAITS & BONDS</Text>
                <Text style={styles.descText}> 
                    Every background provides unique features. Choosing {selected} gives you specific proficiencies and equipment to start your journey.
                </Text>

                <TouchableOpacity 
                    style={[sharedStyles.confirmButton, { backgroundColor: THEME.gold, marginTop: 40 }]}
                    onPress={() => {
                        char.setBackground(selected);
                        char.setBackgroundStory(personalStory);
                        char.setAppearance(appearanceValue);
                        char.setAlignment(selectedAlignment);
                        char.setFaith(faith);
                        char.setIdeal(ideal);
                        char.setBond(`${bond1}\n${bond2}`);

                        handleFinish();

                        navigation.navigate('CharacterSheetScreen');
                    }}
                >
                    <Text style={sharedStyles.confirmButtonText}>FINISH CREATION</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </SafeAreaView>
);
};

const styles = StyleSheet.create({
    selector: { paddingLeft: 20, marginVertical: 20, maxHeight: 50 },
    tab: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 20,
        marginRight: 10,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    sectionTitle: {
        color: THEME.gold, 
        fontSize: 14, fontWeight: 
        'bold', 
        marginTop: 25, 
        marginBottom: 15, 
        textTransform: 'uppercase' 
    },
    inputWrapper: {
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        paddingHorizontal: 15,
        paddingVertical: 5,
        minHeight: 120,
    },
    textArea: {
        color: THEME.white,
        fontSize: 16,
        minHeight: 100,
        paddingTop: 10,
        paddingBottom: 10,
        fontFamily: 'Inter-Regular',
    },
    descText: { color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 22 },


    alignmentGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10,
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderRadius: 12,
        padding: 5,
    },
    alignmentCell: {
        width: '31%',
        aspectRatio: 1,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '3%',
        padding: 5,
    },
    alignmentText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 12,
        textAlign: 'center',
    },


    fieldHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 5,
    },
    inputWrapperSmall: {
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        paddingHorizontal: 15,
    },
    inputSmall: {
        color: THEME.white,
        fontSize: 16,
        height: 50,
        fontFamily: 'Inter-Regular',
    },
});

export default ChooseBackgroundScreen;