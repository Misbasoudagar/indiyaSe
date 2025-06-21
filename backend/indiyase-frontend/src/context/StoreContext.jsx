import React, { createContext, useReducer, useEffect } from "react";

const initialState = {
  user: null,
  cart: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_CART":
      return { ...state, cart: action.payload };
    case "LOGOUT":
      return { ...state, user: null, cart: [] };
    default:
      return state;
  }
};

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load user from localStorage on refresh
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      dispatch({ type: "SET_USER", payload: JSON.parse(userData) });
    }
  }, []);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
