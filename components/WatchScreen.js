import { View, Text, Button, StyleSheet } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useRentedContext } from "../context/RentedContext";
import { useNavigation } from "@react-navigation/native";
import { useDeviceOrientation } from "@react-native-community/hooks";
import { useVideoPlayer, VideoView } from "expo-video";
import { videoSRC } from "../constants/constants";
import { useEventListener } from "expo";

const WatchScreen = ({ route }) => {
  const {  removeRentedMovie } = useRentedContext();
  const orientation = useDeviceOrientation();
  const [orient, setOrient] = useState("portrait");
  const [isPlaying, setIsPlaying] = useState(false);

  const player = useVideoPlayer(videoSRC, (player) => {
    player.play();
    setIsPlaying(true);
  });

  // listens to the event to know whether the video is paused or not.
  useEventListener(player, "playingChange", ({ isPlaying }) => {
    setIsPlaying(isPlaying);
  });

  const vidView = useRef(null);

  const nav = useNavigation();

  const { id, title } = route.params;

  const movieWatched = () => {
    removeRentedMovie(id);
    nav.goBack();
  };

  useEffect(() => {
    setOrient(orientation);
    if (orientation === "landscape") {
      vidView.current?.enterFullscreen();
    } else {
      vidView.current?.exitFullscreen();
    }
  }, [orientation]);

  useEffect(() => {
    if (isPlaying) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [player]);

  function paused() {
    player.pause();
    setIsPlaying(false);
  }

  function resume() {
    player.play();
    setIsPlaying(true);
  }

  return (
    <View style={style.container}>
      <Text style={style.title}>{title}</Text>

      <VideoView
        ref={vidView}
        player={player}
        allowsFullscreen
        style={style.video}
      ></VideoView>

      <View style={style.buttonContainer}>
        {!isPlaying && (
          <Button title="Resume" color="#FF6347" onPress={resume}></Button>
        )}

        {isPlaying ? (
          <Button title="Pause" onPress={paused} color="#FF6347" />
        ) : (
          <Button
            title="Mark as Watched"
            onPress={movieWatched}
            color="#32CD32"
          />
        )}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#888",
  },
  orientation: {
    fontSize: 16,
    color: "#888",
    marginBottom: 20,
  },
  video: {
    width: "100%",
    height: 275,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 50,
  },
});

export default WatchScreen;
