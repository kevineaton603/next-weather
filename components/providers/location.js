import { createContext, useContext, useEffect, useState } from "react";
import { CookieContext } from "./cookies";

const LocationContext = createContext({ lat: 0, lon: 0 });

/**
 * @type {React.FC<React.PropsWithChildren<{}>>}
 * @returns {}
 */
const LocationProvider = ({ children }) => {
  const { cookies, setCookie } = useContext(CookieContext);
  const [id, setId] = useState(-1);
  const [lat, setLat] = useState(Number.MAX_SAFE_INTEGER);
  const [lon, setLon] = useState(Number.MAX_SAFE_INTEGER);
  useEffect(() => {
    const { lat, lon } = cookies;
    setLat(lat);
    setLon(lon);
    if (navigator.geolocation) {
      setId(navigator.geolocation.watchPosition(success));
    }
    return () => {
      navigator.geolocation.clearWatch(id);
    };
  }, []);

  useEffect(() => {
    if (lat !== Number.MAX_SAFE_INTEGER) {
      setCookie("lat", lat);
    }
  }, [lat]);

  useEffect(() => {
    if (lon !== Number.MAX_SAFE_INTEGER) {
      setCookie("lon", lon);
    }
  }, [lon]);

  /**
   * @type {PositionCallback}
   */
  const success = res => {
    setLat(res.coords.latitude);
    setLon(res.coords.longitude);
  };
  return (
    <LocationContext.Provider value={{ lat, lon }}>
      {children}
    </LocationContext.Provider>
  );
};

export { LocationContext, LocationProvider };
