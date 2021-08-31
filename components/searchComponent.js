import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, SafeAreaView, TextInput, ViewBase } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BorderlessButton, TapGestureHandler } from 'react-native-gesture-handler'
import Animated, { Value } from 'react-native-reanimated'

import { ScanenerQrcode } from '../components/qrcodeComponent'
import ModalComponent from '../components/modalComponent'

const color = require('../helpers/color.json')
const windowWidth = Dimensions.get('window').width;


export default function HeaderShownSearch({ gesturHandler }) {

    const [visible, setVisible] = useState(false);
    const [onFocus, setOnFocus] = useState(true);
    const searchInput = useRef();

    return (
        <SafeAreaView style={{ flexDirection: "row", backgroundColor: '#fff' }}>

            <View style={{ flexDirection: "row", height: 46, width: windowWidth - 86, backgroundColor: '#fff', marginLeft: 20, marginTop: 10, marginBottom: 10, marginRight: 16, borderRadius: 4, elevation: 3 }}>
                {onFocus ?
                    <TouchableOpacity
                        onPress={() => setVisible(c => !c)}
                        style={{ justifyContent: "center", alignItems: "center", width: 46, height: 46 }}
                    >
                        <AntDesign name='qrcode' size={24} color='#666' />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => {
                        searchInput.current.clear()
                        searchInput.current.blur()
                    }} style={{ justifyContent: "center", alignItems: "center", width: 46, height: 46 }}>
                        <Ionicons name="md-arrow-back" size={24} color="#666" />
                    </TouchableOpacity>
                }
                <TextInput
                    ref={searchInput}
                    placeholder='Rechercher un contacts'
                    placeholderTextColor='#aaa'
                    style={{ flex: 1, height: 46, fontSize: 16, backgroundColor: '#fff', paddingHorizontal: 0 }}
                    //onChangeText={(text) => searchContact(text)}
                    onFocus={() => setOnFocus(false)}
                    onBlur={() => setOnFocus(true)}
                />
                {onFocus ?
                    <TouchableOpacity onPress={() => {
                        searchInput.current.focus()
                    }} style={{ justifyContent: "center", alignItems: "center", width: 46, height: 46 }}>
                        <AntDesign name='search1' size={20} color='#666' />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => {
                        searchInput.current.clear()
                    }} style={{ justifyContent: "center", alignItems: "center", width: 46, height: 46 }}>
                        <AntDesign name='close' size={20} color='#666' />
                    </TouchableOpacity>
                }
            </View>
            <TapGestureHandler {...gesturHandler} >
                <Animated.View>
                    <View style={{ position: "relative", width: 32, height: 32, backgroundColor: "#fff", marginTop: 18, marginRight: 20, justifyContent: "center", alignItems: "center" }}>
                        <MaterialCommunityIcons name="bell" size={20} color="#666" />
                        <View style={{ position: "absolute", top: 8, right: 8, height: 8, width: 8, backgroundColor: color.primary.color, borderRadius: 4 }}></View>
                    </View>
                </Animated.View>
            </TapGestureHandler>
            <ModalComponent modalVisible={visible} setModalVisible={setVisible} title={'Scanne Qrcode'}>
                <ScanenerQrcode />
            </ModalComponent>
        </SafeAreaView>
    )
}
