import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons'
import { Image, View, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native'

import { HeaderShown } from '../components/cardsComponent'
import { Context } from '../store/configureStore'
import { Loading, handleFailure, handleSuccess } from '../components/loadingComponent'

export default function AvatarScreen({ setModalVisible }) {

  const [state, dispatch] = React.useContext(Context)
  const navigation = useNavigation()

  const [image, setImage] = useState(state.avatar)
  const [isLoading, setIsLoading] = React.useState(false)
  const [loadingSuccess, setLoadingSuccess] = React.useState(false)
  const [loadingFailure, setLoadingFailure] = React.useState(false)

  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Désolé, nous avons besoin des autorisations image pour que cela fonctionne!');
        }
      }
    })()
  }, [])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
    });

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  const _handleSaveImge = (data) => {
    setIsLoading(true)
    addAvatar(data)
    handleSuccess(setIsLoading, setLoadingSuccess, (() => navigation.navigate('Home')))
  }

  async function addAvatar(data) {
    await dispatch({ type: 'ADD_AVATAR', payload: data })
  }

  return (
    <>
      <SafeAreaView>
        <HeaderShown title="Photo de profil" icon='md-arrow-back' theme='dark' callback={(() => setModalVisible(false))} iconRight='md-create' callbackRight={(pickImage)} />
      </SafeAreaView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#111' }}>
        {
          image ?
            <>
              <Image source={{ uri: image }} style={{ width: 300, height: 300, borderRadius: 12, marginBottom: 50 }} />
              <TouchableOpacity onPress={() => _handleSaveImge(image)} style={{ borderColor: '#fff', borderWidth: 1, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12 }}>
                <Text style={{ color: '#fff', fontSize: 16 }}>VALIDER</Text>
              </TouchableOpacity>
            </>
            :
            <>
              <TouchableOpacity onPress={pickImage} style={{ padding: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', }}>
                <Ionicons name={'md-image'} color={'#fff'} size={100} />
                <Text style={{ color: '#fff', fontSize: 16, marginTop: 20, lineHeight: 28, textAlign: 'center' }}>Selectionez une photo en cliquant sur icone de crayon en haut à droit ou sur le centre de l'écrant</Text>
              </TouchableOpacity>
            </>
        }
        {isLoading ? <Loading success={loadingSuccess} failure={loadingFailure} /> : <View />}
      </View>
    </>
  );
}
