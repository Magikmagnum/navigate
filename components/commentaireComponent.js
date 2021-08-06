import React, { useState, useCallback, useEffect, useRef } from 'react';
import { StatusBar, Text, View, SafeAreaView, TouchableOpacity, Dimensions, Modal, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons'

import { HeaderAvatarComment, HeaderShown } from './cardsComponent';

import { useRecoilState } from 'recoil';
import { themeState } from '../store/atomes/theme';




const windowWidth = Dimensions.get('window').width;


export function CommentaireItem(params) {
    return (
        <View style={{ width: windowWidth - 100, marginHorizontal: 20, marginBottom: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                <View>
                    <HeaderAvatarComment avatarUri={require("../assets/avatar/img6.jpg")} />
                </View>
                <View style={{ marginLeft: 20 }}>
                    <Text style={{ fontSize: 14, fontWeight: "bold", color: "#555" }}>Kassassa Divin Hanse </Text>
                    <Text style={{ fontSize: 12, color: "#888" }}>Le 05/06/2021</Text>

                </View>
                <TouchableOpacity style={{ margin: 10, borderWidth: 1, borderColor: "#ddd", borderRadius: 100, width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name={'md-heart'} color='#888' size={13} />
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: "#f1f1f1", padding: 20, borderRadius: 8, }}>
                <Text style={{ fontSize: 13, color: "#888", lineHeight: 20 }}>Le lorem ipsum également appelé faux-texte, lipsum, ou bolo bolo est, en imprimerie, une suite de mots sans signification utilisée à titre...</Text>
            </View>
            <TouchableOpacity style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#222', color: '#888' }}>Répondre</Text>
            </TouchableOpacity>
        </View>
    )
}

export function CommentaireListe({ visible, focus, setFocus }) {

    // le useState de la modal, initialiser dans le component realisation
    const modalVisible = visible.modalVisible
    const setModalVisible = visible.setModalVisible

    console.log("CommentaireListe", focus)
    const _handelPressVoirCommentaire = useCallback(
        () => {
            setFocus(false)
            setModalVisible(true)
        },
        [],
    )

    return (
        <View style={{}}>
            <View style={{ borderTopWidth: 1, borderColor: "#f1f1f1", paddingHorizontal: 30, paddingVertical: 20 }}>
                <TouchableOpacity onPress={_handelPressVoirCommentaire}>
                    <Text style={{ color: "#888" }} >Voir les commentaire</Text>
                </TouchableOpacity>
                {modalVisible && <CommentaireModal setModalVisible={setModalVisible} modalVisible={modalVisible} focus={focus} />}
            </View>
            <CommentaireItem />
        </View>
    )
}


export function CommentaireListeModal(params) {

    const [modalVisible, setModalVisible] = useState(false);

    return (

        <ScrollView style={{ backgroundColor: '#fff', paddingTop: 10 }}>
            <CommentaireItem />
            <CommentaireItem />
            <CommentaireItem />
            <CommentaireItem />
            <CommentaireItem />
            <CommentaireItem />
            <CommentaireItem />
            <CommentaireItem />
            <CommentaireItem />
            <CommentaireItem />
            <CommentaireItem />
        </ScrollView>
    )
}


function CommentaireModal({ modalVisible, setModalVisible, focus }) {

    const [theme, setTheme] = useState('light');
    const [themeStyle, setThemeStyle] = useRecoilState(themeState);

    console.log("CommentaireModal", focus)

    return (
        <Modal
            presentationStyle='pageSheet'
            animationType="slide"
            hardwareAccelerated={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View>
                <SafeAreaView style={{ borderBottomColor: themeStyle.border, borderBottomWidth: 1 }}>
                    <StatusBar backgroundColor={themeStyle.content} networkActivityIndicatorVisible={true} barStyle={theme == 'dark' ? 'light-content' : 'dark-content'} hidden={false} />
                    <HeaderShown title="Commentaire"
                        icon='md-arrow-back' callback={(() => setModalVisible(false))}
                        theme={theme}
                    />
                </SafeAreaView>
                <View style={{ marginBottom: 212 }}>
                    <CommentaireListeModal />
                </View>
            </View>
            <View style={{
                position: 'absolute', bottom: 0, borderTopWidth: 1, borderTopColor: '#f3f3f3', backgroundColor: "#fff",
                shadowColor: "#000", shadowOpacity: 0.23, shadowRadius: 2.62, elevation: 4,
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
            }} >
                <CommentaireTextInput focus={focus} />
            </View>
        </Modal>
    )
}

function CommentaireTextInput({ focus }) {

    const [message, setmessage] = useState('')
    const [inputSize, setinputSize] = useState(64)
    const refTextInput = useRef()

    const _handelOnContentSizeChange = (event) => {
        setinputSize(event.nativeEvent.contentSize.height)
    }

    useEffect(() => {
        if (focus) {
            refTextInput.current.focus()
            console.log(refTextInput.current)
        }
    }, [focus])

    console.log("CommentaireTextInput", focus)

    return (
        <View style={{ flexDirection: "row", marginHorizontal: 20, marginTop: 20, marginBottom: 20, alignItems: "center", width: windowWidth - 40 }} >
            <View style={{ marginRight: 16 }}>
                <HeaderAvatarComment avatarUri={require("../assets/avatar/img2.jpg")} />
            </View>
            <View style={{ flexDirection: "row", flex: 1, height: inputSize, borderRadius: 10, justifyContent: "center", backgroundColor: "#f2f2f2", borderWidth: 1, borderColor: '#f0f0f0' }}>
                <TextInput
                    ref={refTextInput}
                    style={{ color: "#888", padding: 10, fontSize: 16, lineHeight: 20 }}
                    placeholder="Ajouter un commentaire..."
                    multiline={true}
                    allowFontScaling={true}
                    autoCapitalize={'sentences'}
                    onContentSizeChange={(event) => _handelOnContentSizeChange(event)}
                />
            </View>
            <TouchableOpacity style={{ width: 24, height: 24, marginLeft: 14, justifyContent: "center", alignItems: "center" }}>
                <Ionicons name={'md-send'} color='#888' size={24} />
            </TouchableOpacity>
        </View>
    )
}
