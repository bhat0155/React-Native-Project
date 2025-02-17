import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import { Button } from "@react-navigation/elements";

const RentScreen = () => {
    const nav = useNavigation();
    function goTo(x) {
      nav.navigate(x);
    }
    return (
      <View>
        <Text>RentScreen</Text>
        <Button title="watch" onPressIn={() => goTo("Watch")}>WatchScreen</Button>
      </View>
    );
}

export default RentScreen