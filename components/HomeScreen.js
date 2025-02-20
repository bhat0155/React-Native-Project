import {
  View,
  Text,
  Button,
  TextInput,
  Alert,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useSearchContext } from "../context/SearchContext";
import { FAB, Dialog } from "@rneui/themed";
import MovieCard from "./MovieCard";
import { useTheme } from "@rneui/themed";

const HomeScreen = () => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { fetchMovies, searchState, error } = useSearchContext();
  const { theme, updateTheme } = useTheme();

  console.log(theme.colors.background);

  const openDialog = () => {
    setDialogVisible(true);
  };

  const setSearch = (ev) => {
    setKeyword(ev);
  };

  const callTheFetch = () => {
    setKeyword("");
    setDialogVisible(false);

    if (!keyword.trim()) {
      Alert.alert("please provide a value in the searchbar");
    }
    if (keyword) {
      fetchMovies(keyword);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {error ? (
        <View>
          <Text>Error Fetching the Data, Please try after some time.</Text>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: theme.colors.background,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {searchState.length === 0 && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: theme.txt.md }}>
                Welcome
              </Text>
              <Image
                source={require("../assets/TV_Image.png")}
                style={{
                  width: 150,
                  height: 150,
                  marginBottom: 10,
                  resizeMode: "contain",
                }}
              />
            </View>
          )}

          {searchState.length > 0 && (
            <FlatList
              data={searchState}
              renderItem={({ item }) => (
                <MovieCard movie={item} button="rent" />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          )}

          {dialogVisible && (
            <Dialog>
              <Dialog.Title title="Find a movie to rent" />
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 5,
                  padding: 10,
                  fontSize: 16,
                }}
                onChangeText={(ev) => setSearch(ev)}
                value={keyword}
                placeholder="eg: superman"
              />
              <Dialog.Actions>
                <Button title="search" onPress={callTheFetch} />
                <Button title="back" onPress={() => setDialogVisible(false)} />
              </Dialog.Actions>
            </Dialog>
          )}

          <FAB
            visible={true}
            onPress={openDialog}
            placement="right"
            icon={{ name: "search", color: "black" }}
            color="#ebf5ee"
            style={{
              position: "absolute",
              bottom: 40,
              right: 20,
            }}
          />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
