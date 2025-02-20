import { createContext, useContext, useState, useEffect } from "react";
import { getItem, setItem } from "../utils/utils";

const RentedContext = createContext();

export const RentProvider = ({ children }) => {
  const [rentedState, setRentedState] = useState([]);

  const addRentedMovie = (movie) => {
    setRentedState((prev) => [movie, ...prev]);
  };

  const removeRentedMovie = (id) => {
    setRentedState((prev) => prev.filter((item) => item.id !== id));
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
    setItem(rentedState);
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
