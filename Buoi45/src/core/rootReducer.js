import { setLocalStorage, getLocalStorage } from "../utils/localStorage";
export const rootReducer = (state, action) => {
  switch (action.type) {
    case "loading": {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case "form/submit": {
      const newData = [...state.data];
      newData[state.turn] = Array.isArray(newData[state.turn])
        ? [...newData[state.turn]]
        : [];
      newData[state.turn].push({
        ...action.payload,
        time: newData[state.turn].length + 1,
      });
      setLocalStorage("data", newData);

      return {
        ...state,
        turn:
          state.randomNumber === action.payload.number
            ? state.turn + 1
            : state.turn,
        data: newData,
      };
    }

    default: {
      return state;
    }
  }
};
