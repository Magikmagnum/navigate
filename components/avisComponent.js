import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { HeaderAvatarComment } from './cardsComponent';
import { Start } from './startComponent';

export default function AvisComponent() {
    return (
        <View style={{ marginHorizontal: 20, marginBottom: 30 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                <View>
                    <HeaderAvatarComment avatarUri={require("../assets/avatar/img5.jpg")} />
                </View>
                <View style={{ marginLeft: 20 }}>
                    <Text style={{ fontSize: 14, fontWeight: "bold", color: "#555" }}>Mba Archimed</Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
                <View><Start note={3} /></View>
                <View style={{ marginLeft: 20 }}>
                    <Text style={{ fontSize: 12, color: "#888" }}>Le 05/06/2021</Text>
                </View>
            </View>
            <View style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 13, color: "#888", lineHeight: 20 }}>Le lorem ipsum également appelé faux-texte, lipsum, ou bolo bolo est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée.</Text>
            </View>
            <View style={{ flexDirection: "row", marginBottom: 10, alignItems: "center" }}>
                <Text style={{ fontSize: 12, color: "#888", lineHeight: 20, marginRight: 10 }}>Avez vous trouvé cet avis utile ?</Text>
                <View style={{ flexDirection: "row" }}>
                    <ButtonAvis title='Oui' />
                    <ButtonAvis title='Non' />
                </View>
            </View>
        </View>
    )
}

const ButtonAvis = ({ title }) => {
    return (
        <TouchableOpacity onPress={() => alert(title)} style={{ borderColor: '#ddd', borderWidth: 1, borderRadius: 10, padding: 1, paddingHorizontal: 8, marginHorizontal: 6 }}>
            <Text style={{ fontSize: 12, color: "#888" }} >{title}</Text>
        </TouchableOpacity>
    )
}