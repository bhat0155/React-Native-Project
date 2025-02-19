import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/HomeScreen";
import RentScreen from "./components/RentScreen";
import WatchScreen from "./components/WatchScreen";
import { SearchProvider } from "./context/SearchContext";
import { RentProvider } from "./context/RentedContext";
import { ThemeProvider } from "@rneui/themed"; 
import { theme } from "./theme/theme";


export default function App() {
  const Stack = createNativeStackNavigator();

  return (
   <ThemeProvider theme={theme}>
     <RentProvider>
      <SearchProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={({ navigation }) => ({
                headerRight: () => {
                  return (
                    <Button
                      title="Rented"
                      onPress={() => navigation.navigate("Rent")}
                    />
                  );
                },
              })}
            ></Stack.Screen>
            <Stack.Screen name="Rent" component={RentScreen}></Stack.Screen>
            <Stack.Screen name="Watch" component={WatchScreen}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </SearchProvider>
    </RentProvider>
   </ThemeProvider>
  );
}
