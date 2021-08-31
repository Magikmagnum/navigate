import React, { useEffect } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import Animated from 'react-native-reanimated'
import { TapGestureHandler } from 'react-native-gesture-handler'


const { width, height } = Dimensions.get("window")
const heightBottomSheet = height - 136


export default function AnimetedBottomSheetComponent({ translateY, gesturHandler, zIndex, height }) {

    const infos = () => {
        return (
            <View>

            </View>
        )
    }

    useEffect(() => {
        //console.log(zIndex)
    }, [])

    return (
        <>
            <TapGestureHandler {...gesturHandler}>
                <Animated.View style={{ ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: zIndex, }}>
                    <View style={{ justifyContent: 'center', alignItems: "center" }} >
                        <View style={{ position: 'absolute', top: 136, height: 5, width: 50, backgroundColor: '#fff', borderRadius: 20 }} ></View>

                    </View>
                </Animated.View>
            </TapGestureHandler>
            <Animated.View style={{ ...styles.bottomSeet, transform: [{ translateY: translateY }], zIndex: 100, height: height }}>
                {infos()}
            </Animated.View>
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    bottomSeet: {
        position: "absolute",
        marginHorizontal: 0,
        bottom: 0,
        width: width,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        //alignItems:"center",
        //justifyContent:"center",
        elevation: 4
    },
    head: {
        //flex:1,
        height: 72,
        //backgroundColor:'red', 
        flexDirection: "row",
    },

})