import { createContext, useContext, useState } from "react";

import { URL, ACCESS_TOKEN } from "../constants/constants";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchState, setSearchState] = useState([]);

  // fetches movie and updates the state variable
  const fetchMovies = async (keyword) => {
    try {
      const response = await fetch(`${URL}${keyword}`, {
        method: "GET",
        headers: {
          accepts: "application/json",
          authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      const data = await response.json();
      console.log("this is coming from searchContext", data.results)
      setSearchState(data.results);
    } catch (err) {
      console.log("fetch error", err);
    }
  };

  // removes the movie from state variable and sets the new state
  const removeMovie = (id) => {
    setSearchState((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    // This will give the access of methods to the children on which this will be wrapped
    <SearchContext.Provider value={{ fetchMovies, removeMovie, searchState }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  // this gives our hook access to global context object
  // Our components can access methods, variable through this.
  if (!context) {
    throw new Error("Mismatch Minnamed context");
  }
  return context;
};
