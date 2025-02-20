import { View, Text, FlatList } from "react-native";
import React from "react";
import { useRentedContext } from "../context/RentedContext";
import MovieCard from "./MovieCard";
import { useTheme } from "@rneui/themed";

const RentScreen = () => {
  const { rentedState } = useRentedContext();
  console.log({ rentedState });
  console.log(rentedState.length);
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.background,
      }}
    >
      {rentedState.length > 0 && (
        <Text style={{ marginBlock: 4 }}>
          {rentedState.length} rented movies
        </Text>
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
