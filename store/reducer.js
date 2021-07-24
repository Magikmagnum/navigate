import {
  setContactPersonStorage,
  setContactStorage,
  setCompteStorage,
  setIdentityStorage,
  setMedicalHistoryStorage,
  setAvatarStorage,
  setUserSkillsStorage,
  clearCompteStorage
} from './asyncStorage'


export default function reducer(state, action) {

  let nextState

  switch (action.type) {

    case 'TOGGLE_CONTACT':
      const contactPersonIndex = state.contactPerson.findIndex(item => item.id === action.payload.id)
      if (contactPersonIndex === -1) {
        // Le film n'est pas dans les films favoris, on l'ajoute à la liste
        nextState = {
          ...state,
          contactPerson: [...state.contactPerson, action.payload]
        }
      } else {
        // Le film est déjà dans les favoris, on le supprime de la liste
        nextState = {
          ...state,
          contactPerson: state.contactPerson.filter((item, index) => index !== contactPersonIndex)
        }
      }

      if (state.contactPerson) {
        setContactPersonStorage(nextState)
        return nextState
      }

      return state



    case 'ADD_CONTACT':
      nextState = {
        ...state,
        contact: {
          email: action.payload.email,
          phone: action.payload.phone,
        },
      }
      setContactStorage(nextState)
      return nextState || state


    case 'ADD_COMPTE':
      nextState = {
        ...state,
        compte: {
          id: action.payload.id,
          api_key: action.payload.api_key
        },
      }

      setCompteStorage(nextState)
      return nextState || state


    case 'LOGIN_COMPTE':
      nextState = {
        ...state,
        compte: {
          api_key: action.payload.token
        },
      }

      setCompteStorage(nextState)
      return nextState || state


    case 'DELETE_COMPTE':
      nextState = {
        compte: {},
        identity: {},
        userSkills: []
      }
      clearCompteStorage()
      return nextState || state


    case 'ADD_IDENTITY':
      nextState = {
        ...state,
        identity: {
          id: action.payload.id,
          name: action.payload.name,
          brithday: action.payload.brithday,
          sexe: action.payload.sexe,
        }
      }

      setIdentityStorage(nextState)

      return nextState || state


    case 'ADD_AVATAR':
      nextState = {
        ...state,
        avatar: action.payload,
      }

      setAvatarStorage(nextState)

      return nextState || state


    case 'TOGGLE_SKILL':

      const skillIndex = state.userSkills.findIndex(item => item.id === action.payload.id)
      if (skillIndex === -1) {
        // Le film n'est pas dans les films favoris, on l'ajoute à la liste
        nextState = {
          ...state,
          userSkills: [action.payload, ...state.userSkills]
        }
      } else {
        // Le film est déjà dans les favoris, on le supprime de la liste
        nextState = {
          ...state,
          userSkills: state.userSkills.filter((item, index) => index !== skillIndex)
        }
      }

      if (state.userSkills) {
        setUserSkillsStorage(nextState)
        return nextState
      }

      return state


    case 'UPDATE_SKILL_LIST':

      nextState = {
        ...state,
        userSkills: action.payload
      }

      if (state.userSkills) {
        setUserSkillsStorage(nextState)
        return nextState
      }

      return state

    default:
      return state
  }

}
