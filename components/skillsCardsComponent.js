import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { ImageBody, HeaderAvatar } from './cardsComponent';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';



const color = require('../helpers/color.json');

export function SkillsCards(props) {

    const navigation = useNavigation();

    return (
        <TouchableOpacity style={{ ...styles.content, ...props.styleContent, height: 'auto', paddingHorizontal: 20, marginBottom: 40, borderWidth: 0 }} onPress={() => {
            navigation.navigate('Skill', JSON.stringify(props.data));
        }}>
            <ImageBody imageUri={props.imageUri} />
            <View style={{ ...styles.head, marginTop: 12 }}>
                <View style={{ marginRight: 20 }}>
                    <HeaderAvatar avatarUri={props.avatarUri} />
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ fontWeight: 'bold', marginBottom: 3, color: '#444' }}>{props.title}</Text>
                    <Text style={{ fontSize: 12, color: color.primary.color, marginBottom: 3 }}>{props.adresse}</Text>
                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <Text style={{ fontSize: 13, color: '#222', color: '#888' }}>{props.note}</Text>
                        <AntDesign style={{ marginLeft: 2, marginRight: 24 }} name='star' size={14} color='#ff8f00' />
                        <Text style={{ fontSize: 13, color: '#222', color: '#888' }}>{props.contrat}</Text>
                        <AntDesign style={{ marginLeft: 2, marginRight: 24 }} name='book' size={14} color='#888' />
                        <Text style={{ fontSize: 13, color: '#222', color: '#888' }}>{props.realisation}</Text>
                        <AntDesign style={{ marginLeft: 2, marginRight: 24 }} name='rocket1' size={14} color='#888' />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}


export function MySkillsCards(props) {

    const navigation = useNavigation();

    return (
        <TouchableOpacity style={{ ...styles.content, ...props.styleContent, height: 'auto', paddingHorizontal: 20, marginBottom: 40, borderWidth: 0 }} onPress={() => {
            navigation.navigate('YourSkill', JSON.stringify(props));
        }}>
            <View style={{ ...styles.head, marginBottom: 20 }}>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>{props.title}</Text>
                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <Text style={{ fontSize: 13, color: '#222', color: '#888' }}>{props.etoile}</Text>
                        <AntDesign style={{ marginLeft: 2, marginRight: 24 }} name='star' size={14} color='#ff8f00' />
                        <Text style={{ fontSize: 13, color: '#222', color: '#888' }}>{props.contrat}</Text>
                        <AntDesign style={{ marginLeft: 2, marginRight: 24 }} name='book' size={14} color='#888' />
                        <Text style={{ fontSize: 13, color: '#222', color: '#888' }}>{props.realisation}</Text>
                        <AntDesign style={{ marginLeft: 2, marginRight: 24 }} name='rocket1' size={14} color='#888' />
                    </View>
                </View>
            </View>
            <ImageBody imageUri={props.imageUri} />
        </TouchableOpacity>
    )
}



export function SkillsLitleCards(props) {

    let height = 100
    if (props.title) {
        height = 150
    }

    return (
        <>
            <View style={{ height: height, marginLeft: 20, borderWidth: 0.2, borderWidth: 0 }}>
                <View style={{ height: 100, width: 100, borderColor: '#aaa', borderRadius: 12, elevation: 3, backgroundColor: color.primary.color }}>
                    <Image source={props.imageUri} style={{ borderBottomLeftRadius: 12, borderBottomRightRadius: 12, flex: 1, width: null, height: null, resizeMode: "cover", borderTopLeftRadius: 12, borderTopRightRadius: 12 }} />
                </View>
                {
                    props.title && <View style={{ flex: 1, paddingLeft: 2, paddingTop: 12 }}>
                        <Text style={{ fontSize: 13, color: '#444', marginBottom: 3, fontWeight: 'bold' }}>{props.title}</Text>
                        <View style={{ flexDirection: "row", alignItems: 'center' }}>
                            <Text style={{ fontSize: 13, color: '#222', color: '#888' }}>{props.note}</Text>
                            <AntDesign style={{ marginLeft: 2, marginRight: 24 }} name='star' size={14} color='#ff8f00' />
                            <Text style={{ fontSize: 13, color: '#222', color: '#888' }}>{props.contrat}</Text>
                            <AntDesign style={{ marginLeft: 2, marginRight: 24 }} name='book' size={14} color='#888' />
                        </View>
                    </View>
                }
            </View>
        </>
    )
}


export function SkillContent({ data }) {

    return (

        <ScrollView>
            {data.map((item, index) => {
                return <SkillsCards
                    key={item.id}
                    data={item}
                    imageUri={item.imageUri}
                    avatarUri={item.avatarUri}
                    title={item.title}
                    adresse={item.adresse}
                    note={item.note}
                    contrat={item.contrat}
                    realisation={item.realisation}

                />
            })}
            <View style={{ width: 20 }}></View>
        </ScrollView>
    )

}


const styles = StyleSheet.create({
    content: {
        height: 382,
    },
    head: {
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
    }
});