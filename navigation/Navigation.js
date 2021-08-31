import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';

import { Context } from '../store/configureStore'

import HomeScreen from '../screens/HomeScreen'
import DeskScreen from '../screens/DeskScreen'
import OffreScreen from "../screens/OffreScreen"
import RealisationScreen from '../screens/RealisationScreen'
import SettingsScreen from '../screens/settings/SettingsScreen'
import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'
import AvatarScreen from '../screens/AvatarScreen'
import IdentityScreen from '../screens/IdentityScreen'
import ResetingScreen from '../screens/ResetingScreen'
import YourSkillScreen from '../screens/YourSkillScreen'
import SkillsChannelScreen from '../screens/skillsChannelScreen'


const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
const SkillStack = createStackNavigator()
const ProfilStack = createStackNavigator()
const SignUpStack = createStackNavigator()
const HomeStack = createStackNavigator()
const DeskStack = createMaterialTopTabNavigator();

let INITIAL_ROUTE_NAME = 'Home'

const COLOR = require('../helpers/color.json')


export default function Navigation() {

  const [state, dispatch] = React.useContext(Context)
  if (state.compte.api_key) {
    INITIAL_ROUTE_NAME = 'Home'
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: "horizontal",
          ...TransitionPresets.SlideFromRightIOS
        }}
        initialRouteName={INITIAL_ROUTE_NAME}>
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpStackNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Reset" component={ResetingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeTabNavigator} options={({ route }) => ({
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShown: _shouldHeaderBeShown(route),
          title: _getHeaderTitle(route)
        })} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


const SignUpStackNavigator = () => {
  return (
    <SignUpStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
        ...TransitionPresets.SlideFromRightIOS
      }}
      initialRouteName='SignUp'>
      <SignUpStack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
      <SignUpStack.Screen name="Identity" component={IdentityScreen} options={{ headerShown: false }} />
      <SignUpStack.Screen name="Avatar" component={AvatarScreen} options={{ headerShown: false }} />
    </SignUpStack.Navigator>
  )
}


const DeskTabStackNavigator = ({ navigation, route }) => {
  return (
    <DeskStack.Navigator

      tabBarOptions={{
        activeTintColor: COLOR.primary.color,
        showLabel: true,
        indicatorStyle: { backgroundColor: COLOR.primary.color, height: 3 },
        labelStyle: { fontSize: 12, fontWeight: "bold", color: "#000", textTransform: "none" },
      }}
    >
      <DeskStack.Screen name="Mes offres" component={OffreScreen} />
      <DeskStack.Screen name="Mes contract" component={OffreScreen} />
      <DeskStack.Screen name="Mes compétences" component={SkillStackNavigator} />
    </DeskStack.Navigator>
  );
}


const SkillStackNavigator = ({ navigation, route }) => {

  if (route.state) {
    navigation.setOptions({
      tabBarVisible: route.state.index > 0 ? false : true
    })
  }
  return (
    <SkillStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        gestureEnabled: true,
        gestureDirection: "horizontal",
        ...TransitionPresets.SlideFromRightIOS
      }}
      initialRouteName='Desk'>
      <SkillStack.Screen name="Desk" component={DeskScreen} options={{
        title: "Catalogue",
        headerShown: false
      }} />
      <SkillStack.Screen name="Offre" component={OffreScreen} options={{
        title: "Offre",
        headerShown: false
      }} />
      <SkillStack.Screen name="YourSkill" component={YourSkillScreen} options={{
        title: "Competence",
        headerShown: false
      }} />
    </SkillStack.Navigator>
  )
}


const HomeStackNavigator = ({ navigation, route }) => {
  const routeName = getFocusedRouteNameFromRoute(route)

  if (routeName) {
    navigation.setOptions({
      tabBarVisible: route.state.index > 0 ? false : true
    })
  }

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        gestureEnabled: true,
        gestureDirection: "horizontal",
        ...TransitionPresets.SlideFromRightIOS
      }}
      initialRouteName='Home'>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{
        title: "Acceuill",
        headerShown: false
      }} />
      <HomeStack.Screen name="Skill" component={SkillsChannelScreen} options={{
        title: "Competence",
        headerShown: false
      }} />
      <HomeStack.Screen name="Realization" component={RealisationScreen} options={{
        title: "Realisation",
        headerShown: false
      }} />
    </HomeStack.Navigator>
  )
}


const SettingsStackNavigator = ({ navigation, route }) => {
  const routeName = getFocusedRouteNameFromRoute(route)

  if (routeName) {
    navigation.setOptions({
      tabBarVisible: route.state.index > 0 ? false : true
    })
  }
  return (
    <ProfilStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        gestureEnabled: true,
        gestureDirection: "horizontal",
        ...TransitionPresets.SlideFromRightIOS
      }}
      initialRouteName='Settings'>

      <ProfilStack.Screen name="Settings" component={SettingsScreen} options={{
        title: "parametre",
        headerShown: false
      }} />
    </ProfilStack.Navigator>
  )
}


const HomeTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName
        if (route.name == 'Acceuil') {
          iconName = 'home'
        } else if (route.name == 'Bureau') {
          iconName = 'iconfontdesktop'
        } else if (route.name == 'parametre') {
          iconName = 'setting'
        }
        return <AntDesign name={iconName} size={size} color={color} />
      },

    })}

    tabBarOptions={{
      activeTintColor: COLOR.primary.color,
      inactiveTintColor: '#888',
      labelStyle: { marginBottom: 6 },
      iconStyle: { marginTop: 6 }
    }}
  >

    <Tab.Screen name='Acceuil' component={HomeStackNavigator} ></Tab.Screen>
    <Tab.Screen name='Bureau' component={DeskTabStackNavigator}
      options={{ tabBarBadge: 3 }}
    ></Tab.Screen>
    <Tab.Screen name='parametre' component={SettingsStackNavigator}></Tab.Screen>
  </Tab.Navigator>
)

function _getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ? getFocusedRouteNameFromRoute(route) : 'Acceuil'

  switch (routeName) {
    case "Acceuil":
      return "Acceuil"
      break
    case "Bureau":
      return "Bureau"
      break
    case "parametre":
      return "parametre"
      break
  }
}


function _shouldHeaderBeShown(route) {

  const routeName = getFocusedRouteNameFromRoute(route) ? getFocusedRouteNameFromRoute(route) : 'Acceuil'
  if (routeName == "Bureau" || routeName == "parametre" || routeName == "Acceuil") {
    return false
  }
  return true
}