import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar, ScrollView, SafeAreaView, Text } from 'react-native';

import { HeaderShown, HeaderAvatar, ImageContent, HeaderTitle, Item, Category, Paragraphe } from '../components/cardsComponent';

import { useRecoilState } from 'recoil';
import { themeState } from '../store/atomes/theme';

import { Button } from '../components/formComponent'
import Map from '../components/mapComponent'
import { experienceStorage } from '../helpers/experienceStorage'
import { trainingStorage } from '../helpers/trainingStorage'
import ExperienceChannelScreen from './ExperienceChannelScreen'
import TrainingChannelScreen from './TrainingChannelScreen'
import { ListItemsComponent } from '../components/ListItemsComponent'
import { Loading } from '../components/loadingComponent'
import Realisation from '../components/Realisation'
import { useNavigation } from '@react-navigation/core';
import { Start } from '../components/startComponent'
import { SkillDashBoard } from "../components/skillDashBoard"
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


        <ScrollView onPress={() => setModalVisible(true)} style={{ ...styles.content, ...props.styleContent, height: 'auto', backgroundColor: '#fff' }}>



          <View style={{ paddingHorizontal: 20 }}>
            <View style={{ ...styles.head, paddingTop: 20, position: "relative" }}>
              <HeaderAvatar avatarUri={state.avatarUri} />
              <View style={{ position: "absolute", left: 70, top: 4 }}>
                <HeaderTitle title={state.title} subTitle={state.subTitle} />
              </View>
            </View>
          </View>

          <View style={{ marginBottom: 26, marginTop: 26 }}>
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







//------------ statistique --------------------


function Stats(props) {

  const width = 200
  let note = props.note * 20

  return (
    <View style={{ height: 4, width: width, backgroundColor: '#ddd', marginLeft: 54, borderRadius: 4, marginBottom: 20 }}>
      <View style={{ height: 4, width: note, backgroundColor: color.primary.color, borderRadius: 4 }}></View>
    </View>
  )
}

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

/* <View style={{ paddingHorizontal: 16, height: 16 }}>
              <Start  voter={state.voter} />
            </View>*/