import React, { useState, useEffect } from 'react';
import { StyleSheet, View, } from 'react-native';
import { Item } from '../components/cardsComponent';


const localeData = {
    coords: {
        "latitude": 0.5031368,
        "longitude": 9.4223535,
    }
}

export default function GeoCoderComponent({ data }) {

    const [timer, setTimer] = useState([])
    useEffect(() => {


    }, [data])


    return (
        <>
            <Item icon="md-walk" title='36 min' />
            <Item icon="md-bicycle" title='23 min' />
            <Item icon="md-car" title='10 min' />
        </>
    )
}