import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, CheckBox, Picker, Dimensions } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Ionicons } from '@expo/vector-icons';
import moment from "moment"
//import { BorderlessButton, RectButton } from 'react-native-gesture-handler'


const color = require('../helpers/color.json')

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export function Input(props) {

    const [isFocus, setIsFocus] = React.useState(false);

    const onFocus = () => {
        setIsFocus(true)
    }

    const onBlur = () => {
        setIsFocus(false)
    }

    const onPress = () => {
        props.refItem.current.focus()
    }

    let boxTextInputFocus
    isFocus ? boxTextInputFocus = styles.boxTextInputFocus : boxTextInputFocus = {}

    let labelTextInputFocus
    isFocus ? labelTextInputFocus = styles.labelTextInputFocus : labelTextInputFocus = {}
    
    //{getIcon(props.icon, isFocus)}

    return (
        <TouchableOpacity style={styles.contentTextInput} onPress={onPress} activeOpacity={1}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 8 }}>
                    <View style={{...styles.boxTextInput, ...boxTextInputFocus}}>
                        <Text style={{...styles.labelTextInput, ...labelTextInputFocus}}>{props.label}</Text>
                        <TextInput
                            ref={props.refItem}
                            style={styles.textInput}
                            placeholder={props.placeholder}

                            textContentType={props.textContentType}
                            secureTextEntry={props.secureTextEntry}
                            numberOfLines={props.numberOfLines}
                            maxLength={props.maxLength}
                            keyboardType={props.keyboardType}
                            value={props.value}
                            onSubmitEditing={props.onSubmitEditing}
                            onChangeText={(text) => props.onChangeText(text)}
                            onFocus={onFocus}
                            onBlur={onBlur}
                        />
                    </View>
                </View>
            </View>

            <Text style={styles.alertTextInput}>{props.alert}</Text>
        </TouchableOpacity>
    )
}


export function PickerInput({ alert, onValueChange, value, label, icon, data }) {

    const [isFocus, setIsFocus] = React.useState(false);

    const DATA = [
        {
            key: 0,
            value: 'Femme'
        },
        {
            key: 1,
            value: 'Homme'
        }
    ]
    //{getIcon(icon, isFocus)}
    return (
        <View style={styles.contentTextInput} >
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 8 }}>
                    <View style={isFocus ? styles.boxTextInputFocus : styles.boxTextInput}>
                        <Text style={isFocus ? styles.labelTextInputFocus : styles.labelTextInput}>{label}</Text>
                        <Picker
                            mode='dropdown'
                            selectedValue={value}
                            style={styles.textInput}
                            onValueChange={(itemValue, itemIndex) =>
                                onValueChange(itemValue)
                            }>
                            {
                                DATA.map((element, index) => {
                                    return (
                                        <Picker.Item key={index} label={element.value} value={element.key} />
                                    )
                                })
                            }
                        </Picker>
                    </View>
                </View>
            </View>

            <Text style={styles.alertTextInput}>{alert}</Text>
        </View>
    )
}



export function Switch(props) {
    return (
        <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={"#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
        />
    )
}



export function Button(props) {
    return (
        <TouchableOpacity
            style={{ ...styles.button, ...props.style }}
            onPress={props.onPress}
        >
            <Text style={{ ...styles.textButton, ...props.styleText }}>{props.title.toUpperCase()}</Text>
        </TouchableOpacity>
    )
}



export function CheckBoxfrom(props) {

    const [isSelected, setSelection] = React.useState(props.value);

    const onValueChange = (e) => {
        props.callBack()
        setSelection(e)
    }

    const label = () => {
        if (props.label) {
            return <Text style={{ ...styles.label, ...props.label.style }}>{props.label.title}</Text>
        }
    }

    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CheckBox
                value={isSelected}
                onValueChange={(e) => onValueChange(e)}
            />
            <View style={{ marginLeft: 24 }}>
                {label()}
            </View>
        </View>
    )
}


export function DateInput(props) {

    const [show, setShow] = React.useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || props.value;
        setShow(false);
        props.onChange(currentDate);
    };

    const showDatepicker = () => {
        setShow(true);
    };


    let boxTextInputFocus
    show ? boxTextInputFocus = styles.boxTextInputFocus : boxTextInputFocus = {}

    let labelTextInputFocus
    show ? labelTextInputFocus = styles.labelTextInputFocus : labelTextInputFocus = {}
    //{getIcon(props.icon, show)}
    return (
        <TouchableOpacity style={styles.contentTextInput} onPress={showDatepicker} activeOpacity={1}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                
                <View style={{ flex: 8 }}>
                    <View style={{...styles.boxTextInput, ...boxTextInputFocus}}>
                        <Text style={{...styles.labelTextInput, ...labelTextInputFocus}}>{props.label}</Text>
                        <Text style={styles.textInput}>{moment(props.value).format("DD / MM / YYYY")}</Text>
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={props.value}
                                mode={'date'}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                            />
                        )}
                    </View>
                </View>
            </View>
            <Text style={styles.alertTextInput}>{props.alert}</Text>
        </TouchableOpacity>
    )
}


const getIcon = (icon, isFocus) => {
    if (icon) {
        return (
            <View style={{ flex: 1, margin: 4, marginTop: 24 }}>
                <Ionicons name={icon} size={22} color={isFocus ? color.primary.color : color.primary.silver} />
            </View>
        )
    }
    return null
}














const styles = StyleSheet.create({
    contentTextInput: {
        flex: 1,
        flexDirection: "column",
        height: 66,
        marginVertical: 2,
        marginBottom:12,
    },
    boxTextInput: {
        //backgroundColor: '#cfd8dc',
        position: 'relative',
        flex: 1,
        justifyContent: "center",
        height: 56,
        justifyContent:'center',
        borderWidth: 1,
        borderRadius:12,
        borderColor: color.primary.silver,
    },
    boxTextInputFocus: {
        borderColor: color.primary.color,
    },
    labelTextInput: {
        position:'absolute',
        top:-15,
        left:12,
        height: 20,
        fontSize: 12,
        paddingHorizontal:4,
        color: color.text.silver,
        fontWeight: 'bold',
        backgroundColor: '#fff',
        marginVertical: 4,
    },
    labelTextInputFocus: {
        height: 20,
        fontSize: 12,
        color: color.primary.color,
        fontWeight: 'bold',
        //backgroundColor: '#e91e63',
        marginVertical: 4,
    },
    textInput: {
        //backgroundColor: '#eee',
        marginVertical:10,
        marginHorizontal: 16,
        height: 20,
        fontSize: 16,
        fontWeight: 'bold',
        borderColor: 'transparent',
        borderWidth: 1,
        marginBottom: 10,
    },
    alertTextInput: {
        marginTop: 4,
        marginHorizontal: 12,
        height: 16,
        fontSize: 12,
        fontWeight: 'bold',
        color: color.danger.color,
        textAlign: 'right',
        //backgroundColor: 'green',
    },




    button: {
        height: 36,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        minWidth: 64,
        marginVertical: 8,
        borderWidth: 2,

        borderColor: color.primary.color,
        backgroundColor: color.primary.color,
    },


    textButton: {
        fontSize: 14,
        fontWeight: 'bold',
        color: color.text.primary,
    },
});

