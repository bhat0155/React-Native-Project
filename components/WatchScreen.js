import { View, Text, Button, StyleSheet } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useRentedContext } from "../context/RentedContext";
import { useNavigation } from "@react-navigation/native";
import { useDeviceOrientation } from "@react-native-community/hooks";
import { useVideoPlayer, VideoView } from "expo-video";
import { videoSRC } from "../constants/constants";

const WatchScreen = ({ route }) => {
  const { addRentedMovie, removeRentedMovie, rentedState } = useRentedContext();
  const orientation = useDeviceOrientation();
  const [orient, setOrient] = useState("portrait");

  console.log(videoSRC);

  const player = useVideoPlayer(videoSRC, (player) => {
    console.log(player.width, player.volume);
    player.play();
  });

  const vidView = useRef(null);

  const nav = useNavigation();

  const { id, title } = route.params;
  console.log(id);

  const movieWatched = () => {
    removeRentedMovie(id);

    nav.goBack();
  };

  useEffect(() => {
    setOrient(orientation);
    if (orientation == "landscape") {
      console.log("ekam", vidView.current);

      vidView.current?.enterFullscreen();
    } else {
      vidView.current?.exitFullscreen();
    }
  }, [orientation]);

  return (
    <View>
      <Text>WatchScreen</Text>
      <Text>{id}</Text>
      <Text>{title}</Text>
      <Text>{orient}</Text>
      <VideoView
        ref={vidView}
        player={player}
        allowsFullscreen
        style={style.video}
      ></VideoView>

      <Button title="mark as watched" onPress={movieWatched}></Button>
    </View>
  );
};

const style = StyleSheet.create({
  video: {
    width: 350,
    height: 275,
  },
});

export default WatchScreen;
