import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { sharedStyles} from '../../theme/sharedStyles';
import { CURRENT_SESSION } from '../../../config';
import { campaignService } from '../../services/campaignService';

export default function CampaignHubScreen() {
    const navigation = useNavigation<any>();
    const [inviteCode, setInviteCode] = useState('');
    const [dmCampaigns, setDmCampaigns] = useState<any[]>([]);
    const [playerCampaigns, setPlayerCampaigns] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const loadCampaigns = async () => {
        if (!CURRENT_SESSION.userName) return;
            setLoading(true);
        try {
            const data = await campaignService.getUserCampaigns(CURRENT_SESSION.userName);
            setDmCampaigns(data.myCampaignsAsDM || []);
            setPlayerCampaigns(data.myCampaignsAsPlayer || []);
        } catch (error) {
            console.error('Failed to load user campaigns:', error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadCampaigns();
        }, [])
    );

    const handleJoin = async () => {
        if (!inviteCode.trim()) {
            Alert.alert('Error', 'Please enter a campaign code');
            return;
        }

        const cleanedCode = inviteCode.trim().toUpperCase();
        const isMyOwnCampaign = dmCampaigns.some( (campaign) => campaign.inviteCode?.toUpperCase() === cleanedCode);

        if (isMyOwnCampaign) {
            Alert.alert(
                'Hey, Master!', 
                'You are the DM of this campaign! You cannot join your own world as a player.'
            );
            return;
        }
        
        const isAlreadyJoined = playerCampaigns.some( (campaign) => campaign.inviteCode?.toUpperCase() === cleanedCode);
        if (isAlreadyJoined) {
            Alert.alert(
                'Slow down, hero!', 
                'You have already joined this campaign. Check your "Joined Campaigns" list below!'
            );
            return; 
        }

        try {
            setLoading(true);
            await campaignService.joinCampaign(inviteCode.trim(), CURRENT_SESSION.userName);
            Alert.alert('Success', 'You successfully joined the campaign!');
            setInviteCode('');
            loadCampaigns();
        } catch (error: any) {
            Alert.alert('Join Failed', error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const renderCampaignCard = (campaign: any ) => (
        <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('DmCampaignsScreen', { campaign })} >

            <View style={styles.cardHeader}>
                <Text style={styles.campaignName}>{campaign.name}</Text>
                <Text style={styles.playerCount}>👥 {campaign.players?.length || 1}/5</Text>
            </View>

            <View style={styles.cardFooter}>
                <Text style={styles.dmName}>@{campaign.dmName}</Text>
                <Text style={styles.systemText}>D&D 5e • Fantasy</Text>
            </View>

        </TouchableOpacity>
    );

    const listData = [
        { type: 'header_dm', title: "MY CAMPAIGNS (AS DM)" }, ...dmCampaigns.map(c => ({ ...c, type: 'item' })),
        { type: 'header_player', title: "JOINED CAMPAIGNS (AS PLAYER)" }, ...playerCampaigns.map(c => ({ ...c, type: 'item' }))
    ];

    return (
        <SafeAreaView style={sharedStyles.safeArea}>
            <View style={sharedStyles.headerContainer}>
                <Text style={sharedStyles.headerTitle}>DM's CAMPAIGNS</Text>
                <TouchableOpacity 
                    style={styles.addButton} 
                    onPress={() => navigation.navigate('CampaignsCreate')} >
                
                    <Text style={styles.addButtonText}>[+]</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.joinContainer}>
                <TextInput
                    style={styles.joinInput}
                    placeholder="Enter campaign code..."
                    placeholderTextColor="rgba(255,255,255,0.2)"
                    value={inviteCode}
                    onChangeText={setInviteCode}
                    autoCapitalize="characters" />

                <TouchableOpacity style={styles.joinButton} onPress={handleJoin}>
                    <Text style={styles.joinButtonText}>Join</Text>
                </TouchableOpacity>
            </View>

            <FlatList data={listData} keyExtractor={(item, index) => item._id || `header-${index}`} renderItem={({ item }) => {
                if (item.type === 'header_dm' || item.type === 'header_player') {
                    return <Text style={styles.sectionTitle}>{item.title}</Text>;
                }
                return renderCampaignCard(item);
            }}
            contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 30 }}
            refreshing={loading}
            onRefresh={loadCampaigns} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
addButton: {
    position: 'absolute',
    right: 24,
},
addButtonText: {
    color: '#FFBF00',
    fontSize: 22,
    fontWeight: 'bold',
},
joinContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginVertical: 15,
},
joinInput: {
    flex: 1,
    backgroundColor: '#221c2b',
    borderRadius: 8,
    paddingHorizontal: 16,
    color: '#E1E1E1',
    borderWidth: 1,
    borderColor: '#becfe4',
    height: 48,
},
joinButton: {
    backgroundColor: '#FFBF00',
    borderRadius: 8,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    height: 48,
},
joinButtonText: {
    color: '#0e0915',
    fontWeight: 'bold',
    fontSize: 15,
},
sectionTitle: {
    color: '#FFBF00',
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 12,
    letterSpacing: 1,
},
card: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    padding: 16,
    marginBottom: 12,
},
cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
},
campaignName: {
    color: '#E1E1E1',
    fontSize: 16,
    fontWeight: 'bold',
},
playerCount: {
    color: '#FFBF00',
    fontSize: 13,
    fontWeight: '600',
},
cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
},
dmName: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 13,
},
systemText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 13,
},
});