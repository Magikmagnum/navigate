import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Dimensions, Share } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { AntDesign } from '@expo/vector-icons';

import { HeaderAvatarComment } from './cardsComponent';
import { CommentaireListe } from './commentaireComponent';

const color = require('../helpers/color.json')
const windowWidth = Dimensions.get('window').width;


export default function Realisation(props) {

    const navigation = useNavigation()

    let height = 140
    if (props.title) {
        height = 190
    }

    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate('Realization', JSON.stringify(props))
        }}>
            <View style={{ height: height, marginLeft: 20, borderWidth: 0.2, borderWidth: 0 }}>
                <View style={{ height: 140, width: 200, borderColor: '#aaa', borderRadius: 12, elevation: 3, backgroundColor: color.primary.color }}>
                    <Image source={props.imageUri} style={{ borderBottomLeftRadius: 12, borderBottomRightRadius: 12, flex: 1, width: null, height: null, resizeMode: "cover", borderTopLeftRadius: 12, borderTopRightRadius: 12 }} />
                </View>
                {
                    props.title && <View style={{ flex: 1, paddingLeft: 2, paddingTop: 12 }}>
                        <Text style={{ fontSize: 13, color: '#666', fontWeight: "bold" }}>{props.title}</Text>
                        <View style={{ flexDirection: "row", alignItems: 'center' }}>
                            <Text style={{ fontSize: 13, color: '#222', color: '#888' }}>8</Text>
                            <AntDesign style={{ marginLeft: 2, marginRight: 16 }} name='picture' size={14} color='#888' />
                            <Text style={{ fontSize: 13, color: '#222', color: '#888' }}>200</Text>
                            <AntDesign style={{ marginLeft: 2, marginRight: 16 }} name='hearto' size={14} color='#888' />
                            <Text style={{ fontSize: 13, color: '#222', color: '#888' }}>30</Text>
                            <AntDesign style={{ marginLeft: 2, marginRight: 16 }} name='message1' size={14} color='#888' />
                        </View>
                    </View>
                }
            </View>
        </TouchableOpacity>

    )
}

function RealisationText() {

    const [voir, setVoir] = useState(true)

    let text = "Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée.";


    const _handelPressVoir = () => {
        setVoir(c => !c)
    }

    return (
        <View>
            <Text style={{ fontSize: 16, color: "#666", lineHeight: 24 }}>
                {(voir && text.length > 200) ? text.substring(0, 120) + "..." : text}
            </Text>
            {text.length > 200 && <TouchableOpacity onPress={_handelPressVoir} style={{ marginTop: 10 }}><Text style={{ fontSize: 14, color: color.primary.color, lineHeight: 24 }}>Voir plus</Text></TouchableOpacity>}
        </View>
    )
}

export function RealisationIteme() {



    return (
        <View style={{ backgroundColor: 'white' }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, marginBottom: 16, marginHorizontal: 20 }}>
                <View style={{ marginRight: 16 }}>
                    <HeaderAvatarComment avatarUri={require("../assets/avatar/img5.jpg")} />
                </View>
                <View>
                    <Text style={{ fontWeight: "bold" }}>Maison de deux chambre</Text>
                    <Text style={{ color: "#888" }}>Gansa Diambote</Text>
                    <Text style={{ fontSize: 12, fontWeight: "bold", color: color.primary.color }}>Maçon</Text>
                </View>
            </View>
            <View style={{ marginHorizontal: 20, marginBottom: 24, }}>
                <RealisationText />
            </View>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                pagingEnabled={true}
            >
                <RealisationCard />
                <RealisationCard />
                <RealisationCard />
                <RealisationCard />
                <RealisationCard />
            </ScrollView>
            <View style={{ height: 70 }}></View>

        </View>
    )
}


function RealisationCard() {

    const [love, setLove] = useState(false)
    const [loveCount, setLoveCount] = useState(0)
    const [modalVisible, setModalVisible] = useState(false);
    const [commentaireFocus, setCommentaireFocus] = useState(false);
    const [imageSize, setImageSize] = useState({
        width: windowWidth,
        height: 0
    })

    const _handelPressHeartButton = useCallback(
        () => {
            const newValue = !love
            newValue ? setLoveCount(c => c + 1) : setLoveCount(c => c - 1)
            setLove(newValue)
        },
        [love],
    )

    const _handelPressCommentaireButton = useCallback(
        () => {
            setModalVisible(true)
            setCommentaireFocus(true)
        },
        [],
    )

    const _handelOnLoad = useCallback(
        (e) => {
            const height = (e.nativeEvent.source.height * windowWidth) / e.nativeEvent.source.width

            setImageSize({
                width: windowWidth,
                height: height
            })
        },
        [],
    )




    return (
        <View style={{ width: windowWidth }}>
            <View style={{}}>
                <Image
                    onLoad={e => _handelOnLoad(e)}
                    source={require("../assets/avatar/img3.jpg")}
                    style={{ width: (imageSize.width - 40), height: imageSize.height, marginHorizontal: 20, borderRadius: 20 }}
                />
            </View>
            <View style={{ flexDirection: "row", paddingHorizontal: 20, paddingVertical: 16 }}>
                <Text style={{ flex: 1, color: "#888", fontSize: 12 }}>{loveCount} j'aimes</Text>
                <Text style={{ color: "#888", fontSize: 12 }}>12 commentaires</Text>
                <Text style={{ color: "#888", fontSize: 12, marginLeft: 20 }}>10000 partages</Text>
            </View>
            <View style={{ borderTopWidth: 1, borderColor: "#f1f1f1", }}>
                <View style={{ flexDirection: "row", marginHorizontal: 20, paddingVertical: 12 }}>
                    <TouchableOpacity onPress={_handelPressHeartButton} style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <AntDesign style={{ marginRight: 10 }} name={love ? 'heart' : 'hearto'} size={20} color={love ? 'red' : '#999'} />
                        <Text style={{ color: love ? 'red' : '#999', fontSize: 13, fontWeight: '700' }}>j'aime</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={_handelPressCommentaireButton} style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <AntDesign style={{ marginRight: 10 }} name='message1' size={20} color='#999' />
                        <Text style={{ color: "#999", fontSize: 13, fontWeight: '700' }}>commentaires</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={_handelPressShare} style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <AntDesign style={{ marginRight: 10 }} name="sharealt" size={20} color='#999' />
                        <Text style={{ color: "#999", fontSize: 13, fontWeight: '700' }}>partager</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <CommentaireListe visible={{ modalVisible, setModalVisible }} focus={commentaireFocus} setFocus={setCommentaireFocus} />
        </View>
    )
}


const _handelPressShare = async () => {
    try {
        const result = await Share.share({
            message:
                'Vous venez de partager une ralisation issue de Ratisseur version 1.0',
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error) {
        alert(error.message);
    }
}