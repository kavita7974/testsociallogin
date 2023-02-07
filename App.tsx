import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import LoginScreen from './src/screens/Login';
import DashboardScreen from './src/screens/Dashboard';
import SplashScreenExample from './src/screens/SplashScreenExample'
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native'


const Stack = createNativeStackNavigator();

function Login() {
  const [user, setUser] = useState("")

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const requestUserPermission = async () =>{
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

useEffect(() => {
  getFCMTokken();
  requestUserPermission()

  // messaging()
  //     .getInitialNotification()
  //     .then(async (remoteMessage) => {
  //       //remoteMessage --> is now filled 
  //       console.log('getInitialNotification', remoteMessage);
  //     });

}, []);

const getFCMTokken = async () => {
  let fcmToken = await messaging().getToken();
  console.log("fcm token is....",fcmToken)
  // await AsyncStorage.setItem('fcmToken',fcmToken)

  // It will trigger when app is in background
  // messaging().onNotificationOpenedApp(remoteMessage => {
  //   Alert.alert(JSON.stringify(remoteMessage))

  // });

  // It will trigger when app is in quit mode
  // messaging().getInitialNotification((remoteMessage: any) => {
  //   console.log("remote message is...",remoteMessage)
  //   Alert.alert(JSON.stringify(remoteMessage))
  // });
  
  messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        //remoteMessage --> is now filled 
        console.log('quit mode', remoteMessage);
      });

  // messaging().setBackgroundMessageHandler(remoteMessage => {
  //   Alert.alert(JSON.stringify(remoteMessage))
  // });

 // It will trigger when app is in foreground
  messaging().onMessage(async remoteMessage => {
    console.log("foreground is",JSON.stringify(remoteMessage))
  });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log("background is",JSON.stringify(remoteMessage))
  });

  // const unsubscribe = messaging().onMessage(async remoteMessage => {
    // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));

  // });

  // return unsubscribe;
};

  function onAuthStateChanged(user: any) {
    console.log("user is..", user)
    setUser(user)
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          {user ?
            <Stack.Screen name="dashboard" component={DashboardScreen} options={{ title: 'Dashboard' }}></Stack.Screen> :
            <Stack.Screen name="login" component={LoginScreen} options={{ title: 'Login' }}></Stack.Screen>}



            {/* <Stack.Screen name="splashScreenEx" component={SplashScreenExample} options={{ title: 'Login' }}/> */}

        </Stack.Navigator>
      </NavigationContainer>

    </>
  )



}
export default Login;