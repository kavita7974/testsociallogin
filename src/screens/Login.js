import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  Button,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from "@react-native-google-signin/google-signin";
import auth from '@react-native-firebase/auth';

function Login() {

  
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '580771027753-p3isdrc27lv037s544hq1qnube7tditv.apps.googleusercontent.com',
    });
  }, []);

  
  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      GoogleSignin.signOut();
      const {idToken} = await GoogleSignin.signIn();
      console.log("id is..",idToken)

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      console.log('Signed in with Google!');

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log('error isisisii: ', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Error', 'Sign in action cancelled');
        console.log('user cancelled the login flow');
      } else {
        console.log('some other error happened');
      }
    }
  }

  
  return (
    <>
    <View>
      <Text>Hi</Text>
      <Button
      title="Google Sign-In"
      // onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
      onPress={() => onGoogleButtonPress()}
    />
    </View>
    </>
  )

}

export default Login;