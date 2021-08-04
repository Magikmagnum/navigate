import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar, SafeAreaView, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/core';
import { useRecoilState } from 'recoil';

import { HeaderShown } from '../components/cardsComponent';
import { RealisationIteme } from '../components/RealisationComponent';
import { Loading } from '../components/loadingComponent'

import { themeState } from '../store/atomes/theme';




export default function RealisationScreen(props) {


    const [isLoading, setIsLoading] = useState(true)
    const [state, setState] = useState({})

    const [theme, setTheme] = useState('light');
    const [themeStyle, setThemeStyle] = useRecoilState(themeState);

    const navigation = useNavigation()


    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 10)
    }, [])

    const render = (props) => {

        if (isLoading) {
            return <View><Loading /></View>
        }

        return (
            <>
                <SafeAreaView style={{ borderBottomColor: themeStyle.border, borderBottomWidth: 1 }}>
                    <StatusBar backgroundColor={themeStyle.content} networkActivityIndicatorVisible={true} barStyle={theme == 'dark' ? 'light-content' : 'dark-content'} hidden={false} />
                    <HeaderShown title='Réalisation' theme={theme} icon='md-arrow-back' callback={() => navigation.navigate('Skill', JSON.stringify(props.data))} />
                </SafeAreaView>
                <ScrollView>
                    <RealisationIteme />
                </ScrollView>
            </>
        )
    }

    return (
        <View>{render(props)}</View>
    )
}