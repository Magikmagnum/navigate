import React, { useState } from 'react';
import { View, StatusBar, SafeAreaView, Modal } from 'react-native';
import { Button } from './formComponent'
import { HeaderShown } from './cardsComponent'


import { useRecoilState } from 'recoil';
import { themeState } from '../store/atomes/theme';


export default function ModalComponent({ modalVisible, setModalVisible, title, children }) {

    const [theme, setTheme] = useState('light');
    const [themeStyle, setThemeStyle] = useRecoilState(themeState);

    return (
        <View>
            <Modal
                presentationStyle='pageSheet'
                animationType="slide"
                hardwareAccelerated={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1 }}>
                    <SafeAreaView style={{ borderBottomColor: themeStyle.border, borderBottomWidth: 1 }}>
                        <StatusBar backgroundColor={themeStyle.content} networkActivityIndicatorVisible={true} barStyle={theme == 'dark' ? 'light-content' : 'dark-content'} hidden={false} />
                        <HeaderShown title={title}
                            icon='md-arrow-back' callback={(() => setModalVisible(false))}
                            theme={theme}
                        />
                    </SafeAreaView>
                    {children}
                </View>
            </Modal>
        </View>
    )
}
