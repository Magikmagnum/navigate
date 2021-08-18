import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';


import { Item } from '../components/cardsComponent';
import ModalComponent from './modalComponent'
import MapComponent from './mapComponent'

const color = require('../helpers/color.json')
const localeData = {
    coords: {
        "latitude": 0.5031368,
        "longitude": 9.4223535,
    }
}

export default function GeoCoderComponent({ data }) {

    const [timer, setTimer] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {


    }, [data])


    return (
        <View>
            <View style={{ flexDirection: "row", marginBottom: 8 }}>
                <Item icon="md-walk" title='36 min' />
                <Item icon="md-bicycle" title='23 min' />
                <Item icon="md-car" title='10 min' />
            </View>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={{ flexDirection: "row", marginHorizontal: 4 }}>
                <View style={{ flexDirection: "row", borderWidth: 0, flexGrow: 0, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 24, backgroundColor: "#666" }}>
                    <Entypo name="map" size={18} color="#fff" style={{ marginRight: 8 }} />
                    <Text style={{ color: "#fff", fontSize: 12 }}>Voir sur la carte</Text>
                </View>
            </TouchableOpacity>

            <ModalComponent
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                title='Faire une offre'
            >
                <MapComponent />
            </ModalComponent>
        </View>
    )
}