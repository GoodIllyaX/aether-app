import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useCharacterStore } from '../../store/useCharacterStore';
import { sharedStyles, THEME } from '../../theme/sharedStyles';
import { CLASS_VISUALS, DEFAULT_VISUAL } from '../../constants/classVisuals';
import { SKILL_MAP } from '../../constants/Statblock';

const CharacterSheetScreen = () => {
    const route = useRoute<any>();
    const charStore = useCharacterStore();
    const [activeTab, setActiveTab] = useState('Hero');

    const charData = route.params?.character || {
        name: charStore.heroName,
        race: charStore.chosenRace?.name || charStore.chosenRace,
        class: charStore.chosenClass?.name || charStore.chosenClass,
        stats: charStore.abilityScores,
        skills: charStore.selectedSkills,
        background: charStore.background,
        bio: {
            alignment: charStore.alignment,
            story: charStore.backgroundStory,
            appearance: charStore.appearance,
            faith: charStore.faith,
            ideal: charStore.ideal,
            bond: charStore.bond,
        }
    };

    const classNameKey = typeof charData.class === 'string' ? charData.class.toLowerCase() : charData.class?.index || '';
    const classVisual = CLASS_VISUALS[classNameKey] || DEFAULT_VISUAL;

    const getMod = (score: number) => {
        const mod = Math.floor((score - 10) / 2);
        return mod >= 0 ? `+${mod}` : `${mod}`;
    };

    return (
        <SafeAreaView style={sharedStyles.safeArea}>
            <View style={styles.tabHeader}>
                {['Hero', 'Stat', 'BIO'].map((tab) => (
                    <TouchableOpacity 
                        key={tab} 
                        onPress={() => setActiveTab(tab)}
                        style={[styles.tabButton, activeTab === tab && styles.activeTab]}
                    >
                        <Text style={[styles.tabText, activeTab === tab && { color: THEME.gold }]}>
                            {tab.toUpperCase()}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
                
                {activeTab === 'Hero' && (
                    <View>
                        <View style={styles.heroHeader}>
                            <Text style={styles.heroName}>{(charData.name || 'HERO').toUpperCase()}</Text>
                            
                            <Image 
                                source={{ uri: classVisual.detailIcon }} 
                                style={styles.classLargeIcon} 
                                resizeMode="contain" 
                            />

                            <View style={styles.badgeRow}>
                                <View style={styles.badge}><Text style={styles.badgeText}>{charData.race}</Text></View>
                                <View style={styles.badge}><Text style={styles.badgeText}>{charData.class}</Text></View>
                            </View>
                            <Text style={styles.alignmentText}>{charData.bio?.alignment || charData.alignment}</Text>
                        </View>

                        <View style={styles.statsGrid}>
                            {Object.entries(charData.stats).map(([key, value]: [string, any]) => (
                                <View key={key} style={styles.statCard}>
                                    <Text style={styles.statLabel}>{key.toUpperCase()}</Text>
                                    <Text style={styles.statValue}>{value}</Text>
                                    <View style={styles.modBadge}>
                                        <Text style={styles.modText}>{getMod(value)}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>

                        <View style={{ paddingHorizontal: 25, marginTop: 30, marginBottom: 20 }}>
            
                            <View style={styles.derivedRow}>
                                <Text style={styles.derivedLabel}>Armor Class</Text>
                                <Text style={styles.derivedValue}>{10 + Math.floor(((charData.stats?.dex || 10) - 10) / 2)}</Text>
                            </View>

                            <View style={styles.derivedRow}>
                                <Text style={styles.derivedLabel}>Initiative</Text>
                                <Text style={styles.derivedValue}>{getMod(charData.stats?.dex || 10)}</Text>
                            </View>

                            <View style={styles.derivedRow}>
                                <Text style={styles.derivedLabel}>Speed</Text>
                                <Text style={styles.derivedValue}>30 ft.</Text>
                            </View>

                            <View style={styles.derivedRow}>
                                <Text style={styles.derivedLabel}>Passive Wisdom (Perception)</Text>
                                <Text style={styles.derivedValue}>{10 + Math.floor(((charData.stats?.wis || 10) - 10) / 2)}</Text>
                            </View>

                            <View style={styles.derivedRow}>
                                <Text style={styles.derivedLabel}>Hit Points (Max)</Text>
                                <Text style={styles.derivedValue}>{8 + Math.floor(((charData.stats?.con || 10) - 10) / 2)}</Text>
                            </View>

                        </View>
                        
                    </View>
                )}

                {activeTab === 'Stat' && (
                    <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
                        <Text style={styles.sectionTitle}>SKILLS & MODIFIERS</Text>
                        {Object.keys(SKILL_MAP).map((skillName) => {
                            const abilityKey = SKILL_MAP[skillName] as keyof typeof charData.stats;
                            const score = charData.stats[abilityKey] || 10;
                            const mod = Math.floor((score - 10) / 2);
                            const isProficient = charData.skills.includes(skillName) || charData.skills.includes(skillName.toLowerCase());
                            const totalBonus = isProficient ? mod + 2 : mod;

                            return (
                                <View key={skillName} style={styles.skillRow}>
                                    <View style={styles.skillNameContainer}>
                                        <View style={[styles.profDot, { backgroundColor: isProficient ? THEME.gold : 'transparent' }]} />
                                        <Text style={styles.skillName}>{skillName}</Text>
                                    </View>
                                    <Text style={styles.skillBonus}>{totalBonus >= 0 ? `+${totalBonus}` : totalBonus}</Text>
                                </View>
                            );
                        })}
                    </View>
                )}

                {activeTab === 'BIO' && (
                    <View style={{ paddingHorizontal: 25, paddingTop: 20 }}>
                        <Text style={styles.sectionTitle}>ALIGNMENT: <Text style={{color: '#FFF'}}>{charData.bio?.alignment || 'N/A'}</Text></Text>
                        <Text style={styles.sectionTitle}>FAITH: <Text style={{color: '#FFF'}}>{charData.bio?.faith || 'None'}</Text></Text>
                        <Text style={styles.sectionTitle}>IDEAL: <Text style={{ color: '#FFF' }}>{charData.bio?.ideal || 'N/A'}</Text></Text>
                        <Text style={styles.sectionTitle}>BOND: <Text style={{ color: '#FFF' }}>{charData.bio?.bond || 'N/A'}</Text></Text>
                        
                        <Text style={styles.sectionTitle}>STORY</Text>
                        <View style={styles.storyCard}>
                            <Text style={styles.storyText}>{charData.bio?.story || 'No story yet.'}</Text>
                        </View>

                        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>APPEARANCE</Text>
                        <View style={styles.storyCard}>
                            <Text style={styles.storyText}>{charData.bio?.appearance || 'No description provided.'}</Text>
                        </View>

                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    tabHeader: { 
        flexDirection: 'row', 
        backgroundColor: 'rgba(255,255,255,0.02)', 
        borderBottomWidth: 1, 
        borderBottomColor: 'rgba(255,255,255,0.1)' 
    },
    tabButton: { 
        flex: 1, 
        paddingVertical: 15, 
        alignItems: 'center' },
    activeTab: { 
        borderBottomWidth: 2, 
        borderBottomColor: 
        THEME.gold },
    tabText: { 
        color: 'rgba(255,255,255,0.5)', 
        fontWeight: 'bold', 
        fontSize: 12 },

    heroHeader: { 
        alignItems: 'center', 
        marginVertical: 30 },
    heroName: { 
        color: THEME.white, 
        fontSize: 36, 
        fontWeight: '900', 
        marginBottom: 15 },
    classLargeIcon: { 
        width: 120, 
        height: 120, 
        marginVertical: 10 },
    badgeRow: { 
        flexDirection: 'row', 
        marginTop: 15 },
    badge: { 
        backgroundColor: 'rgba(255,215,0,0.1)', 
        paddingHorizontal: 15, 
        paddingVertical: 5, 
        borderRadius: 8, 
        marginHorizontal: 5, 
        borderWidth: 1, 
        borderColor: THEME.gold 
    },
    badgeText: { 
        color: THEME.gold, 
        fontSize: 14,
        fontWeight: 'bold' },
    alignmentText: { 
        color: 'rgba(255,255,255,0.4)', 
        marginTop: 10, 
        fontStyle: 'italic' },

    statsGrid: { 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'center' },
    statCard: { 
        width: '28%',
        backgroundColor: 'rgba(255,255,255,0.03)', 
        margin: 8, 
        padding: 12, 
        borderRadius: 15, 
        alignItems: 'center', 
        borderWidth: 1, 
        borderColor: 'rgba(255,255,255,0.1)' },
    statLabel: { 
        color: 'rgba(255,255,255,0.3)', 
        fontSize: 10, 
        fontWeight: 'bold' },
    statValue: { 
        color: THEME.white, 
        fontSize: 24, 
        fontWeight: 'bold', 
        marginVertical: 4 },
    modBadge: { 
        backgroundColor: THEME.gold, 
        paddingHorizontal: 8, 
        borderRadius: 4 },
    modText: { 
        color: '#000', 
        fontWeight: '900', 
        fontSize: 12 },

    sectionTitle: { 
        color: THEME.gold, 
        fontSize: 14, 
        fontWeight: 'bold', 
        marginBottom: 10 },
    skillRow: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        backgroundColor: 'rgba(255,255,255,0.03)', 
        padding: 15, 
        borderRadius: 10, 
        marginBottom: 8 
    },
    skillName: { 
        color: '#FFF', 
        fontSize: 14 },
    skillBonus: { 
        color: THEME.gold, 
        fontWeight: 'bold' },

    storyCard: { 
        backgroundColor: 'rgba(255,255,255,0.02)', 
        padding: 20, 
        borderRadius: 15, 
        marginTop: 10 },
    storyText: { 
        color: 'rgba(255,255,255,0.7)', 
        lineHeight: 22 },

    derivedRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    
    derivedLabel: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 16,
    },
    derivedValue: {
        color: THEME.white,
        fontSize: 20,
        fontWeight: 'bold',
    },

    skillNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 10,
        borderWidth: 1,
        borderColor: THEME.gold,
    },
});

export default CharacterSheetScreen;