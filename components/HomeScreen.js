import { View, Text, Button } from "react-native";
import React, { useEffect } from "react";
import { URL, ACCESS_TOKEN } from "../constants/constants";
import { useSearchContext } from "../context/SearchContext";

const HomeScreen = () => {
  // const { fetchMovies, searchState } = useSearchContext();

  // useEffect(() => {
  //   console.log("initial");

  //   fetchMovies(URL, "munna");
  // }, []);
  // console.log(searchState);

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
