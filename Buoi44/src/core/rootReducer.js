// Quản lý state
export const rootReducer = (state, action) => {
  switch (action.type) {
    case "loading": {
      return {
        ...state,
        loading: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
