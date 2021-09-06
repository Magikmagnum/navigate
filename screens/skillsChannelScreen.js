import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar, ScrollView, SafeAreaView, Image } from 'react-native';

import { HeaderShown, HeaderTitle, Item, HeaderAvatarProfil } from '../components/cardsComponent';

import { useRecoilState } from 'recoil';
import { themeState } from '../store/atomes/theme';

import FaireAppelComponent from "../components/faireAppelComponent"
import GraphSkillComponent from '../components/graphSkillComponent'
import { Loading } from '../components/loadingComponent'
import Realisation from '../components/realisationComponent'
import { useNavigation } from '@react-navigation/core';
import { SkillDashBoard } from "../components/skillDashBoard"
import AvisComponent from "../components/avisComponent"
import FaireOffreComponent from "../components/faireOffreComponent"
import { SkillsSlide } from '../components/slideComponent';
import GeoCoderComponent from '../components/geoCoderComponent'

import competenceData from '../helpers/competences'


const color = require('../helpers/color.json')


export default function SkillsChannelScreen(props) {



  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState({})
  const [theme, setTheme] = useState('light');

  const [themeStyle, setThemeStyle] = useRecoilState(themeState);
  const navigation = useNavigation()

  const params = JSON.parse(props.route.params)

  useEffect(() => {
    const id = params.id;
    const newData = competenceData.find(item => item.id == id);
    setData(newData)
    setTimeout(() => {
      setIsLoading(false)
    }, 4)
  }, [])



  const render = (props) => {

    if (isLoading) {
      return <View><Loading /></View>
    }

    return (
      <>
        <SafeAreaView style={{ borderBottomColor: themeStyle.border, borderBottomWidth: 1 }}>
          <StatusBar backgroundColor={themeStyle.content} networkActivityIndicatorVisible={true} barStyle={theme == 'dark' ? 'light-content' : 'dark-content'} hidden={false} />
          <HeaderShown title={data.title} theme={theme} icon='md-arrow-back' callback={() => navigation.navigate('Home', JSON.stringify(props.data))} />
        </SafeAreaView>


        <ScrollView style={{ backgroundColor: '#fff', marginBottom: 70 }}>
          <View style={{ backgroundColor: '#000', height: 172 }} >
            <Image source={params.imageUri} resizeMode={'cover'} style={{ flex: 1, width: null, height: null }} />
          </View>
          <View style={{ backgroundColor: '#fff', borderRadius: 20, position: "relative", top: -20 }}>

            <View style={{ flexDirection: "row", marginTop: 20, marginHorizontal: 20 }}>
              <View>
                <HeaderAvatarProfil avatarUri={data.avatarUri} />
              </View>
              <View style={{ marginLeft: 20, marginTop: 0 }}>
                <HeaderTitle title={data.nom} color="#444" litleTitle={data.adresse} />
              </View>
            </View>

            <View style={{ marginBottom: 26, marginTop: 16 }}>
              <SkillDashBoard note={data.note} contrat={data.contrat} realisation={data.realisation} aime={data.aime} commentaire={data.commentaire} />
            </View>

            <View style={{ ...styles.foot, flexDirection: 'row', height: 'auto' }}>
              <View style={{ flex: 6, marginRight: 10 }}>
                <FaireAppelComponent title="Lancer l'appel" number={data.telephone} />
              </View>
              <View style={{ flex: 6 }}>
                <FaireOffreComponent />
              </View>
            </View>

            <View style={{ marginHorizontal: 20, marginTop: 20 }}>
              <HeaderTitle title='A moins 1km de vous' subTitle={"Le lorem ipsum est, en imprimerie, une suite de mots sans signification"} />
            </View>
            <View style={{ marginHorizontal: 20, marginBottom: 20, marginTop: -14, flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
              <GeoCoderComponent data={data.coords} />
            </View>

            <View style={{ marginHorizontal: 20 }}>
              <HeaderTitle title='Mes réalisations' />
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

            <View style={{ marginHorizontal: 20 }}>
              <HeaderTitle title='Notes et avis' />
            </View>
            <GraphSkillComponent />
            <AvisComponent />
            <AvisComponent />
            <AvisComponent />

            <View style={{ marginHorizontal: 20 }}>
              <HeaderTitle title='Autres compétences' />
            </View>
            <SkillsSlide data={competenceData} />
          </View>
          <View style={{ marginBottom: 20 }}></View>
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