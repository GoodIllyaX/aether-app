import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { characterService } from '../../services/characterService';
import FeedCard from '../../components/FeedCard';

const FeedScreen = () => {
    const [characters, setCharacters] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadFeed();
    }, []);

    const loadFeed = async () => {
        try {
            const data = await characterService.getAllCharacters();
            setCharacters(data);
        } catch (error) {
            console.error("Feed loading error:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadFeed();
        }, [])
    );

    const onRefresh = () => {
        setRefreshing(true);
        loadFeed();
    };

    if (loading && !refreshing) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#FFD700" />
            </View>
        );
    }

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#FFD700" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recent Heroes</Text>
            <FlatList
                data={characters}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <FeedCard character={item} />}
                contentContainerStyle={{ paddingBottom: 100 }}
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing} 
                        onRefresh={onRefresh} 
                        tintColor="#FFD700" 
                    />
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#0e0915', 
        paddingTop: 50 },
    center: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#0e0915' },
    title: { 
        color: '#FFF', 
        fontSize: 24, 
        fontWeight: 'bold', 
        marginLeft: 20, 
        marginBottom: 20 }
});

export default FeedScreen;