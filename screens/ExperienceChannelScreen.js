import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Topbar, HeaderAvatar, HeaderTitle, Item, HeaderShown, Paragraphe } from '../components/cardsComponent'
import { Start } from '../components/startComponent'
import { ExperienceSlide } from '../components/slideComponent'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'


const color = require('../helpers/color.json')

export default function ExperienceChannelScreen(props) {



    const data = props.data
    //const [opendAvis, setOpendAvis] = React.useState(72)


    const LitelTouche = (props) => {
        return (
            <TouchableOpacity style={{ backgroundColor: color.primary.color, marginHorizontal: 4, borderRadius: 100, height: 20, width: 40, alignItems: 'center' }} >
                <Text style={{ fontSize: 12, color: '#fff' }}>{props.title}</Text>
            </TouchableOpacity>
        )
    }

    const Comentaire = () => {
        return (
            <View style={{ backgroundColor: '#e6e6e6' }}>
                <View style={styles.head}>
                    <HeaderAvatar avatarUri={data.avatarUri} />
                    <HeaderTitle title='Kassassa Divin' />
                </View>
                <View style={{ marginHorizontal: 16, marginBottom: 8 }}>
                    <Start note={4} message={data.date} />
                </View>
                <Paragraphe />
                <View style={{ justifyContent: 'center', marginHorizontal: 16, marginBottom: 8, height: 42 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 12, color: '#888', marginRight: 20 }}>Avez vous trouvez cette avis utile?</Text>
                        <LitelTouche title='Oui' />
                        <LitelTouche title='Non' />
                    </View>
                </View>
            </View>

        )
    }

    /*const toggleAvis = () => {
        let height = 72
        if(opendAvis == height) {
            height = 300
        }
        setOpendAvis(height)
    }*/


    return (
        <View style={styles.content}>
            <Topbar />
            <ScrollView style={{ marginTop: 64 }}>
                <View style={styles.head}>
                    <HeaderAvatar avatarUri={props.avatarUri} />
                    <HeaderTitle title={data.title} subTitle={data.date} />
                </View>
                <View style={{ marginHorizontal: 16, marginBottom: 8 }}>
                    <Start note={data.note} voter={data.voter} />
                </View>
                <Paragraphe text={data.description} styleChild={{ height: 'auto', marginVertical: 10 }} />
                <HeaderShown icon='md-business' title='Entreprise / Particulier' />
                <View>
                    <Item marginLeft={54} title={data.entreprise} subTitle={data.adresse} />
                </View>
                <HeaderShown icon='md-calendar' title='Periode' />
                <View>
                    <Item marginLeft={54} title={'Début :    ' + data.start} />
                    <Item marginLeft={54} title={'Fin :    ' + data.end} />
                </View>

                {/* Realisation */}
                <HeaderShown icon='md-construct' title='Réalisation' />
                <ExperienceSlide callback={() => alert('coucou')} />
            </ScrollView>
        </View>
    )
}



const styles = StyleSheet.create({
    content: {
        flexDirection: "column",
        height: 'auto',
        backgroundColor: '#fff',
    },
    head: {
        height: 72,
        //backgroundColor:'#fff', 
        flexDirection: "row",
    },
    foot: {
        height: 116,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
});

/*


<View style={{position:"absolute", bottom:0, height: opendAvis, width:windowWidth, backgroundColor:'transparent' }}>
                <View style={{flex:1, borderTopLeftRadius:32, borderTopRightRadius:32, elevation:4, paddingHorizontal:16, backgroundColor:'#fff'}}>
                    <TouchableOpacity onPress={() => toggleAvis()} style={{flexDirection:"row", alignItems:"center", marginVertical:14}}>
                        <View style={{height:46, width:46, borderRadius:23, fontWeight:'bold', backgroundColor:color.primary.color, justifyContent:"center", alignItems:"center", marginRight:32}}><Text style={{fontSize:24}}>{opendAvis==72 ? '+' : '-'}</Text></View>
                        <View style={{flex:1}}><Text style={{fontSize:16, marginLeft:24, fontWeight:'bold'}}>Ajouter votre avis</Text></View>
                    </TouchableOpacity>
                </View>
            </View>


<ImageBody imageUri={data.imageUri} />
                    <View style={{flexDirection:"row", height:64, backgroundColor:'#fff', position:"relative"}}>
                        <TouchableOpacity style={{width:64, height:64, backgroundColor:'#fff', justifyContent:"center", alignItems: "center", alignContent:"space-between", position:'absolute', right:0}}>
                            <Ionicons name="md-share-alt" size={22} />
                        </TouchableOpacity>
                    </View>

                    <Comentaire/>
                    <Comentaire/>
                    <Comentaire/>








            <View style={{flexDirection:"row", height:64, backgroundColor:'#fff', position:"relative"}}>
            <TouchableOpacity style={{width:64, height:64, backgroundColor:'#fff', justifyContent:"center", alignItems: "center"}}>
                <Ionicons name="md-star" size={22} />
            </TouchableOpacity>
            <TouchableOpacity style={{width:64, height:64, backgroundColor:'#fff', justifyContent:"center", alignItems: "center"}}>
                <Ionicons name="md-chatbubbles" size={22} />
            </TouchableOpacity>
            <TouchableOpacity style={{width:64, height:64, backgroundColor:'#fff', justifyContent:"center", alignItems: "center"}}>
                <Ionicons name="md-share-alt" size={22} />
            </TouchableOpacity>
            <TouchableOpacity style={{width:64, height:64, backgroundColor:'#fff', justifyContent:"center", alignItems: "center", alignContent:"space-between", position:'absolute', right:0}}>
                <Ionicons name="ios-bookmark" size={22} />
            </TouchableOpacity>
            </View>
*/