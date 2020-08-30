import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import Animated from 'react-native-reanimated'
import { TapGestureHandler, ScrollView, TouchableOpacity, BorderlessButton } from 'react-native-gesture-handler'
//import {Entypo} from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { ImageBody, HeaderAvatar, HeaderTitle, HeaderMore, Item, Category, HeaderShown, SkillDash, Paragraphe} from '../components/cardsComponent'


const { width, height } = Dimensions.get("window")
const heightBottomSheet = height-136
const color = require('../helpers/color.json') 


export default function AnimetedBottomSheetComponent ({ translateY }) {
    
    const infos = () => {
        return (
            <>
                <View style={{...styles.head, marginHorizontal:12}}>
                    <HeaderAvatar avatarUri={require("../assets/avatar/img1.jpg")}/>
                    <HeaderTitle title="Gansa Diambote" subTitle='Dispo dans 30 minute' />
                </View> 
                <ScrollView>
                    <View style={{marginHorizontal:20}}>
                        <HeaderShown icon='md-person' title='Identité'/>
                        <Item marginLeft={54} title='Sexe:     Hommme'/>
                        <Item marginLeft={54} title='Age:     42 ans'/>

                        <HeaderShown icon='md-call' title='Télephone'/>
                        <TouchableOpacity>
                            <Item marginLeft={54} title='+241 74609874'/>
                        </TouchableOpacity>

                        <HeaderShown icon='md-at' title='Email'/>
                        <TouchableOpacity>
                            <Item marginLeft={54} title='ericgansa01@gmail.com'/>
                        </TouchableOpacity>


                        <HeaderShown icon='md-bonfire' title='Competence'/>

                        <TouchableOpacity>
                            <Item marginLeft={54} title='Mathématicent' subTitle='Analyste'/>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Item marginLeft={54} title='Informaticien' subTitle='Dévelopeur web et mobile' />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Item marginLeft={54} title='Compositeur de musique' subTitle='Hip-Hop & RNB'/>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Item marginLeft={54} title='Infographe' subTitle='motion designe'/>
                        </TouchableOpacity>
                        
                        <HeaderShown icon='md-pin' title='Adresse'/>
                        <TouchableOpacity style={{marginBottom:40}}>
                            <Item marginLeft={54} title='Nzeng-Ayong' subTitle='Libreville / Gabon'/>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </>
        )
    }

    return(
        <>
            <Animated.View style={{...styles.bottomSeet, transform: [{ translateY: translateY }], zIndex:100}}>
                {infos()}
            </Animated.View>
        </>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    },
    bottomSeet:{
        position:"absolute",
        bottom:0,
        width:width,
        height:heightBottomSheet,
        backgroundColor:'#fff',
        borderTopLeftRadius:18,
        borderTopRightRadius:18,
        //alignItems:"center",
        //justifyContent:"center",
        elevation:4
    },
    head: {
        //flex:1,
        height:72,
        //backgroundColor:'red', 
        flexDirection:"row",
    },

})