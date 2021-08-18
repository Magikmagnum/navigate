import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { Loading, handleFailure, handleSuccess } from './loadingComponent'
import { Button } from './formComponent'


const color = require('../helpers/color.json')
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export function ScanenerQrcode() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`${data}`);
    };



    if (hasPermission === null) {
        return (
            <View style={{ ...styles.container, backgroundColor: "#000", height: windowHeight }}>
                <Loading />
            </View>
        )
    }

    if (hasPermission === false) {
        return (
            <View style={{ ...styles.container, backgroundColor: "#fff", height: windowHeight - 46 }}>
                <Text>No access to camera</Text>
            </View>
        )
    }

    return (
        <View style={{ ...styles.container, backgroundColor: "#000", height: windowHeight - 46 }}>

            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && <Button title={'rescannez'} onPress={() => setScanned(false)} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: "center",
    },
});
