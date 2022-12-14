import React, { createContext, useEffect, useReducer } from "react"
import { weatherReducer, initializer, initialState } from "./weatherReducer"

export const WeatherContext = createContext({})

export const WeatherProvider = ({ children }) => {
  const [weather, dispatch] = useReducer(
    weatherReducer,
    initialState,
    initializer
  )

  useEffect(() => {
    localStorage.setItem("weather", JSON.stringify(weather))
  }, [weather])

  return (
    <WeatherContext.Provider
      value={{
        state: weather,
        setDarkMode: (payload) => dispatch({ type: "SET_DARK_MODE", payload }),
        setController: (payload) =>
          dispatch({ type: "SET_CONTROLLER", payload }),
        toggleWeather: (payload) =>
          dispatch({ type: "TOGGLE_WEATHER", payload }),
        turnLightsOn: () => dispatch({ type: "TURN_LIGHTS_ON" }),
        turnLightsOff: () => dispatch({ type: "TURN_LIGHTS_OFF" }),
        toggleLights: () => dispatch({ type: "TOGGLE_LIGHTS" }),
        setWeather: (payload) => dispatch({ type: "SET_WEATHER", payload }),
      }}
    >
      {children}
    </WeatherContext.Provider>
  )
}
