import React from 'react'
import { StyleSheet, View, StatusBar, TouchableOpacity, ScrollView } from 'react-native'

import { Context } from '../store/configureStore'
import { login_ckeck, getSkills } from '../store/API/RatisseurApi'

import { Input, Button } from '../components/formComponent'
import { Header3, Header6 } from '../components/typoComponent'
import { Loading, handleFailure, handleSuccess } from '../components/loadingComponent'

import { passwordValidator, emailValidator } from '../helpers/dataValidatorHelpers'




const color = require('../helpers/color.json')



export default function SignInScreen({ navigation }) {

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [errorForm, setErrorForm] = React.useState({ username: false, password: false })

  const [isLoading, setIsLoading] = React.useState(false)
  const [loadingSuccess, setLoadingSuccess] = React.useState(false)
  const [loadingFailure, setLoadingFailure] = React.useState(false)

  const [state, dispatch] = React.useContext(Context)

  const refInput1 = React.createRef();
  const refInput2 = React.createRef();




  const getSignIn = () => {

    setIsLoading(true)

    let error = { username: false, password: false }
    let data = {}

    // Si les données email sont donées
    const usernameResult = emailValidator(username)
    if (usernameResult.error) {
      error.username = usernameResult.data
    } else {
      data.username = usernameResult.data
    }

    // Si les données password sont donées
    const passwordResult = passwordValidator(password)
    if (passwordResult.error) {
      error.password = passwordResult.data
    } else {
      data.password = passwordResult.data
    }

    if (error.password === false && error.username === false) {
      login_ckeck(data).then(data => {
        if (data.token !== undefined) {
          addCompte(data)
          handleSuccess(setIsLoading, setLoadingSuccess, (() => {
            navigation.reset({ index: 0, routes: [{ name: 'Home' }], })
          }))
        } else {
          const error = { username: 'email ou mot de passe incorrect', password: false }
          handleFailure(setIsLoading, setLoadingFailure, (() => setErrorForm(error)))
        }
      })
    } else {
      handleFailure(setIsLoading, setLoadingFailure, (() => setErrorForm(error)))
    }
  }


  async function addCompte(data) {
    await dispatch({ type: 'LOGIN_COMPTE', payload: data });
  }


  const onSubmitEditing = (ref) => {
    if (ref) {
      ref.current.focus()
    } else {
      getSignIn()
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{ padding: 20 }}>
        <StatusBar backgroundColor="#fff" networkActivityIndicatorVisible={true} barStyle='dark-content' hidden={false} />

        <View style={styles.head}>
          <Header3
            title='Connexion'
            fontWeight="bold"
          />
          <Header6
            title="Bienvenu sur le catalogue ratisseur. Connectez-vous à votre compte"
          />
        </View>

        <View style={styles.body}>
          <Input
            refItem={refInput1}
            label='E-mail'
            placeholder='ericgansa@gamil.com'
            textContentType="emailAddress"
            onChangeText={setUsername}
            keyboardType='email-address'
            icon="md-person"
            maxLength={100}
            alert={errorForm.username}
            onSubmitEditing={() => onSubmitEditing(refInput2)}
          />
          <Input
            refItem={refInput2}
            label='Mot de passe'
            onChangeText={setPassword}
            alert={errorForm.password}
            icon="md-lock"
            textContentType="password"
            //keyboardType='visible-password'
            secureTextEntry={true}
            onSubmitEditing={() => onSubmitEditing()}
          />

          <View style={styles.boxButtom}>
            <Button
              onPress={() => getSignIn()}
              title="Se conneter"
            />
          </View>
        </View>

        <View style={styles.foot}>
          <TouchableOpacity style={{ marginVertical: 8 }} onPress={() => navigation.navigate('SignUp')}>
            <Header6
              title="Vous n'avez pas de compte ? Inscription"
              color={color.text.secondary}
              fontWeight="bold"
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginVertical: 8 }} onPress={() => navigation.navigate('Reset')}>
            <Header6
              title="Mot de passe oublié ?"
              color={color.text.secondary}
              fontWeight="bold"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      {isLoading ? <Loading success={loadingSuccess} failure={loadingFailure} /> : <View />}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    justifyContent: "center",
    //alignItems: "center",
  },
  head: {
    marginBottom: 48
  },
  body: {
    marginVertical: 20,
    //backgroundColor: '#f8bbd0',
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


/**
  <View style={{marginBottom: 20, flexDirection:'row'}}>
    <View style={{flex:1, margin: 4, alignItems: "center"}}>
      <Ionicons name="logo-facebook" size={28} color={color.secondary.darkColor}/>
    </View>
    <View style={{flex:1, margin: 4, alignItems: "center"}}>
      <Ionicons name="logo-google" size={28} color={color.secondary.darkColor}/>
    </View>
  </View>
 */