import { View, Text, Button, TextInput, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { URL, ACCESS_TOKEN } from "../constants/constants";
import { useSearchContext } from "../context/SearchContext";
import { FAB, Dialog } from "@rneui/themed";

const HomeScreen = () => {
  const [visible, setVisible] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [keyword, setKeyword] = useState("");

  const { fetchMovies, removeMovie, searchState } = useSearchContext();

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
      <Text>HomeScreen</Text>
      {dialogVisible && (
        <Dialog>
          {/* <Button
            title="Back"
            onPress={() => {
              setDialogVisible(false);
            }}
          ></Button> */}

          <Dialog.Title title="Find a movie to rent"></Dialog.Title>
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
          <Button title="search" onPress={callTheFetch} style={{}}></Button>
          <Button title="back" onPress={()=> setDialogVisible(false)} style={{}}></Button>


          </Dialog.Actions>
        </Dialog>
      )}

      <FAB
        visible={visible}
        onPress={openDialog}
        placement="right"
        icon={{ name: "search", color: "black" }}
        color="orange"
        style={{
          position: "absolute",
          bottom: 40,
          right: 20,
        }}
      />
      {searchState &&
        searchState.map((item) => {
          return <Text key={item.id}>{item.title}</Text>;
        })}
    </View>
  );
};

export default HomeScreen;
