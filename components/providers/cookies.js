import { createContext, PropsWithChildren } from "react";
import { useCookies } from "react-cookie";

/**
 * @type {React.Context<{
 * cookies: {[name: string]: any},
 * setCookie: {(name: string, value: any, options?: CookieSetOptions) => void}
 * removeCookie: {(name: string, options?: CookieSetOptions) => void}
 * }>}
 */
const CookieContext = createContext({});

/**
 *
 * @type {React.FC<PropsWithChildren<{}>>}
 */
const CookieProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  return (
    <CookieContext.Provider value={{ cookies, setCookie, removeCookie }}>
      {children}
    </CookieContext.Provider>
  );
};

export { CookieContext, CookieProvider };
