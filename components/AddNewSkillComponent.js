import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { HeaderTitle } from '../components/cardsComponent';
import { SkillsAbstraction } from '../components/settings/skills/AddComponent';
import { useRecoilState } from 'recoil';
import { themeState } from '../store/atomes/theme';


const color = require('../helpers/color.json')

// Component add skill user
export default function AddNewSkill() {

    const [modalVisible, setModalVisible] = useState(false);
    const [themeStyle, setThemeStyle] = useRecoilState(themeState);

    const skillsAbstractionCallback = useCallback(SkillsAbstraction({}, setModalVisible), []);


    return (
        <View style={{ marginHorizontal: 20, marginBottom: 20 }}>

            <HeaderTitle color={themeStyle.color} subColor={themeStyle.subColor} title='Ajouter une competence' subTitle="Ajouter une competence à votre compte vous permet d'aparaitre et de vendre vos competence dans le catalogue Ratisseur." />

            <TouchableOpacity onPress={() => setModalVisible(true)} style={{ height: 100, width: 100, borderColor: '#aaa', borderRadius: 12, elevation: 3, backgroundColor: themeStyle.subContent, alignItems: "center", justifyContent: 'center' }}>
                <Text style={{ fontSize: 36, fontWeight: 'bold', color: color.primary.color }}> + </Text>
            </TouchableOpacity>

            <Modal
                presentationStyle='pageSheet'
                animationType="slide"
                hardwareAccelerated={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                {modalVisible && skillsAbstractionCallback}
            </Modal>
        </View>
    )
}
