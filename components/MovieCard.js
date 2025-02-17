import { View, Text, FlatList } from "react-native";
import React from "react";
import { Card, Button, Icon } from "@rneui/themed";
import { IMG_URL } from "../constants/constants";
import { FALLBACK_POSTER } from "../constants/constants";
import { useRentedContext } from "../context/RentedContext";
import { useNavigation } from "@react-navigation/native";

const MovieCard = ({ movie, button }) => {
  const nav = useNavigation();
  console.log({ movie, button });
  const { addRentedMovie, removeRentedMovie, rentedState } = useRentedContext();

  const rentedButton = () => {
    console.log("rented buton clicked");
    addRentedMovie(movie);
  };

  const watchButton = () => {
    console.log("watch buton clicked");
    console.log(movie.title);
    nav.navigate("Watch", {
      title: movie.title,
      id: movie.id
    });
  };

  return (
    <View>
      <Card>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Divider />
        <Card.Image
          style={{
            objectFit: "cover",
            padding: 0,
            aspectRatio: 2 / 3,
            height: undefined,
            resizeMode: "cover",
            paddingBottom: 10,
          }}
          source={{
            uri: movie.poster_path
              ? `${IMG_URL}${movie.poster_path}`
              : FALLBACK_POSTER,
          }}
        />
        <Text style={{ marginBottom: 10 }}>{movie.overview}</Text>

        {button == "rent" ? (
          <Button
            icon={
              <Icon
                name="rocket"
                color="#ffffff"
                iconStyle={{ marginRight: 10 }}
              />
            }
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            title="Rent"
            onPress={rentedButton}
          />
        ) : (
          <Button
            icon={
              <Icon name="tv" color="#ffffff" iconStyle={{ marginRight: 10 }} />
            }
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            title="Watch"
            onPress={watchButton}
          />
        )}
      </Card>
    </View>
  );
};

export default MovieCard;
