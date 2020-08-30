import React from 'react'
import { View, ActivityIndicator, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import { Header6 } from '../components/typoComponent'


const color = require('../helpers/color.json')
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export const handleSuccess = (setIsLoading, setLoadingSuccess, callback) => {
    setLoadingSuccess(true)
    setTimeout(
        function () {
            setIsLoading(false)
            callback()
            setLoadingSuccess(false)
        }, 300)
}


export const handleFailure = (setIsLoading, setLoadingFailure, callback) => {
    setLoadingFailure(true)
    setTimeout(
        function () {
            setIsLoading(false)
            callback()
            setLoadingFailure(false)
        }, 300)
}


export function Loading({ success, failure }) {

    let title = "Patientez..."
    const HandleSuccess = ({ success, failure }) => {
        if (failure) {
            return (
                <>
                    <Ionicons style={{ padding: 12 }} name={'md-close'} size={28} color={color.danger.color} />
                    <Header6
                        title='Erreur'
                        color={color.text.secondary}
                        fontWeight="bold"
                    />
                </>
            )
        }
        if (success) {
            return (
                <>
                    <Ionicons style={{ padding: 12 }} name={'md-checkmark'} size={28} color={color.primary.color} />
                    <Header6
                        title='Succés'
                        color={color.text.secondary}
                        fontWeight="bold"
                    />
                </>
            )
        }
        return (
            <>
                <ActivityIndicator style={{ padding: 12 }} size="large" color={color.primary.color} />
                <Header6
                    title={title}
                    color={color.text.secondary}
                    fontWeight="bold"
                />
            </>
        )
    }

    return (
        <View style={{
            backgroundColor: 'rgba(52, 52, 52, 0.4)',
            top: 0,
            left: 0,
            width: windowWidth,
            height: windowHeight,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
        }}>
            <View style={{
                backgroundColor: '#fff',
                padding: 8,
                borderRadius: 10,
                width: 100,
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                elevation: 3,
            }}>
                <HandleSuccess success={success} failure={failure} />
            </View>
        </View>
    )
}


