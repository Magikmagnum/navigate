import React, { memo } from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import { Ionicons } from '@expo/vector-icons'


import { Input, PickerInput } from '../../../components/formComponent'
import { HeaderShown } from '../../../components/cardsComponent'
import { Header7 } from '../../typoComponent'
import { Loading, handleFailure, handleSuccess } from '../../../components/loadingComponent'

import { Context } from '../../../store/configureStore'
import { postUserSkill } from '../../../store/API/RatisseurApi'

import { specialCharValidator } from '../../../helpers/dataValidatorHelpers'

const color = require('../../../helpers/color.json')

export default function SkillsModifyComponent({ setModalVisible }) {

    const [state, dispatch] = React.useContext(Context)
    const refInputSkill = React.createRef()

    const [image, setImage] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [loadingSuccess, setLoadingSuccess] = React.useState(false)
    const [loadingFailure, setLoadingFailure] = React.useState(false)

    const [skill, setSkill] = React.useState('')
    const [category, setCategory] = React.useState(false)
    const [newCategory, setNewCategory] = React.useState('')

    const [errorForm, setErrorForm] = React.useState({ skill: false, category: false, newCategory: false })

    React.useEffect(() => {
        (async () => {
            if (Constants.platform.ios) {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Désolé, nous avons besoin des autorisations image pour que cela fonctionne!');
                }
            }
        })()
    }, [])

    const getValidatorData = () => {

        setIsLoading(true)

        let error = { skill: false, category: false, newCategory: false }
        let data = {}


        const skillResult = specialCharValidator(skill)
        if (skillResult.error) {
            error.skill = skillResult.data
        } else {
            data.skill = skillResult.data
        }

        if (error.skill === false ) {
            postUserSkill(data, state.compte.api_key)
                .then(dataPostUserSkill => {
                    console.log(dataPostUserSkill)
                    if (dataPostUserSkill.status == 201) {
                        addUserSkill(dataPostUserSkill.data)
                        handleSuccess(setIsLoading, setLoadingSuccess, (() => setModalVisible(false)))
                    } else {
                        if (dataPostUserSkill.data) {
                            dataPostUserSkill.data.forEach(item => {
                                if (item.path == 'skill') {
                                    error.name = item.message
                                }
                                if (item.path == 'category') {
                                    error.sexe = item.message
                                }
                                if (item.path == 'newCategory') {
                                    error.brithday = item.message
                                }
                            })
                        } else {
                            console.log('Error', dataPostUserSkill.message)
                        }
                        handleFailure(setIsLoading, setLoadingFailure, (() => setErrorForm(error)))
                    }
                }).catch(e => {
                    handleFailure(setIsLoading, setLoadingFailure, (() => console.log('putCompte error', e)))
                })
        } else {
            handleFailure(setIsLoading, setLoadingFailure, (() => setErrorForm(error)))
        }
    }

    async function addUserSkill(data) {
        await dispatch({ type: 'TOGGLE_SKILL', payload: data });
    }


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.7,
        });

        if (!result.cancelled) {
            setImage(result.uri)
        }
    }

    const InputImage = React.memo(({ image }) => {
        return (
            <TouchableOpacity onPress={pickImage} style={{ backgroundColor: '#eee', height: 220 }}>
                {
                    image ?
                        <View style={{ position: "relative", height: 220 }}>
                            <Image source={{ uri: image }} style={{ width: '100%', height: 220, marginBottom: 50, resizeMode: "cover" }} />
                            <View style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0, alignItems: 'center', justifyContent: 'center' }}>
                                <Ionicons name={'md-image'} color={'#000000a6'} size={50} />
                            </View>
                        </View>
                        :
                        <View>
                            <TouchableOpacity onPress={pickImage} style={{ padding: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', }}>
                                <Ionicons name={'md-image'} color={'#666'} size={50} />
                                <Text style={{ color: '#666', fontWeight: "bold", fontSize: 14, marginTop: 10, lineHeight: 28, textAlign: 'center' }}>Selectionez une image en cliquant ici</Text>
                            </TouchableOpacity>
                        </View>
                }
            </TouchableOpacity>
        )
    })

    return (
        <View style={{}}>
            <HeaderShown skill="Ajouter une competence"
                icon='md-arrow-back' callback={(() => setModalVisible(false))}
                iconRight='md-save' callbackRight={getValidatorData}
            />
            <ScrollView>
                <InputImage image={image} />
                <View style={{ marginVertical: 40, padding: 20 }}>
                    <Input
                        refItem={refInputSkill}
                        label='Titre'
                        placeholder='Plombier'
                        onChangeText={(data) => { setSkill(data) }}
                        //keyboardType='phone-pad'
                        maxLength={32}
                        value={skill}
                        icon="md-person"
                        alert={errorForm.skill}
                        onSubmitEditing={getValidatorData}
                    />

                    <PickerInput
                        label='Categorie'
                        alert={errorForm.category}
                        onValueChange={setCategory}
                        value={category}
                        icon="md-man"
                    />

                    <View style={{ ...styles.head }}>
                        <Header7
                            color={color.primary.color}
                            skill="Si votre competence n'appartient à aucune catagorie preciser votre categorie dans le champ si-desous sinon laissez ce champ vide et valider."
                        />
                    </View>
                    <Input
                        label='Ajouter une nouvelle categorie'
                        placeholder='Bâtiment'
                        onChangeText={(data) => { setNewCategory(data) }}
                        //keyboardType='phone-pad'
                        maxLength={32}
                        value={newCategory}
                        icon="md-person"
                        alert={errorForm.newCategory}
                        onSubmitEditing={getValidatorData}
                    />
                </View>
            </ScrollView>
            {isLoading ? <Loading success={loadingSuccess} failure={loadingFailure} /> : <View />}
        </View>
    )
}


export function SkillsAbstraction(data, setModalVisible) {
    return <SkillsModifyComponent setModalVisible={setModalVisible} />
}


const styles = StyleSheet.create({
    container: {
        //flex: 1,
        //backgroundColor: '#fff',
        //justifyContent: "center",
    },
    head: {
        marginBottom: 28
    },
    body: {
        marginVertical: 20,
    },
    boxButtom: {
        marginVertical: 20,
    },
});