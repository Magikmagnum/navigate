import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, StatusBar, Dimensions, ScrollView, FlatList, SafeAreaView, Image, Modal } from 'react-native'
import { HeaderAvatarProfil, HeaderMore, Paragraphe } from '../../components/cardsComponent'
import { Context } from '../../store/configureStore'
import { HeaderShown } from '../../components/typoComponent'
import ModalComponent from '../../components/settings/ModalComponent'
import ModifyComponent from '../../components/settings/compte/ModifyComponent'
import DeleteComponent from '../../components/settings/compte/DeleteComponent'

import { Ionicons } from '@expo/vector-icons';

const color = require('../../helpers/color.json')

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function SettingsCompteScreen({ navigation }) {

  const [state, dispatch] = useContext(Context)

  const settings = [
    {
      id: 1,
      title: 'Changer de mot de passe',
      path: 'PUT'
    },
    {
      id: 6,
      title: 'Supprimer votre compte',
      path: 'DELETE'
    }
  ]


  const callback = (data, setModalVisible) => {
    if (data.path == 'PUT') {
      return <ModifyComponent setModalVisible={setModalVisible} navigation={navigation} />
    }
    if (data.path == 'DELETE') {
      return <DeleteComponent setModalVisible={setModalVisible} navigation={navigation} />
    }
  }

  const renderSeparator = () => {
    return (
      <View style={{ height: 1, width: "100%", backgroundColor: "#eee", marginLeft: 32 }} />
    )
  }

  return (
    <View style={{ ...styles.container, backgroundColor: '#fff' }}>
      <StatusBar backgroundColor="#fff" networkActivityIndicatorVisible={true} barStyle='dark-content' hidden={false} />
      <View style={{ borderBottomColor: '#eee', borderBottomWidth: 1 }}>
        <HeaderShown title="Paramètres de compte" icon='md-arrow-back' callback={(() => navigation.goBack())} />
      </View>
      <FlatList
        data={settings}
        renderItem={({ item }) => <ModalComponent data={item} callback={callback} />}
        keyExtractor={(item) => item.id.toString()}
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
