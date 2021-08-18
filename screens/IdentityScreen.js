import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Input, Button, PickerInput, DateInput } from '../components/formComponent'
import { HeaderShown } from '../components/cardsComponent'
import { Header6 } from '../components/typoComponent'
import { Loading, handleFailure, handleSuccess } from '../components/loadingComponent'

import { Context } from '../store/configureStore'
import { postUserIdentity } from '../store/API/RatisseurApi'

import { dateValidator, specialCharValidator } from '../helpers/dataValidatorHelpers'


const color = require('../helpers/color.json')

export default function IdentityAddComponent() {

  const [state, dispatch] = React.useContext(Context)
  const navigation = useNavigation()
  const refInputName = React.createRef()

  const [isLoading, setIsLoading] = React.useState(false)
  const [loadingSuccess, setLoadingSuccess] = React.useState(false)
  const [loadingFailure, setLoadingFailure] = React.useState(false)

  const [name, setName] = React.useState(false)
  const [sexe, setSexe] = React.useState(1)
  const [brithday, setBrithday] = React.useState(new Date())

  const [errorForm, setErrorForm] = React.useState({ name: false, sexe: false, brithday: false })



  const getValidatorData = () => {

    setIsLoading(true)

    let error = { name: false, sexe: false, brithday: false }
    let data = {}


    if (sexe === 1 || sexe === 0) {
      data.sexe = true
      if (sexe === 0) {
        data.sexe = false
      }
    } else {
      error.sexe = 'Sexe invalide'
    }

    const brithdayResult = dateValidator(brithday)
    if (brithdayResult.error) {
      error.brithday = brithdayResult.data
    } else {
      data.brithday = brithdayResult.data
    }

    const nameResult = specialCharValidator(name)
    if (nameResult.error) {
      error.name = nameResult.data
    } else {
      data.name = nameResult.data
    }

    if (error.name === false && error.sexe === false && error.brithday === false) {
      postUserIdentity(data, state.compte.api_key)
        .then(dataPostIdentity => {
          if (dataPostIdentity.status == 201) {
            addIdentiy(dataPostIdentity.data)
            handleSuccess(setIsLoading, setLoadingSuccess, (() => navigation.navigate('Avatar')))
          } else {
            if (dataPostIdentity.data) {
              dataPostIdentity.data.forEach(item => {
                if (item.path == 'name') {
                  error.name = item.message
                }
                if (item.path == 'sexe') {
                  error.sexe = item.message
                }
                if (item.path == 'brithday') {
                  error.brithday = item.message
                }
              })
            } else {
              console.log('Error', dataPostIdentity.message)
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


  async function addIdentiy(data) {
    await dispatch({ type: 'ADD_IDENTITY', payload: data });
  }

  return (
    <View style={styles.container}>
      <HeaderShown title="Identité" />
      <ScrollView style={{ padding: 20 }}>
        <View style={styles.head}>
          <Header6
            title="La force d'un mot de passe est plus important que la frequence à laquelle vous le changez. Nous vous conseillons d'utiliser un mot de passe sûr que vous n'utilisez nulle part ailleur."
          />
        </View>

        <View style={styles.body}>
          <Input
            refItem={refInputName}
            label='Nom et prenom'
            placeholder=''
            onChangeText={(data) => { setName(data) }}
            //keyboardType='phone-pad'
            maxLength={32}
            icon="md-person"
            alert={errorForm.name}
            onSubmitEditing={getValidatorData}
          />

          <PickerInput
            label='Sexe'
            alert={errorForm.sexe}
            onValueChange={setSexe}
            value={sexe}
            icon="md-man"
          />

          <DateInput
            label='Date de naissance'
            onChange={setBrithday}
            icon="md-calendar"
            alert={errorForm.brithday}
            value={brithday}
          />

          <View style={styles.boxButtom}>
            <Button
              onPress={getValidatorData}
              title="Enregistrer les modifications"

            />
          </View>
        </View>
      </ScrollView>
      {isLoading ? <Loading success={loadingSuccess} failure={loadingFailure} /> : <View />}
    </View>
  )
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
  foot: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
});