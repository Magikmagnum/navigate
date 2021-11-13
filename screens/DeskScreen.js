import React, { useState } from 'react';
import { StyleSheet, View, StatusBar, ScrollView, SafeAreaView } from 'react-native';

import UserSkillListe from '../components/UserSkillListeComponent';
import AddNewSkill from '../components/AddNewSkillComponent';
import { useRecoilState } from 'recoil';
import { themeState } from '../store/atomes/theme';


export default function DeskScreen({ navigation }) {

  const [theme, setTheme] = useState('light');
  const [themeStyle, setThemeStyle] = useRecoilState(themeState);


  return (
    <View style={{ ...styles.container, backgroundColor: themeStyle.content }}>
      <SafeAreaView style={{ borderBottomColor: themeStyle.border, borderBottomWidth: 1 }}>
        <StatusBar backgroundColor={themeStyle.content} networkActivityIndicatorVisible={true} barStyle={theme == 'dark' ? 'light-content' : 'dark-content'} hidden={false} />
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






