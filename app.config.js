module.exports = ({ config }) => {
    return {
        ...config,
        extra: {
            ...config.extra,
            EXPO_PUBLIC_SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL || "",
            EXPO_PUBLIC_SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "",
            EXPO_PUBLIC_SUPABASE_ASSETS_URL: process.env.EXPO_PUBLIC_SUPABASE_ASSETS_URL || "",
            EXPO_PUBLIC_SUPABASE_CAMPAIGN_URL: process.env.EXPO_PUBLIC_SUPABASE_CAMPAIGN_URL || "",
            EXPO_PUBLIC_BASE_URL_IP: process.env.EXPO_PUBLIC_BASE_URL_IP || "",
            EXPO_PUBLIC_BASE_URL_IP_API: process.env.EXPO_PUBLIC_BASE_URL_IP_API || "",
        }
    };
};