import React from 'react'
import { StyleSheet, Text, View} from 'react-native'
import { Ionicons } from '@expo/vector-icons'



function Starter(props) {

    let one = '#888'
    let two = '#888'
    let tree = '#888'
    let four = '#888'
    let five = '#888'

    switch (props.note) {
        case 1:
            one =  '#ff8f00'
        break;

        case 2:
            one =  '#ff8f00'
            two =  '#ff8f00'
        break;

        case 3:
            one = '#ff8f00' 
            two = '#ff8f00' 
            tree =  '#ff8f00'
        break;

        case 4:
            one = '#ff8f00' 
            two = '#ff8f00' 
            tree = '#ff8f00' 
            four =  '#ff8f00'
        break;

        case 5:
            one = '#ff8f00'
            two = '#ff8f00'
            tree = '#ff8f00'
            four = '#ff8f00'
            five =  '#ff8f00'
        break;
                                            
        default:
            break;
    }

    return (
        <View style={{flexDirection:"row"}}>
            <Ionicons name="md-star" style={{paddingHorizontal:2}} color={one} size={16} />
            <Ionicons name="md-star" style={{paddingHorizontal:2}} color={two} size={16} />
            <Ionicons name="md-star" style={{paddingHorizontal:2}} color={tree} size={16} />
            <Ionicons name="md-star" style={{paddingHorizontal:2}} color={four} size={16} />
            <Ionicons name="md-star" style={{paddingHorizontal:2}} color={five} size={16} />               
            { props.message !== false ? <Text style={{paddingHorizontal:16, color:'#888', position:"relative", top:-1}}>{props.message} </Text> : false }
        </View>
    )
}

export function Start(props) {
    
    let message = ''
    if(props.message) {
        message = props.message
    } else {
        if(!props.voter) {
            message = false
        }else if (props.voter == 1 ) {
            message = props.voter + ' personne à notée'
        } else {
            message = props.voter + ' personnes ont notées'
        }
    } 
    

    return <Starter note={props.note} message={message}/>
}