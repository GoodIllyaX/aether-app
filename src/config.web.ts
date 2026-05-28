declare const process: any;

export const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
export const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

export const SUPABASE_CONFIG = {
    ASSETS_URL: process.env.EXPO_PUBLIC_SUPABASE_ASSETS_URL || "",
    CAMPAIGN_MATERIALS_URL: process.env.EXPO_PUBLIC_SUPABASE_CAMPAIGN_URL || ""
};

export const LOCAL_CONFIG = {
    BASE_URL_IP: process.env.EXPO_PUBLIC_BASE_URL_IP || "",
    BASE_URL_IP_API: process.env.EXPO_PUBLIC_BASE_URL_IP_API || ""
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