import React, { useState } from 'react';
import {
  StyleSheet, View, StatusBar, ScrollView, SafeAreaView
} from 'react-native';

import { HeaderShown } from '../components/cardsComponent';
import UserSkillListe from '../components/UserSkillListeComponent';
import AddNewSkill from '../components/AddNewSkillComponent';
import { HeaderShownNavigations } from "../components/headerComponent"
import { useRecoilState } from 'recoil';
import { themeState } from '../store/atomes/theme';


export default function DeskScreen({ navigation }) {

  const [theme, setTheme] = useState('light');
  const [themeStyle, setThemeStyle] = useRecoilState(themeState);

  const navigationTab = [
    {
      title: "Mes competences",
      flag: true,
      root: 'Desk'
    },
    {
      title: "Mes Offre",
      flag: false,
      root: 'Offre'
    },
    {
      title: "Mes contrat",
      flag: false,
      root: 'Offre'
    }
  ]

  return (
    <View style={{ ...styles.container, backgroundColor: themeStyle.content }}>
      <SafeAreaView style={{ borderBottomColor: themeStyle.border, borderBottomWidth: 1 }}>
        <StatusBar backgroundColor={themeStyle.content} networkActivityIndicatorVisible={true} barStyle={theme == 'dark' ? 'light-content' : 'dark-content'} hidden={false} />
        <HeaderShownNavigations data={navigationTab} themes={theme} />
      </SafeAreaView>

      <ScrollView>
        <AddNewSkill />
        <UserSkillListe navigation={navigation} />
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






