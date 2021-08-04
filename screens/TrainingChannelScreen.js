import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Topbar, HeaderAvatar, HeaderTitle, Item, HeaderShown, Paragraphe } from '../components/cardsComponent'


export default function TrainingChannelScreen(props) {

    const data = props.data
    return (
        <View style={styles.content}>
            <Topbar />
            <ScrollView style={{ marginTop: 64 }}>
                <View style={styles.head}>
                    <HeaderAvatar avatarUri={props.avatarUri} />
                    <HeaderTitle title={data.title} subTitle={data.date} />
                </View>

                <Paragraphe text={data.description} styleChild={{ height: 'auto', marginVertical: 10 }} />

                <HeaderShown icon='md-star' title='Mention' />
                <View>
                    <Item marginLeft={54} title='Passable' />
                </View>

                <HeaderShown icon='md-business' title='Etablisement' />
                <View>
                    <Item marginLeft={54} title={data.entreprise} subTitle={data.adresse} />
                </View>

                <HeaderShown icon='md-calendar' title='Periode' />
                <View>
                    <Item marginLeft={54} title={data.end} />
                </View>

                {/* Realisation */}
                <HeaderShown icon='md-flask' title='Matière' />
                <View>
                    <Item marginLeft={54} title='Mathématique' subTitle='15/20' />
                    <Item marginLeft={54} title='Français' subTitle='15/20' />
                    <Item marginLeft={54} title='Philosophie' subTitle='12/20' />
                    <Item marginLeft={54} title='Physique' subTitle='16/20' />
                    <Item marginLeft={54} title='SVT' subTitle='8/20' />
                    <Item marginLeft={54} title='Anglais' subTitle='7/20' />
                    <Item marginLeft={54} title='Histoire Geographie' subTitle='19/20' />
                    <Item marginLeft={54} title='EPS' subTitle='14/20' />
                    <Item marginLeft={54} title='Conduite' subTitle='15/20' />
                </View>
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
    }
});