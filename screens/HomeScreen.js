import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar, Dimensions, } from 'react-native'

import { Category, HeaderTitle, HeaderShownSearch } from '../components/cardsComponent'
import { Context } from '../store/configureStore'
import SkillsChannelScreen from './skillsChannelScreen'
import { SkillsCards } from '../components/skillsCardsComponent'
import { SkillsSlide } from '../components/slideComponent'
import { getSkills } from '../store/API/RatisseurApi'


import { ScrollView } from 'react-native-gesture-handler'



const color = require('../helpers/color.json')
const windowWidth = Dimensions.get('window').width;

export default function CatalogScreen({ navigation }) {

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
        <SkillsSlide />

        <View style={{ marginHorizontal: 20 }}>
          <HeaderTitle title='Les plus solicité' />
        </View>
        <SkillsSlide />

        <View style={{ marginHorizontal: 20 }}>
          <HeaderTitle title='Nos propositions' />
        </View>
        <SkillsCards
          navigation={navigation}
          id={1}
          imageUri={require("../assets/avatar/rest.jpg")} avatarUri={require("../assets/avatar/img3.jpg")}
          title='Traiteur' subTitle='Nzeng-Ayong, Libreville / Gabon'
          experience={52} training={102} recommendation={3}
          note={3} voter={3}
        />
        <SkillsCards
          navigation={navigation}
          id={2}
          imageUri={require("../assets/avatar/nounou.jpg")} avatarUri={require("../assets/avatar/img5.jpg")}
          title='Nounou' subTitle='Charbonnages, Libreville / Gabon'
          experience={6} training={2} recommendation={8}
          note={5} voter={1}
        />

        <SkillsSlide />

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