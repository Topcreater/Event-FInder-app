import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

interface HeaderProps {
    title: string;
}
export default function Header({ title }: HeaderProps) {
    return (
        <View>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        paddingVertical: 10
    }
});