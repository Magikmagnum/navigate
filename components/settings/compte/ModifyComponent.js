import React from 'react'
import { StyleSheet, View, StatusBar, ScrollView } from 'react-native'

import { Input, Button } from '../../../components/formComponent'
import { HeaderShown } from '../../../components/cardsComponent'
import { Header3, Header6 } from '../../../components/typoComponent'
import { Loading, handleFailure, handleSuccess } from '../../../components/loadingComponent'

import { Context } from '../../../store/configureStore'
import { putUserCompte, login_ckeck } from '../../../store/API/RatisseurApi'

import { passwordValidator, passwordConfirmeValidator } from '../../../helpers/dataValidatorHelpers'


const color = require('../../../helpers/color.json')

export default function CompteModifyComponent({ setModalVisible }) {

  const [state, dispatch] = React.useContext(Context)

  const refInputPassword = React.createRef();
  const refInputNewPassword = React.createRef();
  const refInputNewPasswordConfirme = React.createRef();

  const [isLoading, setIsLoading] = React.useState(false)
  const [loadingSuccess, setLoadingSuccess] = React.useState(false)
  const [loadingFailure, setLoadingFailure] = React.useState(false)

  const [password, setPassword] = React.useState(false)
  const [newPassword, setNewPassword] = React.useState(false)
  const [newPasswordConfirme, setNewPasswordConfirme] = React.useState(false)

  const [errorForm, setErrorForm] = React.useState({ password: false, newPassword: false, newPasswordConfirme: false })


  const getValidatorData = () => {

    setIsLoading(true)

    let error = { password: false, newPassword: false, newPasswordConfirme: false }
    let data = {}

    const passwordResult = passwordValidator(password)
    if (passwordResult.error) {
      error.password = passwordResult.data
    } else {
      data.password = passwordResult.data
    }

    const newPasswordResult = passwordValidator(newPassword)
    if (newPasswordResult.error) {
      error.newPassword = newPasswordResult.data
    } else {
      data.newPassword = newPasswordResult.data
    }

    const samePasswordResult = passwordConfirmeValidator(newPassword, newPasswordConfirme)
    error.newPasswordConfirme = samePasswordResult.data

    if (error.password === false && error.newPassword === false && error.newPasswordConfirme === false) {
      putUserCompte(data, state.compte.api_key)
        .then(dataPutCompte => {
          if (dataPutCompte.status == 200) {
            const compte = {
              username: dataPutCompte.data.email,
              password: data.newPassword
            }
            login_ckeck(compte).then(dataLogin => {
              if (dataLogin.token !== undefined) {
                addCompte(dataLogin)
                handleSuccess(setIsLoading, setLoadingSuccess, (() => setModalVisible(false)))
              }
            })
          } else {
            if (dataPutCompte.data) {
              dataPutCompte.data.forEach(item => {
                if (item.path == 'password') {
                  error.password = item.message
                }
                if (item.path == 'newPassword') {
                  error.newPassword = item.message
                }
              })
            } else {
              console.log('Error', dataPutCompte.message)
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


  async function addCompte(data) {
    await dispatch({ type: 'ADD_COMPTE', payload: data });
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
      <HeaderShown title="Changer de mot de passe"
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
            label='Mot de passe actuel'
            onChangeText={(data) => { setPassword(data) }}
            icon="md-lock"
            secureTextEntry={true}
            alert={errorForm.password}
            onSubmitEditing={() => onSubmitEditing(refInputNewPassword)}
          />
          <Input
            refItem={refInputNewPassword}
            label='Nouveau mot de passe'
            onChangeText={(data) => { setNewPassword(data) }}
            icon="md-lock"
            secureTextEntry={true}
            alert={errorForm.newPassword}
            onSubmitEditing={() => onSubmitEditing(refInputNewPasswordConfirme)}
          />
          <Input
            refItem={refInputNewPasswordConfirme}
            label='Retapez le nouveau mot de passe'
            onChangeText={(data) => { setNewPasswordConfirme(data) }}
            icon="md-lock"
            secureTextEntry={true}
            alert={errorForm.newPasswordConfirme}
            onSubmitEditing={() => onSubmitEditing()}
          />
        </View>
      </ScrollView>
      {isLoading ? <Loading success={loadingSuccess} failure={loadingFailure} /> : <View />}
    </View>
  )
}

export function CompteModify(data, setModalVisible) {
  return <CompteModifyComponent setModalVisible={setModalVisible} />
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