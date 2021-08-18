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
                <RealCardBottom title="note" value={props.note} icon='staro' />
                <RealCardBottom title="contrat" value={props.contrat} icon='book' />
                <RealCardBottom title="réalisation" value={props.realisation} icon='rocket1' />
                <RealCardBottom title="aime" value={props.aime} icon='hearto' />
                <RealCardBottom title="commentaire" value={props.commentaire} icon='message1' />
            </View>
        </ScrollView>
    )
}

//


function RealCardBottom(props) {
    return (
        <View style={{ flexDirection: 'column', minWidth: 80, paddingHorizontal: 20, height: 60, justifyContent: "center", alignItems: "center" }}>
            <AntDesign name={props.icon} size={20} color='#555' />

            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#555' }}>{props.value}</Text>
            <Text style={{ fontSize: 12, color: '#888' }}>{props.title}</Text>
        </View>
    )
}
