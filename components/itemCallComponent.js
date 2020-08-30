import React, { useState, useRef }  from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { HeaderAvatar, HeaderTitle } from './cardsComponent'
import { Ionicons } from '@expo/vector-icons';
import Animated, { Transition, Transitioning } from 'react-native-reanimated'
import { BorderlessButton, TapGestureHandler } from 'react-native-gesture-handler'

const color = require('../helpers/color.json') 
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ItemCalls ({ item, gestureHandler }){ 

    const transition = (
        <Transition.Sequence>
          <Transition.Out type="slide-right" /> 
          <Transition.Change interpolation="easeInOut" />
          <Transition.In type="slide-right" />
        </Transition.Sequence>
    );

    
    
    const ref = useRef();
    
    let [perc, setPerc] = useState(true);
    let subTitle = 'Pas de contact définit'
    let image = require("../assets/avatar/img1.jpg")
    let lastphoneNumber = ''


    if (item.phoneNumbers) {
        subTitle = false
        item.phoneNumbers.map((val) => {
            let phoneNumbers = val.number.replace(/ /g,"")
            if(lastphoneNumber != phoneNumbers) {
                if(subTitle) {
                    subTitle = subTitle +  '    -    '  + phoneNumbers
                } else {
                    subTitle = phoneNumbers
                }
            lastphoneNumber = phoneNumbers
            } 
        })
    }
    
    if (item.imageAvailable) {
        image = {uri : item.image.uri}    
    }

    const HandelLongPress = () => {
        return (
            <>
                <BorderlessButton borderless={true} onPress={() => {
                    ref.current.animateNextTransition()
                    setPerc(!perc)
                }}>
                    <View style={{ marginLeft:12, height:44, width:44, marginTop:15, borderRadius:36, justifyContent:"center", alignItems:"center"}}>
                        <Ionicons name='md-arrow-round-back' color='#000' size={20}/>
                    </View>
                </BorderlessButton>

                <View style={{flex:1, flexDirection:"row", paddingHorizontal:10, paddingTop:15}}>

                    <BorderlessButton style={{ flex:1, height:44, width:44, borderRadius:36, justifyContent:"center", alignItems:"center"}} borderless={true} onPress={() => {
                        ref.current.animateNextTransition();                        
                    }}>
                        <Ionicons name='md-call' color={color.primary.color} size={20}/>
                    </BorderlessButton>
                    <BorderlessButton style={{ flex:1, height:44, width:44, borderRadius:36, justifyContent:"center", alignItems:"center"}} borderless={true} onPress={() => {
                        ref.current.animateNextTransition();                        
                    }}>
                        <Ionicons name='md-text' color='orange' size={20}/>
                    </BorderlessButton>
                    <BorderlessButton style={{ flex:1, height:44, width:44, borderRadius:36, justifyContent:"center", alignItems:"center"}} borderless={true} onPress={() => {
                        ref.current.animateNextTransition();                        
                    }}>
                        <Ionicons name='md-create' color='#888' size={20}/>
                    </BorderlessButton>
                    <BorderlessButton style={{ flex:1, height:44, width:44, borderRadius:36, justifyContent:"center", alignItems:"center"}} borderless={true} onPress={() => {
                        ref.current.animateNextTransition();                        
                    }}>
                        <Ionicons name='md-trash' color='red' size={20}/>
                    </BorderlessButton>
                    <BorderlessButton style={{ flex:1, height:44, width:44, borderRadius:36, justifyContent:"center", alignItems:"center"}} borderless={true} onPress={() => {
                        ref.current.animateNextTransition();                        
                    }}>
                        <Ionicons name='md-information-circle-outline' color='#000' size={22}/>
                    </BorderlessButton>
                
                    
                </View>
            </>
        )
    }

    

    const Body = () => {
        return (
            <>
                <BorderlessButton borderless={true}>
                    <View style={{ marginLeft:12, height:44, width:44, marginTop:15, borderRadius:36, justifyContent:"center", alignItems:"center"}}>
                        <Ionicons name='md-call' size={16} color='#000'></Ionicons>
                    </View>
                </BorderlessButton>
                <TapGestureHandler {...gestureHandler }>
                    <Animated.View style={{...styles.head, height:72, width: (windowWidth-102)}}>
                        <HeaderAvatar avatarUri={image} />
                        <HeaderTitle numberOfLines={1}  subNumberOfLines={1}  title={ item.name  } subTitle={subTitle} />
                    </Animated.View>
                </TapGestureHandler>
                <BorderlessButton borderless={true} onPress={() => {
                    ref.current.animateNextTransition();
                    setPerc(!perc);
                }}>
                    <View style={{height:44, width:44, marginTop:16, justifyContent:"center", alignItems:"center"}}>
                        <Ionicons name='md-more' size={18} color='#000'></Ionicons>
                    </View>
                </BorderlessButton>
            </>
        )
    }
    
    return (
        <Transitioning.View ref={ref} transition={transition} >
            <View style={{...styles.head, height:72, backgroundColor:'#fff'}}>
                { 
                    perc 
                    ? 
                    <Body/> 
                    : 
                    <HandelLongPress/>   
                }   
            </View>
        </Transitioning.View>
    )
}


const styles = StyleSheet.create({
    head: {
      //flex:1,
      //backgroundColor:'#fff', 
      flexDirection:"row",
    }
});