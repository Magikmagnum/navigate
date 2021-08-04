import React, { useState } from 'react';
import { View, StatusBar, SafeAreaView, Modal } from 'react-native';
import { Button } from './formComponent'
import { HeaderShown } from './cardsComponent'


import { useRecoilState } from 'recoil';
import { themeState } from '../store/atomes/theme';


export default function FaireOffreComponent() {

    const [modalVisible, setModalVisible] = useState(false);
    const [theme, setTheme] = useState('light');
    const [themeStyle, setThemeStyle] = useRecoilState(themeState);

    return (
        <View>
            <Button onPress={() => setModalVisible(true)} title='Faire une offre' />
            <Modal
                presentationStyle='pageSheet'
                animationType="slide"
                hardwareAccelerated={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View>
                    <SafeAreaView style={{ borderBottomColor: themeStyle.border, borderBottomWidth: 1 }}>
                        <StatusBar backgroundColor={themeStyle.content} networkActivityIndicatorVisible={true} barStyle={theme == 'dark' ? 'light-content' : 'dark-content'} hidden={false} />
                        <HeaderShown title="Faire une offre"
                            icon='md-arrow-back' callback={(() => setModalVisible(false))}
                            theme={theme}
                        />
                    </SafeAreaView>
                </View>
            </Modal>
        </View>
    )
}
