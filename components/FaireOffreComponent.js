import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from './formComponent'


import { useRecoilState } from 'recoil';
import { themeState } from '../store/atomes/theme';
import ModalComponent from './modalComponent'
import MapComponent from './mapComponent'

export default function FaireOffreComponent() {

    const [modalVisible, setModalVisible] = useState(false);
    const [theme, setTheme] = useState('light');
    const [themeStyle, setThemeStyle] = useRecoilState(themeState);

    return (
        <View>
            <Button onPress={() => setModalVisible(true)} title='Faire une offre' />
            <ModalComponent
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                title='Faire une offre'
            >
                <MapComponent />
            </ModalComponent>
        </View>
    )
}
