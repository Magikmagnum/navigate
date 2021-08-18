import React, { useCallback } from 'react';
import { View, StatusBar, SafeAreaView, Modal, Linking, Platform } from 'react-native';
import { Button } from './formComponent'
import { HeaderShown } from './cardsComponent'
import ModalComponent from './modalComponent'


import { useRecoilState } from 'recoil';
import { themeState } from '../store/atomes/theme';


export default function FaireAppelComponent({ title, number }) {

    const makeCall = useCallback(
        () => {
            let phoneNumber = ''
            if (Platform.OS === 'android') {
                phoneNumber = 'tel:${' + number + '}'
            } else {
                phoneNumber = 'telpromt:${' + number + '}'
            }

            Linking.openURL(phoneNumber)
        },
        [number],
    )


    return (
        <View>
            <Button onPress={() => makeCall()} title={title} />
        </View>
    )
}
