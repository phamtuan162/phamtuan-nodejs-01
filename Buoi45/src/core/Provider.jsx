import React, { createContext, useReducer } from "react";
import { rootReducer } from "./rootReducer";
import { getLocalStorage } from "../utils/localStorage";
import getRandomNumber from "../helpers/getRandomNumber";
import MAX_TIME from "../config/config";
export const ProviderContext = createContext();
const data = getLocalStorage("data");

export default function Provider({ children }) {
  const initialState = {
    turn: data.length || 0,
    timeCurrent: MAX_TIME,
    data: data || [],
    randomNumber: getRandomNumber(),
    isAddTable: false,
    message: "Chào mừng bạn đến với trò chơi đoán số!",
  };
  const [state, dispatch] = useReducer(rootReducer, initialState);
  return (
    <ProviderContext.Provider value={{ state, dispatch }}>
      {children}
    </ProviderContext.Provider>
  );
}
