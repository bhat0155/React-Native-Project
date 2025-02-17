import { View, Text, Button } from "react-native";
import React from "react";
import { useRentedContext } from "../context/RentedContext";
import { useNavigation } from "@react-navigation/native";

const WatchScreen = ({ route }) => {
  const { addRentedMovie, removeRentedMovie, rentedState } = useRentedContext();

  const nav = useNavigation();

  const { id, title } = route.params;
  console.log(id);

  const movieWatched = () => {
    removeRentedMovie(id);

    nav.goBack();
  };

  return (
    <View>
      <Text>WatchScreen</Text>
      <Text>{id}</Text>
      <Text>{title}</Text>
      <Button title="mark as watched" onPress={movieWatched}></Button>
    </View>
  );
};

export default WatchScreen;
