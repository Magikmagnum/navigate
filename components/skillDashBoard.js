import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'



export function SkillDashBoard(props) {
    return (
        <View style={{
            flexDirection: "row", height: 48, position: "relative", justifyContent: "space-between"
        }}>
            <RealCardBottom title="note" note={props.experience} icon='md-star' />
            <RealCardBottom title="contrat" note={props.training} icon='md-bookmark' />
            <RealCardBottom title="aime" note={props.recommendation} icon='md-heart' />
            <RealCardBottom title="commentaire" note={props.recommendation} icon='md-chatbubbles' />
        </View>
    )
}




function RealCardBottom(props) {
    return (
        <View style={{ flexDirection: 'column', minWidth: 64, paddingHorizontal: 20, height: 48, justifyContent: "center", alignItems: "center" }}>
            <Ionicons name={props.icon} size={24} color='#555' />
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#555' }}>{props.note}</Text>
            <Text style={{ fontSize: 12, color: '#999' }}>{props.title}</Text>
        </View>
    )
}
