import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar, ScrollView, SafeAreaView, Text } from 'react-native';

import { HeaderShown, HeaderAvatar, ImageContent, HeaderTitle, Item, Category, Paragraphe } from './cardsComponent';
const color = require('../helpers/color.json')

export default function GraphSkillComponent() {

    return (
        <View style={{ marginHorizontal: 20, marginBottom: 40 }}>
            <Item title='Qualité des Services' />
            <Stats note={4} />
            <Item title='Respect des délais' />
            <Stats note={10} />
            <Item title='Rapport qualité-prix' />
            <Stats note={7} />
            <Item title='Rélations humaines' />
            <Stats note={2} />
        </View>
    )
}



//------------ statistique --------------------


function Stats(props) {

    const width = 200
    let note = props.note * 20

    return (
        <View style={{ height: 8, width: width, backgroundColor: '#ddd', marginLeft: 10, borderRadius: 4, marginBottom: 8 }}>
            <View style={{ height: 8, width: note, backgroundColor: color.primary.color, borderRadius: 4 }}></View>
        </View>
    )
}