import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { ImageBody, HeaderAvatar, HeaderTitle, HeaderMore, Item, Category, HeaderShown, SkillDash, Paragraphe} from '../components/cardsComponent'
import { Button } from '../components/formComponent'
import Map from '../components/mapComponent'
import { experienceStorage } from '../helpers/experienceStorage'
import { trainingStorage } from '../helpers/trainingStorage'
import ExperienceChannelScreen from './ExperienceChannelScreen'
import TrainingChannelScreen from './TrainingChannelScreen'
import { ListItemsComponent } from '../components/ListItemsComponent'
import { Loading } from '../components/loadingComponent'
import { ScrollView } from 'react-native-gesture-handler'


import  { Start } from '../components/startComponent'

const color = require('../helpers/color.json') 
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const data = {coords: {
  "latitude": 0.5031368,
  "longitude": 9.4223535,
}}

export default function SkillsChannelScreen (props) {
  const [isLoading, setIsLoading] = useState(true)
  const [state, setState] = useState({})
  
  useEffect(() => {
    setState(props.route.params)
    setTimeout(() => {
      setIsLoading(false)
    }, 10)
  })


  const experienceScreen = (arg) => {
    return (
      <ExperienceChannelScreen data={arg} avatarUri={state.avatarUri}/>
    )
  }

  const trainingScreen = (arg) => {
    return (
      <TrainingChannelScreen data={arg} avatarUri={state.avatarUri}/>
    )
  }

  const render = (props) => {

    if(isLoading){
      return <View><Loading/></View>
    }

    return (
      <ScrollView onPress={() => setModalVisible(true)} style={{...styles.content, ...props.styleContent, height:'auto', backgroundColor:'#fff'}}>
        <ImageBody imageUri={state.imageUri} />
        <View style={{...styles.head}}>
          <HeaderAvatar avatarUri={state.avatarUri}/>
          <HeaderTitle title={state.title} subTitle={state.subTitle} />
          <HeaderMore/>
        </View>
        
        <View style={{marginBottom: 26}}>
            <View>
                <SkillDash experience={state.experience} training={state.training} recommendation={state.recommendation}/>
            </View>
            <View style={{paddingHorizontal:16, height:16}}>
                <Start note={state.note} voter={state.voter}/>
            </View>
        </View>
        <Paragraphe styleChild={{height:'auto', marginBottom: 20}}/>

        
        <View style={{...styles.foot, flexDirection:'row', height:'auto'}}>
          <View style={{flex:9, marginRight:10}}>
            <Button title="Lancer l'appel" />
          </View>
          <View style={{flex:3}}>
            <Button title='+' />
          </View>
        </View>

        <HeaderShown icon='md-person' title='Identité'/>
        <View>
            <Item marginLeft={54} title='Nom   :  Eric Gansa Diambote'/>
            <Item marginLeft={54} title='Sexe  :  Homme'/>
            <Item marginLeft={54} title='Age   :  28 ans'/>
        </View>

        <HeaderShown icon='md-stats' title='Statistique'/>
        <Item icon='md-star-outline' marginLeft={54} title='Services'/>
        <Stats note={4} />
        <Item icon='md-hourglass' marginLeft={54} title='Délais'/>
        <Stats note={10} />
        <Item icon='md-card' marginLeft={54} title='Prix'/>
        <Stats note={7} />
        <Item icon='md-heart-empty' marginLeft={54} title='Humanité'/>
        <Stats note={2} />

        <HeaderShown icon='md-pin' title='Moins 1km de vous'/>
        <View style={{flexDirection:'row'}}>
            <Item icon="md-walk" title='36 min'/>
            <Item icon="md-bicycle" title='23 min'/>
            <Item icon="md-car" title='10 min'/>
        </View>
        <View style={{height:200, marginBottom:20, }}>
            <Map coords={data.coords}/>
        </View>

        {/* Formation */}
        <HeaderShown icon='md-school' title='Formation'/>
        <ListItemsComponent callback={trainingScreen} data={trainingStorage} avatar={state.avatarUri}/>


        {/* Experience */}
        <HeaderShown icon='md-briefcase' title='Experience'/>
        <ListItemsComponent callback={experienceScreen} data={experienceStorage} avatar={state.avatarUri}/>
        

        

        {/* Autre competence */}
        <HeaderShown title='Autre competence'/>
        <View style={{height:132, marginBottom:20}}> 
            <ScrollView 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            >
            <Category title='Maçon' imageUri={require("../assets/avatar/macon.jpg")} />
            <Category title='Restaurant' imageUri={require("../assets/avatar/rest.jpg")} />
            <Category title='Mecanicien' imageUri={require("../assets/avatar/gara.jpg")} />
            </ScrollView>
        </View>
      </ScrollView>
    )
  }

  return (
    <View>{ render(props) }</View>
  )
}



function Stats(props) {

  const width = 200
  let note = props.note * 20

  return (
      <View style={{height:4,width: width, backgroundColor:'#ddd', marginLeft: 54, borderRadius: 4, marginBottom:20}}>
          <View style={{height:4,width:note, backgroundColor:color.primary.color, borderRadius: 4}}></View>
      </View>
  )
}

const styles = StyleSheet.create({
  content: {
    height:382, 
    backgroundColor:'#aaa', 
    //margin:8,
  },
  
  head: {
    flex:1,
    //height:72,
    backgroundColor:'#fff', 
    flexDirection:"row",
  },
  
  foot:{
    height:116,
    backgroundColor:'#fff',
    paddingHorizontal:16,
  },
});


/*
            <Category title='Boit de nuit' imageUri={require("../assets/avatar/fete.jpg")} />
            <Category title='Plombier' imageUri={require("../assets/avatar/plom.jpg")} />
            <Category title='Medecin' imageUri={require("../assets/avatar/medecin.jpg")} />           
            <Category title='Nounou' imageUri={require("../assets/avatar/nounou.jpg")} />
*/