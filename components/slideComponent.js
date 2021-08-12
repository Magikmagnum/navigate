import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal } from 'react-native';
import { SkillsLitleCards } from '../components/skillsCardsComponent'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Start } from '../components/startComponent'
import { useNavigation } from '@react-navigation/core';

export function SkillsSlide(props) {

    const navigation = useNavigation()

    const SkillsCategory = (props) => {

        const _handelPress = () => {
            navigation.navigate('Skill', JSON.stringify(props.data))
        }

        return (
            <TouchableOpacity onPress={() => _handelPress(props)}>
                <SkillsLitleCards title={props.data.title} imageUri={props.data.imageUri} note={props.data.note} voter={props.data.voter} />
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ height: 150, marginBottom: 40 }}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {SkillsArray.map((item, index) => {
                    return <SkillsCategory key={item.id} data={item} propsParent={props} />
                })}
                <View style={{ width: 20 }}></View>
            </ScrollView>
        </View>
    )
}


const SkillsArray = [
    {
        id: 1,
        title: 'Boit de nuit',
        subTitle: 'Okala, Akanda / Gabon',
        imageUri: require("../assets/avatar/fete.jpg"),
        avatarUri: require("../assets/avatar/img1.jpg"),
        note: 4,
        voter: 12,
        experience: 1,
        training: 3,
        recommendation: 2
    },
    {
        id: 2,
        title: 'Plombier',
        subTitle: 'Okala, Akanda / Gabon',
        imageUri: require("../assets/avatar/plom.jpg"),
        avatarUri: require("../assets/avatar/img1.jpg"),
        note: 3,
        voter: 7000,
        experience: 6,
        training: 3,
        recommendation: 8
    },
    {
        id: 3,
        title: 'Medecin',
        subTitle: 'Nzeng-Ayong, Libreville / Gabon',
        imageUri: require("../assets/avatar/medecin.jpg"),
        avatarUri: require("../assets/avatar/img1.jpg"),
        note: 1,
        voter: 250,
        experience: 4,
        training: 2,
        recommendation: 0
    },
    {
        id: 4,
        title: 'Restaurant',
        subTitle: 'Charbonnages, Libreville / Gabon',
        imageUri: require("../assets/avatar/rest.jpg"),
        avatarUri: require("../assets/avatar/img1.jpg"),
        note: 5,
        voter: 11,
        experience: 4,
        training: 3,
        recommendation: 8
    },
    {
        id: 5,
        title: 'Mecanicien',
        subTitle: 'Okala, Akanda / Gabon',
        imageUri: require("../assets/avatar/gara.jpg"),
        avatarUri: require("../assets/avatar/img1.jpg"),
        note: 3,
        voter: 110,
        experience: 5,
        training: 3,
        recommendation: 2
    },
    {
        id: 6,
        title: 'Nounou',
        subTitle: 'Ondogho, Nzeng-ayong / Gabon',
        imageUri: require("../assets/avatar/nounou.jpg"),
        avatarUri: require("../assets/avatar/img1.jpg"),
        note: 0,
        voter: 0,
        experience: 5,
        training: 3,
        recommendation: 1
    },
    {
        id: 7,
        title: 'Maçon',
        subTitle: 'Louis, Libreville / Gabon',
        imageUri: require("../assets/avatar/macon.jpg"),
        avatarUri: require("../assets/avatar/img1.jpg"),
        note: 3,
        voter: 11,
        experience: 5,
        training: 3,
        recommendation: 2
    },
    {
        id: 8,
        title: 'Anteniste',
        subTitle: 'Plein-orety, Libreville / Gabon',
        imageUri: require("../assets/avatar/ant.jpg"),
        avatarUri: require("../assets/avatar/img1.jpg"),
        note: 5,
        voter: 72,
        experience: 1,
        training: 3,
        recommendation: 2
    },
]


export function ExperienceSlide(props) {

    const experienceArray = [
        {
            id: 1,
            title: 'Boit de nuit',
            date: '2 Mai à 13:26',
            imageUri: require("../assets/avatar/fete.jpg"),
            avatarUri: require("../assets/avatar/img1.jpg"),
            note: 4,
            voter: 12,
            experience: 1,
            training: 3,
            recommendation: 2,
            adresse: 'Okala, Akanda / Gabon',
        },
        {
            id: 2,
            title: 'Plombier',
            date: '2 Mai à 13:26',
            imageUri: require("../assets/avatar/plom.jpg"),
            avatarUri: require("../assets/avatar/img1.jpg"),
            note: 3,
            voter: 7,
            experience: 6,
            training: 3,
            recommendation: 8,
            adresse: 'Okala, Akanda / Gabon',
        },
        {
            id: 3,
            title: 'Medecin',
            date: '2 Mai à 13:26',
            imageUri: require("../assets/avatar/medecin.jpg"),
            avatarUri: require("../assets/avatar/img1.jpg"),
            note: 1,
            voter: 1,
            experience: 4,
            training: 2,
            recommendation: 0,
            adresse: 'Nzeng-Ayong, Libreville / Gabon',
        },
        {
            id: 4,
            title: 'Restaurant',
            date: '2 Mai à 13:26',
            imageUri: require("../assets/avatar/rest.jpg"),
            avatarUri: require("../assets/avatar/img1.jpg"),
            note: 5,
            voter: 11,
            experience: 4,
            training: 3,
            recommendation: 8,
            adresse: 'Charbonnages, Libreville / Gabon',
        },
        {
            id: 5,
            title: 'Mecanicien',
            date: '2 Mai à 13:26',
            imageUri: require("../assets/avatar/gara.jpg"),
            avatarUri: require("../assets/avatar/img1.jpg"),
            note: 3,
            voter: 11,
            experience: 5,
            training: 3,
            recommendation: 2,
            adresse: 'Okala, Akanda / Gabon',
        }
    ]

    const ExperienceCategory = (props) => {
        const [modalVisible, setModalVisible] = useState(false);
        return (
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Category imageUri={props.data.imageUri} />
                <View style={{ height: 60, marginLeft: 20, justifyContent: "center", width: 130 }}>
                    <Text style={{ height: 'auto', marginLeft: 2, lineHeight: 16, fontSize: 13, marginBottom: 4, color: '#666' }} numberOfLines={2}>{props.data.title}</Text>
                    <Start note={props.data.note} voter={false} />
                </View>
                <Modal
                    presentationStyle="overFullScreen"
                    animationType="slide"
                    hardwareAccelerated={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    {modalVisible ? props.propsParent.callback(props.data) : false}
                </Modal>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ height: 190, marginBottom: 20 }}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {experienceArray.map((item, index) => {
                    return <ExperienceCategory propsParent={props} key={item.id} data={item} />
                })}
            </ScrollView>
        </View>
    )
}








