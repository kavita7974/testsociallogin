import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Button, Text, View, StatusBar } from 'react-native'
import SplashScreen from "react-native-splash-screen";
import auth from '@react-native-firebase/auth';
import { useIsFocused } from '@react-navigation/native';



function Dashboard() {
    const userId = auth().currentUser.uid;
    const isFocused = useIsFocused();

    console.log("current user id is.",userId)


    useEffect(() => {
        SplashScreen.hide()
    }, [])

    return (
        <>
            <View>
                <StatusBar backgroundColor="#4f6d7a" barStyle="light-content"></StatusBar>

                <Text>User login successfully</Text>
                <Text>{isFocused ? 'focused' : 'unfocused'}</Text>
            </View>
        </>
    )

}

export default Dashboard