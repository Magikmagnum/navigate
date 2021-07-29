import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar, ScrollView, SafeAreaView, Text } from 'react-native';

import { HeaderShown, ImageContent, HeaderTitle, Item, Category, Paragraphe, HeaderAvatarProfil } from '../components/cardsComponent';

import { useRecoilState } from 'recoil';
import { themeState } from '../store/atomes/theme';

import { Button } from '../components/formComponent'
import Map from '../components/mapComponent'
import { experienceStorage } from '../helpers/experienceStorage'
import { trainingStorage } from '../helpers/trainingStorage'
import ExperienceChannelScreen from './ExperienceChannelScreen'
import TrainingChannelScreen from './TrainingChannelScreen'
import { ListItemsComponent } from '../components/ListItemsComponent'
import GraphSkillComponent from '../components/graphSkillComponent'
import { Loading } from '../components/loadingComponent'
import Realisation from '../components/Realisation'
import { useNavigation } from '@react-navigation/core';
import { Start } from '../components/startComponent'
import { SkillDashBoard } from "../components/skillDashBoard"
import AvisComponent from "../components/avisComponent"

const color = require('../helpers/color.json')

const data = {
  coords: {
    "latitude": 0.5031368,
    "longitude": 9.4223535,
  }
}

export default function SkillsChannelScreen(props) {


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
          <HeaderShown title='Détail' theme={theme} icon='md-arrow-back' callback={() => navigation.navigate('Home', JSON.stringify(props.data))} />
        </SafeAreaView>


        <ScrollView style={{ backgroundColor: '#fff', marginBottom: 70 }}>

          <View style={{ flexDirection: "row", marginTop: 20, marginHorizontal: 20 }}>
            <View style={{}}>
              <HeaderAvatarProfil avatarUri={state.avatarUri} />
            </View>
            <View style={{ marginLeft: 20, marginTop: -20 }}>
              <HeaderTitle title={state.title} subTitle={state.subTitle} litleTitle={"Gansa Diambote eric"} />
            </View>
          </View>

          <View style={{ marginBottom: 26, marginTop: 16 }}>
            <SkillDashBoard note={state.note} experience={state.experience} training={state.training} recommendation={state.recommendation} />
          </View>

          <View style={{ ...styles.foot, flexDirection: 'row', height: 'auto' }}>
            <View style={{ flex: 8, marginRight: 10 }}>
              <Button title="Lancer l'appel" />
            </View>
            <View style={{ flex: 4 }}>
              <Button title='+' />
            </View>
          </View>

          <View style={{ marginHorizontal: 20, marginTop: 20 }}>
            <HeaderTitle title='A moins 1km de vous' subTitle={"Le lorem ipsum est, en imprimerie, une suite de mots sans signification"} />
          </View>
          <View style={{ marginHorizontal: 20, marginBottom: 20, marginTop: -14, flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
            <Item icon="md-walk" title='36 min' />
            <Item icon="md-bicycle" title='23 min' />
            <Item icon="md-car" title='10 min' />
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
          <View style={{ marginBottom: 30 }}></View>
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







const experienceScreen = (arg) => {
  return (
    <ExperienceChannelScreen data={arg} avatarUri={state.avatarUri} />
  )
}

const trainingScreen = (arg) => {
  return (
    <TrainingChannelScreen data={arg} avatarUri={state.avatarUri} />
  )
}