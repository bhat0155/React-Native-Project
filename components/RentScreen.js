import { View, Text, FlatList } from "react-native";
import React from "react";
import { useRentedContext } from "../context/RentedContext";
import { useSearchContext } from "../context/SearchContext";
import MovieCard from "./MovieCard";
import WatchScreen from "./WatchScreen";

const RentScreen = () => {
  const { fetchMovies, removeMovie, searchState } = useSearchContext();
  const { addRentedMovie, removeRentedMovie, rentedState } = useRentedContext();
  console.log({ rentedState });

  return (
    <View>
      {rentedState == "undefined" ? (
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
