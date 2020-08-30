import { AsyncStorage } from 'react-native';
import { getUserSkill } from './API/RatisseurApi'

export async function getCompteStorage(){
  let data = '';
  try {
    data = await AsyncStorage.getItem('compte');
  } catch (error) {
    console.log('getCompteStorage', error.message);
  }
  return data
}

export async function getIdentityStorage(){
  let data = '';
  try {
    data = await AsyncStorage.getItem('identity');
  } catch (error) {
    console.log('getIdentityStorage', error.message);
  }
  return data;
}

export async function getMedicalHistoryStorage(){
  let data = '';
  try {
    data = await AsyncStorage.getItem('medicalHistory');
  } catch (error) {
    console.log('getMedicalHistoryStorage', error.message);
  }
  return data;
}

export async function getContactPersonStorage(){
  let data = '';
  try {
    data = await AsyncStorage.getItem('contactPerson');
  } catch (error) {
    console.log('getContactPersonStorage', error.message);
  }
  return data;
}

export async function getContactStorage(compte){
  console.log('getContactStorage', compte)
  let data = '';
  try {
    data = await AsyncStorage.getItem('contact');
  } catch (error) {
    console.log('getContactStorage', error.message);
  }
  return data;
}


export async function getAvatarStorage(){
  let data = '';
  try {
    data = await AsyncStorage.getItem('avatar');
  } catch (error) {
    console.log('getAvatarStorage', error.message);
  }
  return data;
}

export async function getUserSkillsStorage(){
  let data = '';
  try {
    getUserSkill(state.compte.api_key)
    .then((result) => {
      console.log('competence', result.data)
    })
    .catch((e) => {
      console.log(e)
    })
    data = await AsyncStorage.getItem('userSkills');
  } catch (error) {
    console.log('getUserSkillsStorage', error.message);
  }
  return data;
}






export async function setContactPersonStorage(nextState) {
  try {
    await AsyncStorage.setItem('contactPerson', JSON.stringify(nextState.contactPerson))
  } catch (error) {
    console.log('Reducer', error)
  }
}

export async function setContactStorage(nextState) {
  try {
    await AsyncStorage.setItem('contact', JSON.stringify(nextState.contact))
  } catch (error) {
    console.log('contactReducer', error)
  }
}

export async function setIdentityStorage(nextState) {
  try {
    await AsyncStorage.setItem('identity', JSON.stringify(nextState.identity))
  } catch (error) {
    console.log('identityReducer', error)
  }
}

export async function setMedicalHistoryStorage(nextState) {
  try {
    await AsyncStorage.setItem('medicalHistory', JSON.stringify(nextState.medicalHistory))
  } catch (error) {
    console.log('medicalHistoryReducer', error)
  }
}

export async function setCompteStorage(nextState) {
  try {
    await AsyncStorage.setItem('compte', JSON.stringify(nextState.compte))
  } catch (error) {
    console.log('compteReducer', error)
  }
}

export async function setAvatarStorage(nextState) {
  try {
    await AsyncStorage.setItem('avatar', JSON.stringify(nextState.avatar))
  } catch (error) {
    console.log('avatarReducer', error)
  }
}

export async function setUserSkillsStorage(nextState) {
  try {
    await AsyncStorage.setItem('userSkills', JSON.stringify(nextState.userSkills))
  } catch (error) {
    console.log('userSkillsReducer', error)
  }
}

export async function clearCompteStorage() {
  try {
    await AsyncStorage.clear()
  } catch (error) {
    console.log('clearReducer', error)
  }
}



