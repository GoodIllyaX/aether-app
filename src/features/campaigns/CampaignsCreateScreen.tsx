import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { sharedStyles} from '../../theme/sharedStyles';
import { CURRENT_SESSION } from '../../../config';
import { campaignService } from '../../services/campaignService';

const COLOR_PALETTE = ['#A855F7', '#EAB308', '#DB2777', '#C2410C', '#6366F1'];

export default function CampaignsCreateScreen() {
    const navigation = useNavigation<any>();
    const [name, setName] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [description, setDescription] = useState('');
    const [privacy, setPrivacy] = useState<'Public' | 'Private'>('Public');
    const [selectedColor, setSelectedColor] = useState(COLOR_PALETTE[1]);

    const handleCreate = async () => {
        if (!name.trim()) {
            Alert.alert('Error', 'Campaign name is required!');
            return;
        }

        const campaignData = {
            name: name.trim(),
            dmName: CURRENT_SESSION.userName || 'Unknown_DM',
            contactInfo: contactInfo.trim(),
            privacy: privacy,
            bannerColor: selectedColor,
            description: description.trim(),
        };

        try {
            const response = await campaignService.createCampaign(campaignData);
            console.log('Campaign created:', response);
            Alert.alert('Success', `Campaign "${name}" created!`, [
                { 
                    text: 'OK', 
                    onPress: () => navigation.goBack()
                }
            ]);
        } catch (error) {
            console.error('Campaign creation technical error:', error);
            Alert.alert('Error', 'Failed to create campaign.');
        }
    };

    return (
    <SafeAreaView style={sharedStyles.safeArea}>
        <View style={sharedStyles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={sharedStyles.arrow}>{'<'}</Text>
            </TouchableOpacity>
            <Text style={sharedStyles.headerTitle}>CREATE CAMPAIGNS</Text>
            <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <Text style={styles.label}>Campaigns name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter name your campaigns..."
                placeholderTextColor="rgba(255,255,255,0.2)"
                value={name}
                onChangeText={setName} />

            <Text style={styles.label}>Contact Info</Text>
            <View style={styles.contactWrapper}>
                <TextInput
                style={[styles.input, { flex: 1, marginBottom: 0 }]}
                placeholder="discord..."
                placeholderTextColor="rgba(255,255,255,0.2)"
                value={contactInfo}
                onChangeText={setContactInfo} />

                <TouchableOpacity style={styles.plusButton}>
                    <Text style={styles.plusText}>+</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.rowSetting}>
                <Text style={styles.labelInline}>Privacy</Text>
                <TouchableOpacity 
                    style={styles.dropdownButton}
                    onPress={() => setPrivacy(privacy === 'Public' ? 'Private' : 'Public')} >
                    <Text style={styles.dropdownText}>{privacy}  ▼</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.rowSetting}>
                <View>
                    <Text style={styles.labelInline}>Attach World Lore</Text>
                    <Text style={styles.subLabel}>(.docx, .pdf, .md)</Text>
                </View>
                <TouchableOpacity style={styles.fileButton}>
                    <Text style={styles.fileButtonText}>File load  ⤓</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.label}>Choose color</Text>
            <View style={styles.colorContainer}>
                {COLOR_PALETTE.map((color) => (
                <TouchableOpacity
                    key={color}
                    style={[
                        styles.colorCircle, 
                        { backgroundColor: color },
                        selectedColor === color && styles.colorCircleSelected
                    ]}
                    onPress={() => setSelectedColor(color)} />
                ))}
            </View>

            <Text style={styles.label}>Description</Text>
            <TextInput
                style={styles.textArea}
                placeholder="Short World Synopsis..."
                placeholderTextColor="rgba(255,255,255,0.2)"
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                value={description}
                onChangeText={setDescription} />

            <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
                <Text style={styles.createButtonText}>CREATE</Text>
            </TouchableOpacity>

        </ScrollView>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
scrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
},
label: {
    color: '#E1E1E1',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
    textTransform: 'capitalize'
},
labelInline: {
    color: '#E1E1E1',
    fontSize: 16,
    fontWeight: '500',
},
subLabel: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 11,
    marginTop: 2,
},
input: {
    backgroundColor: '#1A1016',
    borderRadius: 8,
    padding: 14,
    color: '#E1E1E1',
    borderWidth: 1,
    borderColor: '#331B28',
    fontSize: 15,
    marginBottom: 10,
},
contactWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
},
plusButton: {
    backgroundColor: '#FFBF00',
    borderRadius: 8,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
},
plusText: {
    color: '#282828',
    fontSize: 24,
    fontWeight: 'bold',
},
rowSetting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
},
dropdownButton: {
    backgroundColor: '#1A1016',
    borderWidth: 1,
    borderColor: '#FFBF00',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
},
dropdownText: {
    color: '#FFBF00',
    fontWeight: '600',
},
fileButton: {
    borderWidth: 1,
    borderColor: '#FFBF00',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(255,191,0,0.05)',
},
fileButtonText: {
    color: '#FFBF00',
    fontWeight: '600',
},
colorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 10,
},
colorCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: 'transparent',
},
colorCircleSelected: {
    borderColor: '#E1E1E1',
    transform: [{ scale: 1.15 }],
},
textArea: {
    backgroundColor: '#1A1016',
    borderRadius: 8,
    padding: 14,
    color: '#E1E1E1',
    borderWidth: 1,
    borderColor: '#331B28',
    fontSize: 15,
    minHeight: 120,
    marginBottom: 30,
},
createButton: {
    backgroundColor: '#FFBF00',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
},
createButtonText: {
    color: '#282828',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
},
});