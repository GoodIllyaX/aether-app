// import { LOCAL_CONFIG } from '../../config';
import { LOCAL_CONFIG } from '../config.web';

export interface CampaignData {
    name: string;
    dmName: string;
    contactInfo: string;
    privacy: 'Public' | 'Private';
    bannerColor: string;
    description: string;
}

export const campaignService = {

    createCampaign: async (campaignData: CampaignData) => {
        try {
            const response = await fetch(`${LOCAL_CONFIG.BASE_URL_IP_API}/campaigns/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(campaignData),
        }); 
        return await response.json();
        } catch (error) {
            console.error('Error creating campaign:', error);
            throw error;
        }
    },

    getUserCampaigns: async (userName: string) => {
        try {
            const response = await fetch(`${LOCAL_CONFIG.BASE_URL_IP_API}/campaigns/user/${userName}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching user campaigns:', error);
            throw error;
        }
    },

    getPublicCampaigns: async () => {
        try {
            const response = await fetch(`${LOCAL_CONFIG.BASE_URL_IP_API}/campaigns/public`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching public campaigns:', error);
            throw error;
        }
    },

    joinCampaign: async (inviteCode: string, userName: string) => {
        try {
        const response = await fetch(`${LOCAL_CONFIG.BASE_URL_IP_API}/campaigns/join`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ inviteCode, userName }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Failed to join campaign');
        } return data;
        } catch (error) {
            console.error('Error joining campaign:', error);
            throw error;
        }
    }
};