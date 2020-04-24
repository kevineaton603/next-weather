import {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer
} from "react";
import { CookieContext } from "./cookies";

/**
 *
 * @param {Number} x Temperature
 * @returns {Number}
 */
const initialState = x => x;

/**
 * @type {React.Context<{
 * unitState: [string, React.Dispatch<React.SetStateAction<string>>],
 * conversionReducer: [React.ReducerStateWithoutAction<React.ReducerWithoutAction<(x: number) => number>>, React.DispatchWithoutAction]
 * }>}
 */
const UnitContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "K":
      return x => x;
    case "C":
      return x => (x - 273.15).toFixed(2);
    case "F":
      return x => (((x - 273.15) * 9) / 5 + 32).toFixed(2);
  }
};

const UnitProvider = ({ children }) => {
  const { cookies, setCookie } = useContext(CookieContext);
  const [unit, setUnit] = useState("K");
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (cookies.unit) setUnit(cookies.unit);
  }, []);

  useEffect(() => {
    if (unit !== "K") {
      setCookie("unit", unit);
      dispatch({ type: unit });
    }
  }, [unit]);

  return (
    <UnitContext.Provider
      value={{
        unitState: [unit, setUnit],
        conversionReducer: [state, dispatch]
      }}
    >
      {children}
    </UnitContext.Provider>
  );
};

export { UnitContext, UnitProvider };
