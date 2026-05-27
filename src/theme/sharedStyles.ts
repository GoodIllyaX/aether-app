import { StyleSheet } from 'react-native';

export const THEME = {
    background: '#0E0915',
    gold: '#FFD700',
    white: '#FFFFFF',
    grayText: 'rgba(255,255,255,0.5)',
    cardBg: 'rgba(255,255,255,0.03)',
};

export const sharedStyles = StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: THEME.background,
    },

    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        paddingVertical: 15,
    },
    headerTitle: {
        color: THEME.white,
        fontSize: 26,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    arrow: {
        color: THEME.gold,
        fontSize: 30,
        fontWeight: '300',
    },

    confirmButton: {
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 40,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmButtonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: '900',
        textTransform: 'uppercase',
    },

    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: THEME.cardBg,
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        borderWidth: 2,
    },
});