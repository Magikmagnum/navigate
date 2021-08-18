import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from './formComponent'


import ModalComponent from './modalComponent'

export default function FaireOffreComponent() {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <Button onPress={() => setModalVisible(true)} title='Faire une offre' />
            <ModalComponent
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                title='Faire une offre'
            >
            </ModalComponent>
        </View>
    )
}
