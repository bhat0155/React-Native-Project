import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Card, Button, Icon } from "@rneui/themed";
import { IMG_URL, FALLBACK_POSTER } from "../constants/constants";
import { useRentedContext } from "../context/RentedContext";
import { useNavigation } from "@react-navigation/native";
import { Dialog } from "@rneui/themed";
import { useSearchContext } from "../context/SearchContext";

const MovieCard = ({ movie, button }) => {
  const [dialogVisible, setDialogVisible] = useState(false);

  const nav = useNavigation();
  const { addRentedMovie } = useRentedContext();
  const { removeMovie } = useSearchContext();

  const rentedButton = () => {
    setDialogVisible(true);
  };

  const wantsToRent = () => {
    console.log("rented button clicked");
    addRentedMovie(movie);
    removeMovie(movie.id);
    setDialogVisible(false);
  };

  const watchButton = () => {
    console.log("watch button clicked");
    console.log(movie.title);
    nav.navigate("Watch", {
      title: movie.title,
      id: movie.id,
    });
  };

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardTitle}>{movie.title}</Card.Title>
        <Card.Divider />
        <Card.Image
          style={styles.cardImage}
          source={{
            uri: movie.poster_path
              ? `${IMG_URL}${movie.poster_path}`
              : FALLBACK_POSTER,
          }}
        />
        <Text style={styles.cardDescription}>
          {movie.overview.length > 100
            ? `${movie.overview.substring(0, 100)}...`
            : movie.overview}
        </Text>

        {button === "rent" ? (
          <Button
            icon={
              <Icon
                name="rocket"
                color="#ffffff"
                iconStyle={styles.iconStyle}
              />
            }
            buttonStyle={styles.rentButton}
            title="Rent"
            onPress={rentedButton}
          />
        ) : (
          <Button
            icon={
              <Icon name="tv" color="#ffffff" iconStyle={styles.iconStyle} />
            }
            buttonStyle={styles.watchButton}
            title="Watch"
            onPress={watchButton}
          />
        )}
      </Card>
      {dialogVisible && (
        <Dialog>
          <Dialog.Title title="Are you sure you wanna rent?" />

          <Dialog.Actions>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Button title="Cancel" onPress={() => setDialogVisible(false)} />
              <Button title="Accept" onPress={wantsToRent} />
            </View>
          </Dialog.Actions>
        </Dialog>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  card: {
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    backgroundColor: "#ebf5ee",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardImage: {
    height: 200, // Increased height for a clearer image
    width: "100%",
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: "contain", // Maintain aspect ratio without cutting the image
    // borderWidth: 1, // Optional: add a border for style
    // borderColor: '#ddd', // Optional: light border color for contrast
  },
  cardDescription: {
    fontSize: 12,
    color: "#555",
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  iconStyle: {
    marginRight: 10,
  },
  rentButton: {
    borderRadius: 20,
    marginTop: 5,
    backgroundColor: "#4a90e2",
  },
  watchButton: {
    borderRadius: 20,
    marginTop: 5,
    backgroundColor: "#4a90e2",
  },
});

export default MovieCard;
