import React, { useContext, useState } from 'react'
import { StyleSheet, Dimensions, Modal } from 'react-native'
import { HeaderTitle } from '../../components/cardsComponent'

import { Header5 } from '../typoComponent'
import { TouchableOpacity } from "react-native-gesture-handler"

const color = require('../../helpers/color.json')
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ModalComponent({ data, callback }) {
    const [modalVisible, setModalVisible] = useState(false)
    return (
        <TouchableOpacity style={styles.itemListeCheck}
            onPress={() => setModalVisible(true)}
        >
            <HeaderTitle
                title={data.title}
                subTitle="sur l'itinéraire ou en faisant glisser horizontalement. Les transitions sont animées par défaut. Les composants d'écran pour chaque itinéraire sont montés immédiatement."
            />
            <Modal
                presentationStyle='pageSheet'
                animationType="slide"
                hardwareAccelerated={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                {modalVisible ? callback(data, setModalVisible) : false}
            </Modal>
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    itemListeCheck: {
        paddingVertical: 18,
        paddingHorizontal: 32,
    },
});
