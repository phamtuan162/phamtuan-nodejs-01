import {
  setLocalStorage,
  getLocalStorage,
  clearLocalStorage,
} from "../utils/localStorage";
import getRandomNumber from "../helpers/getRandomNumber";
import MAX_TIME from "../config/config";
export const rootReducer = (state, action) => {
  switch (action.type) {
    case "form/submit": {
      const newData = [...state.data];
      const timeNewCurrent = state.timeCurrent - 1;
      newData[state.turn] = Array.isArray(newData[state.turn])
        ? [...newData[state.turn]]
        : [];

      const newItem = {
        ...action.payload,
        time: newData[state.turn].length + 1,
        right: action.payload.number === state.randomNumber ? true : undefined,
        message: undefined,
      };

      newData[state.turn].push(newItem);

      if (
        action.payload.number === state.randomNumber ||
        timeNewCurrent === 0
      ) {
        setLocalStorage("data", newData);
      }

      return {
        ...state,
        data: newData,
        timeCurrent: timeNewCurrent,
        message: action.payload.message,
      };
    }

    case "form/playAgain": {
      const data = getLocalStorage("data");
      return {
        ...state,
        timeCurrent: action.payload,
        turn: data.length > 0 ? state.turn + 1 : 0,
        randomNumber: getRandomNumber(),
      };
    }
    case "table/remove": {
      clearLocalStorage("data");
      return {
        ...state,
        data: [],
        timeCurrent: MAX_TIME,
        turn: 0,
      };
    }

    default: {
      return state;
    }
  }
};
