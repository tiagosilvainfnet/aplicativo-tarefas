import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { IconButton, Switch } from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { isLoggedIn, reautenticate } from './services/auth';
import { verifyTheme } from './services/util';
import { saveStorage } from './services/storage';

import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Register from './pages/Register';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

import { darkTheme, lightTheme } from './theme';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator  } from '@react-navigation/stack';

import {
  pt,
  registerTranslation,
} from 'react-native-paper-dates'

const firebaseConfig = {
  apiKey: "AIzaSyDoRTeLHqqQmha9VLMLABGXKY3bL0dk1m4",
  authDomain: "aplicativo-tarefas-28fda.firebaseapp.com",
  projectId: "aplicativo-tarefas-28fda",
  storageBucket: "aplicativo-tarefas-28fda.appspot.com",
  messagingSenderId: "266240844586",
  appId: "1:266240844586:web:e4bc9a0b1452c44813b453",
  measurementId: "G-H2DNSNNTDE"
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

registerTranslation('pt', pt)

export default function App() {
  const [modeColor, setModeColor] = useState('light');
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const initApp = async () => {
    setUserLoggedIn(await isLoggedIn());
    verifyTheme(setModeColor);
  }

  useEffect(() => {
      reautenticate(firebaseApp);
      initApp();
  }, [])

  const changeThemeColor = () => {
    return <>
            <Switch 
              value={modeColor === "dark"}
              onValueChange={() => {
                let m = modeColor === "light" ? "dark" : "light";
                setModeColor(m)
                saveStorage("modeColor", m)
              }}
            />
          </>
  }

  return (
    <PaperProvider theme={modeColor === 'light' ? lightTheme : darkTheme}>
      <NavigationContainer>
        
        {
          userLoggedIn ?
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                  const icons = {
                    Home: 'home',
                    Profile: 'account',
                  };
            
                  return (
                    <MaterialCommunityIcons
                      name={icons[route.name]}
                      color={color}
                      size={size}
                    />
                  );
                },
                tabBarActiveTintColor: modeColor === 'light' ? lightTheme.colors.primary : darkTheme.colors.primary,
                tabBarInactiveTintColor: modeColor === 'light' ? 'gray' : "#fff",
              })}
              initialRouteName="Home"
              >
                <Tab.Screen 
                  name="Home" 
                  component={Home}
                  options={{
                    title: "Minhas tarefas",
                    headerStyle: {
                      backgroundColor: modeColor === 'light' ? lightTheme.colors.headerBackground : darkTheme.colors.headerBackground,
                    },
                    headerTintColor:  modeColor === 'light' ? lightTheme.colors.headerColorText : darkTheme.colors.headerColorText,
                    headerRight: () => changeThemeColor(),
                    tabBarStyle: {
                      backgroundColor: modeColor === 'light' ? lightTheme.colors.headerBackground : darkTheme.colors.headerBackground,
                    }
                  }}
                  />
                <Tab.Screen 
                  name="Profile" 
                  component={Profile}
                  options={{
                    title: "Perfil",
                    headerStyle: {
                      backgroundColor: modeColor === 'light' ? lightTheme.colors.headerBackground : darkTheme.colors.headerBackground,
                    },
                    headerTintColor:  modeColor === 'light' ? lightTheme.colors.headerColorText : darkTheme.colors.headerColorText,
                    headerRight: () => changeThemeColor(),
                    tabBarStyle: {
                      backgroundColor: modeColor === 'light' ? lightTheme.colors.headerBackground : darkTheme.colors.headerBackground,
                    }
                  }}  
                  initialParams={{
                    modeColor,
                    setUserLoggedIn,
                    firebaseApp
                  }}
                />
              </Tab.Navigator> 
              :
              <Stack.Navigator
                initialRouteName="Login">
                <Stack.Screen 
                  name="Login" 
                  component={Login} 
                  options={{
                    headerShown: false
                  }}
                  initialParams={{
                    firebaseApp,
                    setUserLoggedIn
                  }}
                  />
                <Stack.Screen 
                  name="Register" 
                  component={Register} 
                  options={{
                    headerShown: false
                  }}
                  initialParams={{
                    firebaseApp,
                    setUserLoggedIn
                  }}/>
              </Stack.Navigator>

        }
      </NavigationContainer>
    </PaperProvider>
  );
}

