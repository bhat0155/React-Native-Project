import { View, Text, FlatList } from "react-native";
import React from "react";
import { useRentedContext } from "../context/RentedContext";
import MovieCard from "./MovieCard";
import WatchScreen from "./WatchScreen";

const RentScreen = () => {
  const { addRentedMovie, removeRentedMovie, rentedState } = useRentedContext();
  console.log({ rentedState });
  console.log(rentedState.length);

  return (
    <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
      {rentedState.length > 0 && (
        <Text style={{marginBlock:4}}>{rentedState.length} rented movies</Text>
      )}
      {rentedState == "undefined" || rentedState.length == 0 ? (
        <View>
          <Text>Nothing to rent</Text>
        </View>
      ) : (
        <FlatList
          data={rentedState}
          renderItem={({ item }) => <MovieCard movie={item} button="watch" />}
          keyExtractor={(item) => item?.id.toString()}
        />
      )}
    </View>
  );
};

export default RentScreen;
