import React, { useState } from 'react';
import {
    StyleSheet, View, StatusBar, ScrollView, SafeAreaView, Text
} from 'react-native';
import { HeaderShown, HeaderAvatar, ImageContent } from '../components/cardsComponent';
import { useRecoilState } from 'recoil';
import { themeState } from '../store/atomes/theme';
import { yourskillState } from '../store/atomes/yourskill';
import { Start } from '../components/startComponent'



export default function YourSkillScreen() {

    const [theme, setTheme] = useState('light');
    const [themeStyle, setThemeStyle] = useRecoilState(themeState);
    const [nextSkillView, setNextSkillView] = useRecoilState(yourskillState);

    console.log(nextSkillView.imageUri)
    return (
        <View style={{ ...styles.container, backgroundColor: themeStyle.content }}>
            <SafeAreaView style={{ borderBottomColor: themeStyle.border, borderBottomWidth: 1 }}>
                <StatusBar backgroundColor={themeStyle.content} networkActivityIndicatorVisible={true} barStyle={theme == 'dark' ? 'light-content' : 'dark-content'} hidden={false} />
                <HeaderShown title='Détail' theme={theme} />
            </SafeAreaView>

            <ImageContent imageUri={nextSkillView.imageUri} />
            <View style={{ flexDirection: 'row', padding: 20 }}>
                <View style={{ marginRight: 20 }}>
                    <HeaderAvatar avatarUri={require("../assets/avatar/img3.jpg")} />
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ fontWeight: 'bold' }}>{nextSkillView.title}</Text>
                    <Text style={{ fontSize: 13, color: '#222', color: '#888' }}>{'coucou'}</Text>
                </View>
            </View>
            <View style={{ paddingHorizontal: 16, height: 16 }}>
                <Start note={3} voter={105} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#ddd',
    },
});



