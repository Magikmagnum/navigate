import React, { useState, useCallback } from 'react';
import { StatusBar, Text, View, SafeAreaView, TouchableOpacity, Dimensions, Modal, ScrollView } from 'react-native';
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

export function CommentaireListe(params) {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={{ marginBottom: 10, }}>
            <View style={{ borderTopWidth: 1, borderColor: "#f1f1f1", paddingHorizontal: 30, paddingVertical: 20 }}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={{ color: "#888" }} >Voir les commentaire</Text>
                </TouchableOpacity>
                {modalVisible && <CommentaireModal setModalVisible={setModalVisible} modalVisible={modalVisible} />}
            </View>
            <CommentaireItem />
        </View>
    )
}


export function CommentaireListeModal(params) {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={{ marginBottom: 10, }}>
            <ScrollView style={{ backgroundColor: '#fff', marginBottom: 70, paddingTop: 10 }}>
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
                <CommentaireItem />
                <CommentaireItem />
                <CommentaireItem />
                <CommentaireItem />
                <CommentaireItem />
                <CommentaireItem />
                <CommentaireItem />
                <CommentaireItem />

                <View style={{ marginBottom: 60 }}></View>
            </ScrollView>
        </View>
    )
}


function CommentaireModal({ modalVisible, setModalVisible }) {

    const [theme, setTheme] = useState('light');
    const [themeStyle, setThemeStyle] = useRecoilState(themeState);

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
                <CommentaireListeModal />
            </View>
        </Modal>
    )
}