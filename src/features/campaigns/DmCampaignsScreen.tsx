import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert, SafeAreaView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { sharedStyles,} from '../../theme/sharedStyles';

type RootStackParamList = {
    DmCampaignsScreen: { campaign: any };
};

type DmCampaignsScreenRouteProp = RouteProp<RootStackParamList, 'DmCampaignsScreen'>;

export default function DmCampaignsScreen() {
    const navigation = useNavigation();
    const route = useRoute<DmCampaignsScreenRouteProp>();
    const { campaign } = route.params;
    const [activeTab, setActiveTab] = useState<'World' | 'Hero'>('World');

    const handleOpenLink = async (url: string) => {
        if (!url) return;

        let validUrl = url.trim();

        if (validUrl.startsWith('tg://')) {
            const username = validUrl.split('=').pop()?.split('/').pop();
            if (username) {
                validUrl = `https://t.me/${username}`;
            }
        }
        else if (validUrl.startsWith('@')) {
            validUrl = `https://t.me/${validUrl.substring(1)}`;
        }
        else if (!/^https?:\/\//i.test(validUrl)) {
            validUrl = `https://${validUrl}`;
        }
        try {
            await Linking.openURL(validUrl);
        } catch {
            Alert.alert('Error', "Couldn't open the link. Make sure it's valid.");
        }
};

    return (
        <SafeAreaView style={sharedStyles.safeArea}>
            <View style={sharedStyles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={sharedStyles.arrow}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={sharedStyles.headerTitle}>CAMPAIGN HUB</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
            <View style={[styles.banner, { backgroundColor: campaign.bannerColor || '#FFBF00' }]}>
                <Text style={styles.bannerTitle}>{campaign.name}</Text>
                <Text style={styles.bannerSubtitle}>by @{campaign.dmName}</Text>
            </View>

            <View style={styles.tabBar}>
                <TouchableOpacity 
                    style={[styles.tabButton, activeTab === 'World' && styles.activeTabButton]} 
                    onPress={() => setActiveTab('World')} >

                    <Text style={[styles.tabText, activeTab === 'World' && styles.activeTabText]}>World</Text>

                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.tabButton, activeTab === 'Hero' && styles.activeTabButton]} 
                    onPress={() => setActiveTab('Hero')} >

                    <Text style={[styles.tabText, activeTab === 'Hero' && styles.activeTabText]}>Hero</Text>

                </TouchableOpacity>
            </View>

            {activeTab === 'World' && (
                <View style={styles.contentBlock}>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.descriptionText}>
                    {campaign.description || "No description provided for this world yet..."}
                </Text>

                <Text style={styles.sectionTitle}>Material</Text>
                <View style={styles.materialCard}>
                    <Text style={styles.materialFile}>📄 Lore_Book_{campaign.name}.docx</Text>
                    <Text style={styles.materialDate}>10.10.26</Text>
                </View>

                <Text style={styles.sectionTitle}>Contact Info</Text>
                <View style={styles.contactRow}>
                    <Text style={styles.contactLabel}>Link:</Text>
                    
                    {campaign.contactInfo ? (
                        <TouchableOpacity onPress={() => handleOpenLink(campaign.contactInfo)}>
                            <Text style={[styles.contactValue, styles.linkText]}>
                                {campaign.contactInfo} ↗
                            </Text>
                        </TouchableOpacity>
                    ) : ( <Text style={styles.contactValue}>Not linked</Text> )}

                </View>
            </View>
            )}

            {activeTab === 'Hero' && (
                <View style={styles.contentBlock}>
                
                <View style={styles.inviteContainer}>
                    <Text style={styles.inviteLabel}>INVITE CODE:</Text>
                    <Text style={styles.inviteCode}>{campaign.inviteCode || 'N/A'}</Text>
                </View>

                <Text style={styles.sectionTitle}>Party Members</Text>
                
                {campaign.players && campaign.players.map((player: any, index: number) => (
                    <View key={index} style={styles.playerRow}>
                        <Text style={styles.playerName}>👤 @{player.userName}</Text>
                        <View style={[styles.roleBadge, player.role === 'DM' ? styles.roleDM : styles.rolePlayer]}>
                            <Text style={styles.roleText}>{player.role}</Text>
                        </View>
                    </View>
                ))}
            </View>
            )}

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
scrollContainer: {
    paddingBottom: 40,
},
linkText: {
    textDecorationLine: 'underline',
    color: '#FFBF00',
},
banner: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
},
bannerTitle: {
    color: '#0D070B',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
},
bannerSubtitle: {
    color: 'rgba(13, 7, 11, 0.6)',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 6,
},
tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
    marginHorizontal: 24,
    marginVertical: 15,
},
tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: 'transparent',
},
activeTabButton: {
    borderColor: '#FFBF00',
},
tabText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 16,
    fontWeight: '600',
},
activeTabText: {
    color: '#FFBF00',
},
contentBlock: {
    paddingHorizontal: 24,
},
sectionTitle: {
    color: '#FFBF00',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
},
descriptionText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 15,
    lineHeight: 22,
},
materialCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
},
materialFile: {
    color: '#E1E1E1',
    fontSize: 14,
},
materialDate: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 12,
},
contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1A1016',
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: '#331B28',
},
contactLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 15,
},
contactValue: {
    color: '#FFBF00',
    fontSize: 15,
    fontWeight: '600',
},
inviteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 191, 0, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 191, 0, 0.15)',
    borderRadius: 8,
    padding: 16,
    marginVertical: 10,
},
inviteLabel: {
    color: '#E1E1E1',
    fontSize: 14,
    fontWeight: 'bold',
},
inviteCode: {
    color: '#FFBF00',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
},
playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 8,
    padding: 14,
    marginBottom: 8,
},
playerName: {
    color: '#E1E1E1',
    fontSize: 15,
    fontWeight: '500',
},
roleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
},
roleDM: {
    backgroundColor: 'rgba(255, 191, 0, 0.15)',
},
rolePlayer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
},
roleText: {
    color: '#E1E1E1',
    fontSize: 11,
    fontWeight: 'bold',
},
});