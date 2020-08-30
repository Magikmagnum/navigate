import React from 'react'
import { StyleSheet, View, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
//Store
import { Context } from '../store/configureStore'
import { login_ckeck, register } from '../store/API/RatisseurApi'
//Component
import { Input, Button } from '../components/formComponent'
import { Header2, Header6 } from '../components/typoComponent'
import { HeaderShown } from '../components/cardsComponent'
import { Loading } from '../components/loadingComponent'
//Helpers  HeaderShown
import { passwordValidator, phoneValidator, emailValidator } from '../helpers/dataValidatorHelpers'


const color = require('../helpers/color.json')

export default function SignInScreen({ navigation }) {

  const [state, dispatch] = React.useContext(Context)

  const refInputPhone = React.createRef();
  const refInputEmail = React.createRef();
  const refInputPassword = React.createRef();

  const [errorForm, setErrorForm] = React.useState({ phone: false, email: false, password: false })
  const [isLoading, setIsLoading] = React.useState(false)

  const [phone, setPhone] = React.useState(false)
  const [email, setEmail] = React.useState(false)
  const [password, setPassword] = React.useState(false)

  const getSignUp = () => {

    // Initialiser le masque
    setIsLoading(true)
    // Initialisation des erreur
    let error = { phone: false, email: false, password: false }
    // Initialisation des données
    let data = {}

    // Si les données télephone sont donées
    const phoneResult = phoneValidator(phone)
    if (phoneResult.error) {
      error.phone = phoneResult.data
    } else {
      data.phone = phoneResult.data
    }

    // Si les données email sont donées
    const emailResult = emailValidator(email)
    if (emailResult.error) {
      error.email = emailResult.data
    } else {
      data.email = emailResult.data
    }

    // Si les données password sont donées
    const passwordResult = passwordValidator(password)
    if (passwordResult.error) {
      error.password = passwordResult.data
    } else {
      data.password = passwordResult.data
    }

    // Si il n'y a pas des erreur
    if (error.password === false && error.phone === false && error.email === false) {

      register(data).then(dataRegister => {
        if (dataRegister.status == 201) {
          const contact = {
            phone: dataRegister.data.phone,
            email: dataRegister.data.email
          }
          addContact(contact)
          const compte = {
            username: dataRegister.data.email,
            password: data.password
          }

          login_ckeck(compte).then(dataLogin => {

            if (dataLogin.token !== undefined) {
              const useCompte = {
                id: dataRegister.data.id,
                api_key: dataLogin.token
              }
              addCompte(useCompte)
              navigation.reset({
                index: 0,
                routes: [{ name: 'Identity' }],
              })
            }
            setIsLoading(false)
          })
        } else {
          if (dataRegister.data) {
            dataRegister.data.forEach(item => {
              if (item.path == 'phone') {
                error.phone = item.message
              }
              if (item.path === 'email') {
                error.email = item.message
              }
              if (item.path == 'password') {
                error.password = item.message
              }
            })
          } else {
            console.log('Error', dataRegister.message)
          }
          setErrorForm(error)
          setIsLoading(false)
        }
      }).catch(e => {
        setIsLoading(false)
        console.log('register error', e)
      })
    } else {
      setIsLoading(false)
      setErrorForm(error)
    }
  }


  async function addContact(data) {
    await dispatch({ type: 'ADD_CONTACT', payload: data });
  }

  async function addCompte(data) {
    await dispatch({ type: 'ADD_COMPTE', payload: data });
  }


  const getSignIn = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'SignIn' }],
    })
  }

  const resteSet = () => {
    setErrorForm({
      phone: false,
      email: false,
      password: false
    })
  }

  const onSubmitEditing = (ref) => {
    if (ref) {
      ref.current.focus()
    } else {
      getSignUp()
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" networkActivityIndicatorVisible={true} barStyle='dark-content' hidden={false} />
      <View style={{ borderBottomColor: '#eee', borderBottomWidth: 1 }}>
        <HeaderShown title="Inscription" />
      </View>
      <ScrollView style={{ padding: 20 }}>
        <View style={styles.head}>
          <Header6
            title="Une police est une collection de lettres. Bien que chaque lettre soit unique, certaines formes sont partagées entre les lettres."
          />
        </View>

        <View style={styles.body}>
          <Input
            refItem={refInputPhone}
            label='Télephone'
            placeholder='+214 74609874'
            onChangeText={(data) => { setPhone(data) }}
            keyboardType='phone-pad'
            maxLength={12}
            icon="md-phone-portrait"
            alert={errorForm.phone}
            onSubmitEditing={() => onSubmitEditing(refInputEmail)}
          />
          <Input
            refItem={refInputEmail}
            label='E-mail'
            placeholder='ericgansa@gamil.com'
            onChangeText={(data) => { setEmail(data) }}
            keyboardType='email-address'
            icon="md-at"
            maxLength={100}
            alert={errorForm.email}
            onSubmitEditing={() => onSubmitEditing(refInputPassword)}
          />
          <Input
            refItem={refInputPassword}
            label='Mot de passe'
            onChangeText={(data) => { setPassword(data) }}
            icon="md-lock"
            //keyboardType='visible-password'
            secureTextEntry={true}
            alert={errorForm.password}
            onSubmitEditing={() => onSubmitEditing()}
          />
          <View style={styles.boxButtom}>
            <Button
              onPress={getSignUp}
              title="Suivant"
            />
          </View>
        </View>
        <View style={styles.foot}>
          <TouchableOpacity style={{ marginVertical: 8 }} onPress={getSignIn}>
            <Header6
              title="Vous avez déjà un compte? Se connecter ici"
              color={color.text.secondary}
              fontWeight="bold"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      {isLoading ? <Loading /> : <View />}
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