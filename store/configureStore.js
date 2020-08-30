import React, { createContext, useReducer, useEffect } from "react";
import reducer from './reducer'
import { getCompteStorage, getContactStorage, getIdentityStorage, getAvatarStorage, getUserSkillsStorage } from './asyncStorage'
import { View, ActivityIndicator } from 'react-native';
import { getUser } from './API/RatisseurApi'

const initialState = {}
const color = require('../helpers/color.json')

export const Context = createContext(initialState);

const Store = ({ children }) => {

  const [isLoading, setIsloading] = React.useState(false)

  useEffect(() => {
    const storage = async () => {
      await getCompteStorage().then((data) => {
        if (data) {
          initialState.compte = JSON.parse(data)
          getContactStorage(initialState.compte).then((data) => { data ? initialState.contact = JSON.parse(data) : initialState.contact = {} }).catch(initialState.contact = {})
          getIdentityStorage(initialState.compte).then((data) => { data ? initialState.identity = JSON.parse(data) : initialState.identity = {} }).catch(initialState.identity = {})
          getUserSkillsStorage(initialState.compte).then((data) => { data ? initialState.userSkills = JSON.parse(data) : initialState.userSkills = [] }).catch(initialState.userSkills = [])
          getAvatarStorage(initialState.compte).then((data) => { data ? initialState.avatar = JSON.parse(data) : initialState.avatar = false }).catch(initialState.avatar = false)
        } else {
          initialState.compte = {}
        }
      }).catch(
        initialState.compte = {}
      )
    }

    storage().then(() => {
      setIsloading(true)
    }).catch(e =>
      console.log('Stogare', e.message)
    )
  }, [])



  if (isLoading) {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
      <Context.Provider value={[state, dispatch]}>
        {children}
      </Context.Provider>
    )
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <Context.Provider value={[state, dispatch]}>
      <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator style={{ padding: 12 }} size="large" color={color.primary.color} />
      </View>
    </Context.Provider>
  )
};

export default Store;
