import { createContext, useContext, useState, useEffect } from "react";
import { STORAGE_KEY } from "../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RentedContext = createContext();

export const RentProvider = ({ children }) => {
  const [rentedState, setRentedState] = useState([]);

  const addRentedMovie = (movie) => {
    setRentedState((prev) => [...prev, movie]);
  };

  const removeRentedMovie = (id) => {
    setRentedState((prev) => prev.filter((item) => item.id !== id));
  };

  const getItem = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (err) {
      console.log("we cannot read from local storage", err);
      return [];
    }
  };

  const setItem = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(rentedState));
    } catch (err) {
      console.log("we cannot setItem in local storage", err);
    }
  };

  // if rented button on the home screen is clicked, this hook will be called

  useEffect(() => {
    const loadData = async () => {
      const data = await getItem();
      if (data) {
        setRentedState(data);
      }
    };
    loadData();
  }, []);

  // this useEffect will run when the state variable will changed either for adding or removing the item

  useEffect(() => {
    setItem();
  }, [rentedState]);

  return (
    <RentedContext.Provider
      value={{ addRentedMovie, removeRentedMovie, rentedState }}
    >
      {children}
    </RentedContext.Provider>
  );
};

export const useRentedContext = () => {
  const context = useContext(RentedContext);
  if (!context) {
    throw new Error("Mismatch Minnamed context");
  }
  return context;
};
