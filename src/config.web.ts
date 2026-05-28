import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra || {};

export const SUPABASE_URL = extra.EXPO_PUBLIC_SUPABASE_URL || "";
export const SUPABASE_ANON_KEY = extra.EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

export const SUPABASE_CONFIG = {
    ASSETS_URL: extra.EXPO_PUBLIC_SUPABASE_ASSETS_URL || "",
    CAMPAIGN_MATERIALS_URL: extra.EXPO_PUBLIC_SUPABASE_CAMPAIGN_URL || ""
};

export const LOCAL_CONFIG = {
    BASE_URL_IP: extra.EXPO_PUBLIC_BASE_URL_IP || "",
    BASE_URL_IP_API: extra.EXPO_PUBLIC_BASE_URL_IP_API || ""
};

export const CURRENT_SESSION = { userName: '' };


// export const SUPABASE_URL = "";
// export const SUPABASE_ANON_KEY = "";

// export const SUPABASE_CONFIG = {
//     ASSETS_URL: "",
//     CAMPAIGN_MATERIALS_URL: ""
// };

// export const LOCAL_CONFIG = {
//     BASE_URL_IP: "",
//     BASE_URL_IP_API: ""
// };

// export const CURRENT_SESSION = { userName: '' };