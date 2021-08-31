import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar, Dimensions, ScrollView, Text } from 'react-native'
import { State } from 'react-native-gesture-handler'

import { HeaderTitle } from '../components/cardsComponent'
import HeaderShownSearch from '../components/searchComponent'
import { SkillContent } from '../components/skillsCardsComponent'
import { SkillsSlide } from '../components/slideComponent'
import { Loading } from '../components/loadingComponent'
import Animated, { cond, eq, useCode, Value, set, not, interpolate } from 'react-native-reanimated';
import AnimetedBottomSheetComponent from '../components/AnimetedBottomSheetComponent';
import { withTransition } from 'react-native-redash';


import { getSkills } from '../store/API/RatisseurApi'
import { Context } from '../store/configureStore'


import competenceData from '../helpers/competences';

const color = require('../helpers/color.json');
const windowWidth = Dimensions.get('window').width;
const windowsHeight = Dimensions.get('window').height;

//const { Value } = Animated;
const heightBottomSheet = windowsHeight - 200;


export default function deskScreen() {

  const [competenceArray, setCompetenceArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //const translateY = new Value(heightBottomSheet);
  const state = new Value(State.UNDETERMINED);
  const isOpen = new Value(0);

  const transition = withTransition(isOpen);
  translateY = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [heightBottomSheet, 0],
  });

  const zIndex = interpolate(translateY, {
    inputRange: [0, 299, heightBottomSheet],
    outputRange: [1, 1, -1],
  });

  useCode(() =>
    cond(
      eq(state, State.END),
      set(isOpen, not(isOpen))
    ),
    [state, isOpen]
  );



  //console.log(zIndex)

  useEffect(() => {
    setCompetenceArray(competenceData);
    setIsLoading(false);
  }, [competenceData]);


  if (isLoading) {
    return <View><Loading /></View>
  }

  return (
    <>
      <View style={{ borderBottomColor: '#eee', borderBottomWidth: 1 }}>
        <StatusBar backgroundColor="#fff" networkActivityIndicatorVisible={true} barStyle='dark-content' hidden={false} />
        <HeaderShownSearch
          gesturHandler={{
            onHandlerStateChange: Animated.event([{
              nativeEvent: { state }
            }])
          }} />
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

      <AnimetedBottomSheetComponent
        zIndex={zIndex}
        translateY={translateY}
        height={heightBottomSheet}
        gesturHandler={{
          onHandlerStateChange: Animated.event([{
            nativeEvent: { state }
          }])
        }}>

      </AnimetedBottomSheetComponent>

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

