import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image, Dimensions, Modal, CheckBox } from 'react-native';
import { ImageBody, HeaderAvatar, HeaderTitle, HeaderMore, Item, Category, HeaderShown, SkillDash, Paragraphe, Cards4} from '../components/cardsComponent'
import  { Start } from '../components/startComponent'
import { Ionicons } from '@expo/vector-icons'
import { BorderlessButton, BaseButton, ScrollView, TouchableOpacity, RectButton } from 'react-native-gesture-handler'



function Liseter (props) {

    const [modalVisible, setModalVisible] = React.useState(false)
    const [settingVisible, setSettingVisible] = React.useState(false)

    const HandelLongPress = () => {
        return (
            <View style={{ height:64, marginLeft: 54,flexDirection:"row", alignItems:"center" }}>
                <BorderlessButton onPress={() => setSettingVisible(false)}><Ionicons style={{ paddingHorizontal: 20, marginRight:40 }} name='md-arrow-round-back' color='#666' size={18} /></BorderlessButton>
                <BorderlessButton onPress={() => console.log('Modifier')}><Ionicons style={{ paddingHorizontal: 20 }} name='md-create' color='green' size={18} /></BorderlessButton>
                <BorderlessButton onPress={() => console.log('Supprimer')}><Ionicons style={{ paddingHorizontal: 20 }} name='md-trash' color='red' size={18} /></BorderlessButton>
            </View>
        )
    }

    const Render = () => {
        return (
            <RectButton onPress={() => setModalVisible(true)} onLongPress={() => {props.admin ? setSettingVisible(true) : false }}>
                <Item marginLeft={54} title={props.data.title} subTitle={props.data.entreprise + '    -    ' + props.data.end}/>
                <Modal
                        presentationStyle="overFullScreen"
                        animationType="slide"
                        hardwareAccelerated={true}
                        visible={modalVisible}
                        onRequestClose={() =>  setModalVisible(false)}
                    >
                        { modalVisible ? props.callback(props.data) : false} 
                </Modal> 
            </RectButton>
        )
    }

    return (
        <View>
            { settingVisible ? HandelLongPress() : Render() }
        </View>
    )
}

export function ListItemsComponent (props) {
    
    const data = props.data
    return (
        <View style={{}}>
            {data.map((item, index) =>{
                return <Liseter key={item.id} data={item} callback={props.callback} admin={true} />
            })}
        </View>
    )
}


        