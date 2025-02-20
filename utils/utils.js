import { STORAGE_KEY } from "../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getItem = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (err) {
    console.log("we cannot read from local storage", err);
    return [];
  }
};

export const setItem = async (rentedState) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(rentedState));
  } catch (err) {
    console.log("we cannot setItem in local storage", err);
  }
};
