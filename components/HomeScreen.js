import { View, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@react-navigation/elements";

const HomeScreen = () => {
  const nav = useNavigation();
  function goTo(x) {
    nav.navigate(x);
  }
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="rented" onPressIn={() => goTo("Rent")}>Rented</Button>
    </View>
  );
};

export default HomeScreen;
