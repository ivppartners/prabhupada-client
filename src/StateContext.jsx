import { createContext, useContext, useReducer } from "react";

const StateContext = createContext(null);
const DispatchContext = createContext(null);

export function StateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export function useState() {
  return useContext(StateContext);
}

export function useDispatch() {
  return useContext(DispatchContext);
}

function reducer(state, action) {
  switch (action.type) {
    case "gautasSarasas":
      return { ...state, list: action.payload, isLoaded: true };
    case "gautasIrasas":
      return {
        ...state,
        item: action.payload,
      };
    default:
      throw new Error(`Nežinomas action type: ${action.type}`);
  }
}

const initialState = { list: [], isLoaded: false };
