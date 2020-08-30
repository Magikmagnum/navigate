import React from 'react'
import { StyleSheet, View, StatusBar, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Input, Button } from '../../../components/formComponent'
import { HeaderShown } from '../../../components/cardsComponent'
import { Header6 } from '../../../components/typoComponent'
import { Loading, handleFailure, handleSuccess } from '../../../components/loadingComponent'

import { Context } from '../../../store/configureStore'
import { deleteUserCompte } from '../../../store/API/RatisseurApi'

import { passwordValidator } from '../../../helpers/dataValidatorHelpers'


const color = require('../../../helpers/color.json')

export default function CompteDeleteComponent({ setModalVisible }) {

    const [state, dispatch] = React.useContext(Context)
    const navigation = useNavigation()
    const refInputPassword = React.createRef();

    const [isLoading, setIsLoading] = React.useState(false)
    const [loadingSuccess, setLoadingSuccess] = React.useState(false)
    const [loadingFailure, setLoadingFailure] = React.useState(false)

    const [password, setPassword] = React.useState(false)
    const [errorForm, setErrorForm] = React.useState({ password: false })

    const getValidatorData = () => {

        setIsLoading(true)

        let error = { password: false }
        let data = {}

        const passwordResult = passwordValidator(password)
        if (passwordResult.error) {
            error.password = passwordResult.data
        } else {
            data.password = passwordResult.data
        }


        if (error.password === false) {
            deleteUserCompte(data, state.compte.api_key)
                .then(dataDeleteCompte => {
                    if (dataDeleteCompte.status == 200) {
                        deleteCompte()
                        handleSuccess(setIsLoading, setLoadingSuccess, (() => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'SignIn' }],
                            })
                            setModalVisible(false)
                        }))
                    } else {
                        if (dataDeleteCompte.data) {
                            dataPutCompte.data.forEach(item => {
                                if (item.path == 'password') {
                                    error.password = item.message
                                }
                            })
                        } else {
                            console.log('Error', dataDeleteCompte)
                        }
                        handleFailure(setIsLoading, setLoadingFailure, (() => setErrorForm(error)))
                    }
                }).catch(e => {
                    handleFailure(setIsLoading, setLoadingFailure, (() => console.log('deleteCompte error', e.message)))
                })
        } else {
            handleFailure(setIsLoading, setLoadingFailure, (() => setErrorForm(error)))
        }
    }


    async function deleteCompte() {
        await dispatch({ type: 'DELETE_COMPTE', payload: {} });
    }


    const onSubmitEditing = (ref) => {
        if (ref) {
            ref.current.focus()
        } else {
            getValidatorData()
        }
    }

    return (
        <View style={styles.container}>
            <HeaderShown title="Supprimer votre compte"
                icon='md-arrow-back' callback={(() => setModalVisible(false))}
                iconRight='md-save' callbackRight={getValidatorData}
            />
            <ScrollView style={{ padding: 20 }}>
                <View style={styles.head}>
                    <Header6
                        title="La force d'un mot de passe est plus important que la frequence à laquelle vous le changez. Nous vous conseillons d'utiliser un mot de passe sûr que vous n'utilisez nulle part ailleur."
                    />
                </View>

                <View style={styles.body}>
                    <Input
                        refItem={refInputPassword}
                        label='Mot de passe'
                        onChangeText={(data) => { setPassword(data) }}
                        icon="md-lock"
                        secureTextEntry={true}
                        alert={errorForm.password}
                        onSubmitEditing={() => onSubmitEditing()}
                    />
                    
                </View>
            </ScrollView>
            {isLoading ? <Loading success={loadingSuccess} failure={loadingFailure} /> : <View />}
        </View>
    )
}

export function CompteDelete(data, setModalVisible) {
    return <CompteDeleteComponent setModalVisible={setModalVisible} />
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "center",
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
    foot: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 50,
    },
});