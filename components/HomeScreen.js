import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { URL, ACCESS_TOKEN } from "../constants/constants";
import { useSearchContext } from "../context/SearchContext";
import { FAB } from "@rneui/themed";

const HomeScreen = () => {
  const [visible, setVisible] = useState(true);

  const openDialog = () => {
    console.log("Fab clicked");
  };

  return (
    <View style={{ flex: 1 }}>
      <Text>HomeScreen</Text>

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
    </View>
  );
};

export default HomeScreen;
