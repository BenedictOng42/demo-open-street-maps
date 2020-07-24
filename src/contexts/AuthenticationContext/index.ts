import React from "react";

import { AuthenticationContextState } from "./types";

/**
 * Provides the user's authentication state if they are logged in.
 */
const AuthenticationContext = React.createContext<AuthenticationContextState>({
  loading: true,
  location: null,
  user: null,
});

export default AuthenticationContext;

export { AuthenticationProvider } from "./AuthenticationProvider";

export * from "./hooks";

function useAuthStateContext() {
  const context = React.useContext(AuthenticationContext);
  if (context === undefined) {
    throw new Error(
      "useAuthAction must be used within the Authentication Provider"
    );
  }
  return context;
}

export { useAuthStateContext };
