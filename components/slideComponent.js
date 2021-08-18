import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal } from 'react-native';
import { SkillsLitleCards } from '../components/skillsCardsComponent'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Start } from '../components/startComponent'
import { useNavigation } from '@react-navigation/core';

export function SkillsSlide({ data }) {

    return (
        <View style={{ height: 150, marginBottom: 40 }}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {data.map((item, index) => {
                    return <SkillsCategory key={item.id} data={item} />
                })}
                <View style={{ width: 20 }}></View>
            </ScrollView>
        </View>
    )
}

const SkillsCategory = (props) => {

    const navigation = useNavigation()
    const _handelPress = () => {
        navigation.navigate('Skill', JSON.stringify(props.data))
    }

    return (
        <TouchableOpacity onPress={() => _handelPress(props)}>
            <SkillsLitleCards title={props.data.title} imageUri={props.data.imageUri} note={props.data.note} contrat={props.data.contrat} />
        </TouchableOpacity>
    )
}