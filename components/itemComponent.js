import React, { useContext, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { Header7, Header5, Header6 } from './typoComponent'
import { CheckBoxfrom } from "./formComponent";
import { HeaderAvatarProfil } from './cardsComponent';
import { Context } from '../store/configureStore'


const color = require('../helpers/color.json')

export function Item(props) {

    const [state, dispatch] = useContext(Context);

    const checker = () => {
        if (props.checkBox) {
            return <CheckBoxfrom callBack={addPesonneContact} value={props.checkBoxValue} />
        }
    }

    const addPesonneContact = () => {
        dispatch({ type: 'TOGGLE_CONTACT', payload: props.data });
    }

    var data = props.data ? props.data : {}

    const image = data.image ? data.image : "";
    const title = data.title ? data.title : "Non precis";
    const address = data.addres ? data.addres : "Non precis";
    const hours = data.hours ? data.hours : "Non precis";



    const body = () => {

        return (
            <View style={styles.global}>
                <View style={{}}>
                    <HeaderAvatarProfil avatarUri={require("../assets/avatar/img9.jpg")} />
                </View>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <View style={styles.contentTitle}>
                            <Header5
                                color={color.text.secondary}
                                fontWeight="bold"
                                title={title}
                                numberOfLines={1}
                            />
                        </View>
                    </View>
                    <View style={styles.contentBody}>
                        <Header6
                            color={color.primary.color}
                            title={address}
                            numberOfLines={1}
                        />
                    </View>
                    <View style={styles.contentFooter}>
                        <Header7
                            color={color.text.secondary}
                            //fontWeight="bold"
                            title={hours}
                            numberOfLines={1}
                        />
                    </View>
                </View>
                <View style={styles.contentVote}>
                    {checker()}
                </View>
            </View>
        )
    }

    if (props.touchable == false) {
        return (
            <View>
                {body()}
            </View>
        )
    }

    return (
        <TouchableOpacity onPress={() => props.onPress(props.data)}>
            {body()}
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    global: {
        flexDirection: "row",
        //backgroundColor: color.primary.silver,
        marginTop: 20,
        paddingVertical: 6,
        paddingRight: 8,
        paddingHorizontal: 20,
    },

    content: {
        flex: 1,
        flexDirection: "column",
        marginLeft: 9
    },
    header: {
        flex: 1,
        flexDirection: "row",
        //backgroundColor: "#e0d318",
    },
    contentTitle: {
        flex: 3,
        flexDirection: "row",
        //backgroundColor: "#cecdc0",
    },
    title: {
        flexWrap: "wrap",
        fontWeight: 'bold',
        fontSize: 16,
    },
    favoriteFlag: {
        borderRadius: 64,
        //backgroundColor: "#009432",
        marginTop: 7,
        marginRight: 10,
        width: 10,
        height: 10,
    },
    contentVote: {
        padding: 16,
        justifyContent: "center",
        //backgroundColor: "#002432",
    },
    vote: {
        fontWeight: 'bold',
        fontSize: 16,
        color: color.primary.color,
        textAlign: "right",
    },
    contentBody: {
        flex: 1,
        marginRight: 24,
        //backgroundColor: "crimson",
    },
    body: {
        //fontStyle: "italic",
        color: "#666666",
    },
    contentFooter: {
        flex: 1,
        //backgroundColor: "pink",
    },
    footer: {
        fontSize: 12,
        //textAlign: "right",
    }
});