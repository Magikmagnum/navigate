import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'

import { Input, Button, PickerInput, DateInput } from '../../../components/formComponent'
import { HeaderShown } from '../../../components/cardsComponent'
import { Header7 } from '../../typoComponent'
import { Loading, handleFailure, handleSuccess } from '../../../components/loadingComponent'

import { Context } from '../../../store/configureStore'
import { putUserIdentity } from '../../../store/API/RatisseurApi'

import { dateValidator, specialCharValidator } from '../../../helpers/dataValidatorHelpers'


const color = require('../../../helpers/color.json')

export default function IdentityModifyComponent({ setModalVisible }) {

  const [state, dispatch] = React.useContext(Context)
  const refInputName = React.createRef();

  const [isLoading, setIsLoading] = React.useState(false)
  const [loadingSuccess, setLoadingSuccess] = React.useState(false)
  const [loadingFailure, setLoadingFailure] = React.useState(false)

  const [name, setName] = React.useState(state.identity.name)
  let sexeValue = 0
  if(state.identity.sexe) { sexeValue = 1 }
  const [sexe, setSexe] = React.useState(sexeValue)
  const [brithday, setBrithday] = React.useState(new Date(state.identity.brithday))

  const [errorForm, setErrorForm] = React.useState({ name: false, sexe: false, brithday: false })

  const getValidatorData = () => {

    setIsLoading(true)

    let error = { name: false, sexe: false, brithday: false }
    let data = {}

    
    if (sexe === 1 || sexe === 0) {
      data.sexe = true
      if(sexe === 0) {
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
      putUserIdentity(data, state.compte.api_key, state.identity.id)
        .then(dataPutIdentity => {
          if (dataPutIdentity.status == 200) {
            addIdentiy(dataPutIdentity.data)
            handleSuccess(setIsLoading, setLoadingSuccess, (() => setModalVisible(false)))
          } else {
            if (dataPutIdentity.data) {
              dataPutIdentity.data.forEach(item => {
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
              console.log('Error', dataPutIdentity.message)
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
      <HeaderShown title="Identit??" 
        icon='md-arrow-back' callback={(() => setModalVisible(false))}
        iconRight='md-save' callbackRight={getValidatorData}
      />
      <ScrollView style={{ padding: 20 }}>
        <View style={styles.head}>
          <Header7
            title="La force d'un mot de passe est plus important que la frequence ?? laquelle vous le changez. Nous vous conseillons d'utiliser un mot de passe s??r que vous n'utilisez nulle part ailleur."
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
            value={name}
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

        </View>
      </ScrollView>
      {isLoading ? <Loading success={loadingSuccess} failure={loadingFailure} /> : <View />}
    </View>
  )
}

export function IdentityModify(data, setModalVisible) {
  return <IdentityModifyComponent setModalVisible={setModalVisible} />
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