import React, { createContext, useReducer } from "react";
import { rootReducer } from "./rootReducer";
import { getLocalStorage } from "../utils/localStorage";
import getRandomNumber from "../helpers/getRandomNumber";
import MAX_TIME from "../config/config";
export const ProviderContext = createContext();
export default function Provider({ children }) {
  const initialState = {
    loading: false,
    turn: 0,
    result: false,
    data: getLocalStorage("data") || [],
    randomNumber: getRandomNumber(),
  };
  const [state, dispatch] = useReducer(rootReducer, initialState);
  return (
    <ProviderContext.Provider value={{ state, dispatch }}>
      {children}
    </ProviderContext.Provider>
  );
}
