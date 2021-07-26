import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, StatusBar, Dimensions, ScrollView, SafeAreaView } from 'react-native'
import { Category, HeaderTitle, HeaderShown, HeaderAvatarProfil, Paragraphe, DashItems } from '../components/cardsComponent'
import { Button } from '../components/formComponent'
import { Context } from '../store/configureStore'
import { useNavigation } from '@react-navigation/native'
import moment from "moment"

const color = require('../helpers/color.json')

const windowWidth = Dimensions.get('window').width;


export default function ProfilScreen() {

  const [state, dispatch] = useContext(Context)
  const navigation = useNavigation()
  const [theme, setTheme] = useState('ligth')
  const [themeStyle, setThemeStyle] = useState({
    content: '#fff',
    subContent: '#fff',
    color: '#000',
    border: '#eee',
    subColor: '#666'
  })


  useEffect(() => {
    if (theme == 'dark') {
      setThemeStyle({
        content: '#000',
        subContent: '#aaa',
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




  const ProfilHeader = ({ navigation, name, state }) => {

    let imgUri = require("../assets/avatar/img2.jpg")
    if (state.avatar) {
      imgUri = { uri: state.avatar }
    }
    let sexe = 'Femme'
    /*
    test du sex de l'individu
    if (state.identity.sexe) {
      sexe = 'Homme'
    }

    age 
    moment(state.identity.brithday).format("DD / MM / YYYY")
    */

    return (
      <View style={{ marginHorizontal: 20, paddingBottom: 20, borderBottomColor: themeStyle.border, borderBottomWidth: 1 }} >
        <View style={{ flexDirection: 'row', height: 128, alignItems: 'center', backgroundColor: themeStyle.content, borderBottomColor: themeStyle.border, borderBottomWidth: 1 }}>
          <HeaderAvatarProfil avatarUri={imgUri} />
          <View style={{ flex: 1, marginLeft: 20, height: 82 }} >
            <Text style={{ ...styles.headText, fontSize: 20, marginBottom: 4, color: themeStyle.color }}>{name}</Text>
            <Text style={{ fontSize: 13, marginBottom: 0, color: themeStyle.subColor }}>{"01/07/1994"}</Text>
            <Text style={{ fontSize: 13, marginBottom: 8, color: themeStyle.subColor }}>{sexe}</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginVertical: 20, backgroundColor: themeStyle.content, position: "relative" }}>
          <DashItems theme={theme} note='500' title='Reco' icon='md-star' />
          <DashItems theme={theme} note='02' title='Avis' icon='md-heart' />
          <DashItems theme={theme} note='15' title='Abon' icon='md-phone-portrait' />
          <DashItems theme={theme} note='102' title='Real' icon='md-color-wand' end={true} />
        </View>
        <View style={{ flexDirection: 'row', height: 'auto' }}>
          <View style={{ flex: 1 }}>
            <Button title='Gere vos abonements' onPress={() => {
              if (theme == 'dark') {
                setTheme('light')
              } else {
                setTheme('dark')
              }
            }} />
          </View>
        </View>
      </View>
    )
  }


  const ProfilBody = ({ navigation, name, state }) => {
    return (
      <View style={{ marginHorizontal: 20, paddingBottom: 20, borderBottomColor: themeStyle.border, borderBottomWidth: 1 }} >

        <HeaderTitle title={'Votre biographie'} color={themeStyle.color} />
        <Paragraphe styleChild={{ height: 'auto', paddingBottom: 30, borderBottomColor: themeStyle.border, borderBottomWidth: 1 }} style={{ color: themeStyle.subColor }} />

        <HeaderTitle title={'Vos contact'} color={themeStyle.color} />
        <View style={{ paddingBottom: 30, borderBottomColor: themeStyle.border, borderBottomWidth: 1 }}>
          {
            state.contact &&
            <>
              <Text style={{ fontSize: 14, marginBottom: 8, color: themeStyle.subColor }}>{'+241 ' + state.contact.phone}</Text>
              <Text style={{ fontSize: 14, marginBottom: 8, color: themeStyle.subColor }}>{state.contact.email}</Text>
            </>
          }
        </View>

        <HeaderTitle title={'Vos adresse'} color={themeStyle.color} />
        <View style={{ paddingBottom: 30 }}>
          <Text style={{ fontSize: 14, marginBottom: 8, color: themeStyle.subColor }}>{'Agondje Chateau, Akanda / Gabon'}</Text>
        </View>
      </View>
    )
  }

  return (

    <View style={{ ...styles.container, backgroundColor: themeStyle.content }}>
      <SafeAreaView style={{ borderBottomColor: themeStyle.border, borderBottomWidth: 1 }}>
        <StatusBar backgroundColor={themeStyle.content} networkActivityIndicatorVisible={true} barStyle={theme == 'dark' ? 'light-content' : 'dark-content'} hidden={false} />
        <HeaderShown theme={theme} title="Profil" iconRight='md-settings' callbackRight={() => {
          navigation.navigate('Settings')
        }} />
      </SafeAreaView>

      <ScrollView >
        <ProfilHeader name={'Gansa eric'} navigation={navigation} state={state} />
        <ProfilBody name={'Gansa eric'} navigation={navigation} state={state} />
      </ScrollView>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#ddd',
  },
  content: {
    height: 382,
    backgroundColor: '#aaa',
    //margin:8,
  },
  content2: {
    height: 446,
    backgroundColor: '#aaa',
    //margin:8,
  },
  content3: {
    height: 188,
  },

  head: {
    flex: 1,
    //height:72,
    backgroundColor: '#fff',
    flexDirection: "row",
  },
  headAvatarContent: {
    height: 72,
    width: 72,
    //backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center",
  },
  headAvatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: color.primary.color,
  },
  headerTextContent: {
    flex: 1,
    //backgroundColor: '#fff',
    paddingVertical: 16,
    paddingRight: 16,
  },
  headText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  headSubText: {
    color: '#888'
  },
  body: {
    height: 194,
  },
  bodyImage: {
    flex: 1,
    //height:194,
    width: windowWidth
  },
  foot: {
    height: 116,
    //backgroundColor:'#fff',
    paddingHorizontal: 16,
  },
});