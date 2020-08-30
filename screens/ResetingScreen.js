import React from 'react'
import { StyleSheet, View, StatusBar, TouchableOpacity, ScrollView} from 'react-native'
import { Input, Button } from '../components/formComponent'
import { Header2, Header6 } from '../components/typoComponent'
import { Loading } from '../components/loadingComponent'

const color = require('../helpers/color.json')

export default function SignInScreen({ navigation }) { 
    
  const [value1, onChangeText1] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
    
    const refInput1 = React.createRef();

    const getResetting = () => {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      }, 1000);
    }

    const getSignIn = () => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'SignIn' }],
      })
    }

    const onSubmitEditing = (ref) => {
      if (ref) {
        ref.current.focus()
      } else {
        getResetting ()
      }
    }

    return(
      <View style={styles.container}>
        <ScrollView style={{padding:20}}>
          <StatusBar backgroundColor="#fff" networkActivityIndicatorVisible={true} barStyle='dark-content' hidden={false}/>

          <View style={styles.head}>
            <Header2 
              title='Récupération'
            />
            <Header6
              title="Une police est une collection de lettres. Bien que chaque lettre soit unique, certaines formes sont partagées entre les lettres."
            />
          </View>
          

          <View style={styles.body}>
            <Input 
              refItem={refInput1}
              label='E-mail'
              placeholder='ericgansa@gamil.com'
              onChangeText={onChangeText1}
              keyboardType='email-address'
              icon="md-person"
              maxLength={100}
              onSubmitEditing={() => onSubmitEditing()}
            />
  
            <View style={styles.boxButtom}>
              <Button
                onPress={getResetting}
                title="Envoyer"
              />
            </View>
            
          </View>
          
          <View style={styles.foot}>
            <TouchableOpacity style={{ marginVertical: 8}} onPress={getSignIn}>
              <Header6
                title="Vous avez un compte ? Se connecter ici"
                color={color.text.secondary}
                fontWeight="bold"
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
       
        {isLoading ? <Loading/> : <View/>}
      </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: "center",
    },
    head: {
      marginBottom: 48
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



