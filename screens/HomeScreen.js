import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar, Dimensions, ScrollView } from 'react-native'

import { HeaderTitle } from '../components/cardsComponent'
import HeaderShownSearch from '../components/searchComponent'
import { SkillContent } from '../components/skillsCardsComponent'
import { SkillsSlide } from '../components/slideComponent'
import { Loading } from '../components/loadingComponent'


import { getSkills } from '../store/API/RatisseurApi'
import { Context } from '../store/configureStore'


import competenceData from '../helpers/competences'

const color = require('../helpers/color.json')
const windowWidth = Dimensions.get('window').width;

export default function CatalogScreen({ navigation }) {

  const [competenceArray, setCompetenceArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCompetenceArray(competenceData)
    setIsLoading(false)
  }, [competenceData])


  if (isLoading) {
    return <View><Loading /></View>
  }

  return (
    <>
      <View style={{ borderBottomColor: '#eee', borderBottomWidth: 1 }}>
        <StatusBar backgroundColor="#fff" networkActivityIndicatorVisible={true} barStyle='dark-content' hidden={false} />
        <HeaderShownSearch />
      </View>

      <ScrollView style={{ ...styles.container, backgroundColor: '#fff' }}>

        <View style={{ marginHorizontal: 20 }}>
          <HeaderTitle title='Les plus proche de vous' />
        </View>
        <SkillsSlide data={competenceData} />

        <View style={{ marginHorizontal: 20 }}>
          <HeaderTitle title='Les plus solicité' />
        </View>
        <SkillsSlide data={competenceData} />

        <View style={{ marginHorizontal: 20 }}>
          <HeaderTitle title='Nos propositions' />
        </View>
        <SkillContent data={competenceData} />

        <SkillsSlide data={competenceData} />

      </ScrollView>
    </>
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
    backgroundColor: '#fff',
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
    backgroundColor: '#fff',
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
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
})







/*
  const [state, dispatch] = useContext(Context)
  const [content, setContent] = useState(false);
  const [loading, response] = getSkills(state.compte.api_key);

  useEffect(() => {

     if (loading == false) {
       if (response.status == 200) {
         const skills = response.data.map((item) => {
           return <SkillsCards
             key={item.id}
             navigation={navigation}
             id={3} callback={SkillsScreen}
             imageUri={require("../assets/avatar/fete.jpg")} avatarUri={require("../assets/avatar/img1.jpg")}
             title={item.skills.name} subTitle='Okala, Akanda / Gabon'
             experience={6} training={2} recommendation={8}
             note={5} voter={1} />
         })
         setContent(skills);
       }
     }
   }, [loading])
  */

