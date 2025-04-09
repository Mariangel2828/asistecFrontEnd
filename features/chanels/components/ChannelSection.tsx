import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import ChannelCard from './ChannelCard';

type Channel = {
    channel_id: number;
    channel_name: string;
    description: string;
};

type Props = {
    title: string;
    channels: Channel[];
    isSubscribed: boolean;
    onPress: (channel: Channel) => void;
    emptyMessage: string;
};

export default function ChannelSection({
    title,
    channels,
    isSubscribed,
    onPress,
    emptyMessage,
}: Props) {
    return (
        <>
        <Text style={styles.sectionTitle}>{title}</Text>
        <FlatList
            data={channels}
            keyExtractor={(item) => item.channel_id.toString()}
            renderItem={({ item }) => (
            <ChannelCard
                name={item.channel_name}
                description={item.description}
                isSubscribed={isSubscribed}
                onPress={() => onPress(item)}
            />
            )}
            ListEmptyComponent={<Text style={styles.empty}>{emptyMessage}</Text>}
        />
        </>
    );
}

const styles = StyleSheet.create({
    sectionTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 12 },
    empty: { fontStyle: 'italic', color: '#777', marginVertical: 8 },
});
