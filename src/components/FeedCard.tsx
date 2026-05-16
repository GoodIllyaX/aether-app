import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { theme } from '../theme/sharedStyles';

interface FeedCardProps {
    character: any;
}

const FeedCard = ({ character }: FeedCardProps) => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.username}>@Default_User</Text>
                    <Text style={styles.time}>just now</Text>
                </View>
                <TouchableOpacity>
                    <Text style={{color: '#FFF', fontSize: 20}}>♡</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.tagContainer}>
                <Text style={[styles.tag, { color: '#FFD700' }]}>#{character.class}</Text>
                <Text style={[styles.tag, { color: '#FFA500' }]}>#{character.race}</Text>
                <Text style={[styles.tag, { color: '#FFA500' }]}>#D&D 5e</Text>
            </View>

            <Text style={styles.storySnippet} numberOfLines={4}>
                {character.bio?.story || "This hero's journey is yet to be told..."}
            </Text>

            <View style={styles.divider} />
        </View>
    );
};

const styles = StyleSheet.create({
card: {
    backgroundColor: '#1A1A1A',
    padding: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
},
header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
},
username: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
},
time: {
    color: '#666',
    fontSize: 12,
},
tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 15,
},
tag: {
    fontSize: 14,
    fontWeight: '700',
},
storySnippet: {
    color: '#BBB',
    lineHeight: 20,
    fontSize: 14,
},
divider: {
    marginTop: 15,
    height: 1,
    backgroundColor: '#333',
    width: '100%',
}
});

export default FeedCard;