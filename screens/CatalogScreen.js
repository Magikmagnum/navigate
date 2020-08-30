import React, { useState, useContext, useEffect, memo, useCallback } from 'react';
import {
  StyleSheet, View, StatusBar, Text, Dimensions,
  TouchableOpacity, ScrollView, SafeAreaView, Modal
} from 'react-native';
import { Context } from '../store/configureStore'
import { Ionicons } from '@expo/vector-icons'
import { HeaderShown, HeaderTitle, Category } from '../components/cardsComponent'
import { SkillsAbstraction } from '../components/settings/skills/AddComponent'

import { getUserSkill } from '../store/API/RatisseurApi'

const color = require('../helpers/color.json')
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function HomeScreen({ navigation }) {

  const [state, dispatch] = useContext(Context)
  const [modalVisible, setModalVisible] = useState(false)
  const [yourSkills, setYourSkills] = useState(false)

  const [theme, setTheme] = useState('light')
  const [themeStyle, setThemeStyle] = useState({
    content: '#fff',
    subContent: '#fff',
    color: '#000',
    border: '#eee',
    subColor: '#666'
  })

  getUserSkill(state.compte.api_key)
    .then((result) => {
      console.log('competence', result.data)
    })
    .catch((e) => {
      console.log(e)
    })

  useEffect(() => {
    if (theme == 'dark') {
      setThemeStyle({
        content: '#000',
        subContent: '#444',
        color: '#fff',
        border: '#444',
        subColor: '#bbb'
      })
    } else {
      setThemeStyle({
        content: '#fff',
        subContent: '#fff',
        color: '#000',
        border: '#eee',
        subColor: '#666'
      })
    }
  }, [theme])

  useEffect(() => {
    const skills = state.userSkills.map((item) => {
      return <SkillIteme title={item.skills.name} key={item.id} imageUri={require("../assets/avatar/fete.jpg")} />
    })
    setYourSkills(skills)

  }, [state])

  const skillsAbstractionCallback = useCallback(SkillsAbstraction({}, setModalVisible), [])
  const AddSkill = memo(() => {
    return (
      <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={{ height: 100, width: 100, borderColor: '#aaa', borderRadius: 12, elevation: 3, backgroundColor: themeStyle.subContent, alignItems: "center", justifyContent: 'center' }}>
          <Text style={{ fontSize: 36, fontWeight: 'bold', color: color.primary.color }}> + </Text>
        </TouchableOpacity>
        <Modal
          presentationStyle='pageSheet'
          animationType="slide"
          hardwareAccelerated={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          {modalVisible ? skillsAbstractionCallback : false}
        </Modal>
      </View>
    )
  }, [])


  const SkillIteme = ({ title, imageUri }) => {
    return (
      <TouchableOpacity style={{ marginBottom: 20, flexDirection: 'row' }}>
        <Category imageUri={imageUri} />
        <View style={{ flexDirection: 'column', marginHorizontal: 20, flex: 1 }}>
          <Text style={{ fontWeight: 'bold', color: themeStyle.color }}>{title}</Text>
          <Text style={{ fontSize: 13, color: '#222', color: themeStyle.subColor }}>Agondje</Text>

        </View>
      </TouchableOpacity>
    )
  }


  return (
    <View style={{ ...styles.container, backgroundColor: themeStyle.content }}>

      <SafeAreaView style={{ borderBottomColor: themeStyle.border, borderBottomWidth: 1 }}>
        <StatusBar backgroundColor={themeStyle.content} networkActivityIndicatorVisible={true} barStyle={theme == 'dark' ? 'light-content' : 'dark-content'} hidden={false} />
        <HeaderShown title="Compétence" theme={theme} />
      </SafeAreaView>

      <ScrollView>
        <View style={{}}>
          <View style={{ marginHorizontal: 20 }}>
            <HeaderTitle color={themeStyle.color} subColor={themeStyle.subColor} title='Ajouter une competence' subTitle="Ajouter une competence à votre compte vous permet d'aparaitre et de vendre vos competence dans le catalogue Ratisseur comme." />
          </View>
          <AddSkill />
        </View>

        <View style={{}}>
          <View style={{ marginHorizontal: 20 }}>
            <HeaderTitle color={themeStyle.color} subColor={themeStyle.subColor} title='Administré vos competence' subTitle="Ici vous pouvez administre vos competence." />
          </View>
          {yourSkills}
        </View>
      </ScrollView>

    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#ddd',
  }
});




