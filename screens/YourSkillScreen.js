import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar, ScrollView, SafeAreaView, Image } from 'react-native';

import { HeaderShown, HeaderTitle } from '../components/cardsComponent';

import { useRecoilState } from 'recoil';
import { themeState } from '../store/atomes/theme';
import { Loading } from '../components/loadingComponent'
import FaireOffreComponent from '../components/FaireOffreComponent'
import Realisation from '../components/RealisationComponent'
import { useNavigation } from '@react-navigation/core';
import { SkillDashBoard } from "../components/skillDashBoard"

const color = require('../helpers/color.json')


export default function YourSkillScreen(props) {


    const [isLoading, setIsLoading] = useState(true)
    const [state, setState] = useState({})

    const [theme, setTheme] = useState('light');
    const [themeStyle, setThemeStyle] = useRecoilState(themeState);

    const navigation = useNavigation()

    const params = JSON.parse(props.route.params)

    useEffect(() => {
        setState(params)
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
                    <HeaderShown title={state.title} theme={theme} icon='md-arrow-back' callback={() => navigation.navigate('Desk', JSON.stringify(props.data))} />
                </SafeAreaView>


                <ScrollView style={{ backgroundColor: '#fff', marginBottom: 50 }}>
                    <View style={{ backgroundColor: '#000', height: 160 }} >
                        <Image source={params.imageUri} resizeMode={'cover'} />
                    </View>
                    <View style={{ backgroundColor: '#fff', borderRadius: 20, position: "relative", top: -20 }}>

                        <View style={{ marginBottom: 26, marginTop: 30 }}>
                            <SkillDashBoard note={state.note} experience={state.experience} training={state.training} recommendation={state.recommendation} />
                        </View>
                        <View style={{ marginHorizontal: 20 }}>
                            <HeaderTitle title='Vos offre' subTitle="Le lorem ipsum également appelé faux-texte, lipsum, ou bolo bolo est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée." />
                        </View>
                        <View style={{ ...styles.foot, flexDirection: 'row', height: 'auto' }}>
                            <View style={{ flex: 1 }}>
                                <FaireOffreComponent />
                            </View>
                        </View>

                        <View style={{ marginHorizontal: 20 }}>
                            <HeaderTitle title='Mes réalisations' subTitle="Le lorem ipsum également appelé faux-texte, lipsum, ou bolo bolo est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée." />
                        </View>
                        <View style={{ height: 190, marginBottom: 20 }}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                <Realisation title='Maçon' imageUri={require("../assets/avatar/macon.jpg")} />
                                <Realisation title='Restaurant' imageUri={require("../assets/avatar/rest.jpg")} />
                                <Realisation title='Mecanicien' imageUri={require("../assets/avatar/gara.jpg")} />
                                <Realisation title='Restaurant' imageUri={require("../assets/avatar/rest.jpg")} />
                                <Realisation title='Mecanicien' imageUri={require("../assets/avatar/gara.jpg")} />
                                <View style={{ width: 20 }}></View>
                            </ScrollView>
                        </View>
                    </View>
                </ScrollView>

            </>
        )
    }

    return (
        <View>{render(props)}</View>
    )
}





const styles = StyleSheet.create({
    content: {
        height: 382,
        backgroundColor: '#aaa',
    },

    head: {

        flexDirection: "row",
    },

    foot: {
        height: 116,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
});