import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';




export function SkillDashBoard(props) {
    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}>

            <View style={{
                flexDirection: "row", height: 60, position: "relative", justifyContent: "space-between"
            }}>
                <RealCardBottom title="note" note={props.experience} icon='staro' />
                <RealCardBottom title="contrat" note={props.training} icon='book' />
                <RealCardBottom title="réalisation" note={props.recommendation} icon='rocket1' />
                <RealCardBottom title="aime" note={props.recommendation} icon='hearto' />
                <RealCardBottom title="commentaire" note={6000} icon='message1' />
            </View>
        </ScrollView>
    )
}

//


function RealCardBottom(props) {
    return (
        <View style={{ flexDirection: 'column', minWidth: 80, paddingHorizontal: 20, height: 60, justifyContent: "center", alignItems: "center" }}>
            <AntDesign name={props.icon} size={24} color='#555' />

            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#555' }}>{props.note}</Text>
            <Text style={{ fontSize: 12, color: '#888' }}>{props.title}</Text>
        </View>
    )
}
