import React, { useContext } from 'react'
import { StyleSheet, View, StatusBar, Dimensions, SafeAreaView, SectionList, Text, AsyncStorage } from 'react-native'
import { HeaderAvatarProfil, HeaderTitle } from '../../components/cardsComponent'
import { Header5, HeaderShown } from '../../components/typoComponent'
import { Context } from '../../store/configureStore'
import { TouchableOpacity } from "react-native-gesture-handler"
import ModalComponent from "../../components/settings/ModalComponent"
import { useNavigation } from '@react-navigation/native'

import { AvatarModify } from "../../components/settings/avatar/ModifyComponent"
import { IdentityModify } from "../../components/settings/identity/ModifyComponent"
import { CompteModify } from "../../components/settings/compte/ModifyComponent"
import { CompteDelete } from "../../components/settings/compte/DeleteComponent"


const color = require('../../helpers/color.json')

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function SettingsScreen() {

  const [state, dispatch] = useContext(Context)
  const navigation = useNavigation()

  const DATA = [
    {
      title: 'Identité',
      data: [
        {
          title: 'Modifier votre Photo de profil',
          path: AvatarModify,
          item: false
        },
        {
          title: 'Modifier votre identité',
          path: IdentityModify,
          item: false
        },
        {
          title: 'Qui peux voir votre identité',
          path: IdentityModify,
          item: false
        },

      ],
    },
    {
      title: 'Contact',
      data: [
        {
          title: "Modifier l'e-mail",
          path: '',
          item: false
        },
        {
          title: 'Modifier le télephone',
          path: '',
          item: false
        },
        {
          title: 'Qui peux voir vos contact',
          path: '',
          item: false
        },
      ],
    },
    {
      title: 'Adresse et localisation',
      data: [
        {
          title: 'Water',
          path: '',
          item: false
        },
        {
          title: 'Coke',
          path: '',
          item: false
        },
        {
          title: 'Beer',
          path: '',
          item: false
        },
      ],
    },
    {
      title: 'Competence',
      data: [
        {
          title: 'Water',
          path: '',
          item: false
        },
        {
          title: 'Coke',
          path: '',
          item: false
        },
        {
          title: 'Beer',
          path: '',
          item: false
        },
      ],
    },
    {
      title: 'Compte',
      data: [
        {
          title: 'Deconnexion',
          path: 'Logout',
          item: true
        },
        {
          title: 'Modifier votre compte',
          path: CompteModify,
          item: false
        },
        {
          title: 'Supprimer votre compte',
          path: CompteDelete,
          item: false
        },
      ],
    },
    {
      title: 'Ratisseur',
      data: [
        {
          title: 'Faite nous une subjetion',
          path: '',
          item: false
        },
        {
          title: 'Apropos de Ratisseur',
          path: '',
          item: false
        },
      ],
    },
  ];


  const itemListeCheck = (data) => {
    if (data.item === false) {
      return (
        <ModalComponent data={data} callback={data.path} />
      )
    } else {
      return (
        <TouchableOpacity style={styles.itemListeCheck}
          onPress={() => {
            if (data.path == 'Logout') {
              logout()
              navigation.reset({
                index: 0,
                routes: [{ name: 'SignIn' }],
              })
            } else {
              navigation.navigate(data.path)
            }
          }}
        >
          <HeaderTitle
            title={data.title}
            subTitle="sur l'itinéraire ou en faisant glisser horizontalement. Les transitions sont animées par défaut. Les composants d'écran pour chaque itinéraire sont montés immédiatement."
          />

        </TouchableOpacity>
      )
    }
  }


  async function logout() {
    await dispatch({ type: 'DELETE_COMPTE' });
  }


  const renderHeader = () => {

    let imgUri = require("../../assets/avatar/img2.jpg")
    if (state.avatar) {
      imgUri = { uri: state.avatar }
    }

    return (
      <TouchableOpacity style={{ height: 120, alignItems: 'center', justifyContent: 'center', borderBottomColor: '#eee', borderBottomWidth: 1, backgroundColor: '#fff' }}>
        <HeaderAvatarProfil avatarUri={imgUri} />
      </TouchableOpacity>
    )
  }


  const renderSeparator = () => {
    return (
      <View style={{ height: 1, width: "100%", backgroundColor: "#eee", marginLeft: 32 }} />
    )
  }


  return (
    <View style={{ ...styles.container, backgroundColor: '#fff', paddingBottom: 0 }}>
      <SafeAreaView style={{ borderBottomColor: '#eee', borderBottomWidth: 1 }} >
        <StatusBar backgroundColor="#fff" networkActivityIndicatorVisible={true} barStyle='dark-content' hidden={false} />
        <HeaderShown title="Paramètres" />
      </SafeAreaView>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={({ section: { title } }) => <Text style={{ padding: 20, fontSize: 14, fontWeight: 'bold', backgroundColor: '#fff', color: color.primary.color }}>{title}</Text>}
        ListHeaderComponent={renderHeader()}
        renderItem={({ item }) => itemListeCheck(item)}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  itemListeCheck: {
    paddingVertical: 18,
    paddingHorizontal: 32,
  },
});