import React, { useState, useContext, useEffect, memo, useCallback } from 'react';
import {
  StyleSheet, View, StatusBar, Text, Dimensions,
  TouchableOpacity, ScrollView, SafeAreaView, Modal
} from 'react-native';
import { Context } from '../store/configureStore';
import { Ionicons } from '@expo/vector-icons';
import { HeaderShown, HeaderTitle, Category } from '../components/cardsComponent';
import UserSkillListe from '../components/UserSkillListeComponent';
import AddNewSkill from '../components/AddNewSkillComponent';
import { SkillsAbstraction } from '../components/settings/skills/AddComponent';
import { getUserSkill } from '../store/API/RatisseurApi';
import { useRecoilState } from 'recoil';
import { themeState } from '../store/atomes/theme';

const color = require('../helpers/color.json')
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function HomeScreen({ navigation }) {

  console.log('----------------------------------- Start competence screen --------------------------------');
  const [theme, setTheme] = useState('light');
  const [themeStyle, setThemeStyle] = useRecoilState(themeState);

  return (
    <View style={{ ...styles.container, backgroundColor: themeStyle.content }}>
      <SafeAreaView style={{ borderBottomColor: themeStyle.border, borderBottomWidth: 1 }}>
        <StatusBar backgroundColor={themeStyle.content} networkActivityIndicatorVisible={true} barStyle={theme == 'dark' ? 'light-content' : 'dark-content'} hidden={false} />
        <HeaderShown title="Compétence" theme={theme} />
      </SafeAreaView>

      <ScrollView>
        <AddNewSkill />
        <UserSkillListe />
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






