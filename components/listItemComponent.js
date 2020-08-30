import React, { useContext, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { Header7, Header5, Header6 } from '../components/typoComponent'
import { CheckBoxfrom } from "../components/formComponent";
import { Context } from '../store/configureStore'


const color = require('../helpers/color.json')

export function ItemTitle(props) { 
    
    const [ state, dispatch ] = useContext(Context);

    const checker = () => {
        if(props.checkBox){
            return <CheckBoxfrom callBack={addPesonneContact} value={props.checkBoxValue}/>
        }
    }

    const addPesonneContact = () => {
        dispatch({type: 'TOGGLE_CONTACT', payload: props.data});
    }


    const body = () => {

        return(
            <View style={ styles.global }>
                <View style={ styles.contentImage }>
                    <Image
                        style={styles.image}
                        source={ props.data.image }
                    />
                </View>
                <View style={ styles.content }>
                    <View style={ styles.header }>
                        <View style={ styles.contentTitle }>
                            <Header5
                                color={color.text.secondary}
                                fontWeight="bold"
                                title={props.data.title?props.data.title:"Non precis"}
                                numberOfLines={1}
                            />
                        </View>
                    </View>
                    <View style={ styles.contentBody }>
                        <Header6
                            color={color.primary.color}
                            //fontWeight="bold"
                            title={props.data.addres?props.data.addres:"Non precis"}
                            numberOfLines={1}
                        />
                    </View>
                    <View style={ styles.contentFooter }>
                        <Header7
                            color={color.text.secondary}
                            //fontWeight="bold"
                            title={props.data.addres?props.data.heure:"Non precis"}
                            numberOfLines={1}
                        />
                    </View>
                </View>
                <View style={ styles.contentVote }>
                    {checker()}
                </View>
            </View>
        )
    }
    
    if(props.touchable == false){
        return (
            <View>
                {body()}
            </View>
        )
    }

    return(
        <TouchableOpacity onPress={() => props.onPress(props.data)}>
            {body()}
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    global: {
        display: "flex",
        flexDirection: "row",
        //backgroundColor: color.primary.silver,
        height: 84,
        paddingVertical:6,
        paddingRight:8,
        paddingHorizontal: 20,
    },
    contentImage: {
        backgroundColor: color.primary.color,
        width: 48,
        height: 48,
        margin: 8,
        borderRadius: 64,
    },
    image: {
        width: 48,
        height: 48,
        borderRadius: 64,
    },
    content: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        marginLeft: 9
    },
    header: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        //backgroundColor: "#e0d318",
    },
    contentTitle: {
        flex: 3,
        display: "flex",
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
        padding:16,
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
        marginRight:24,
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