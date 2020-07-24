import React from "react";

import { AuthenticationContextState } from "./types";

/**
 * Provides the user's authentication state if they are logged in.
 */
const AuthenticationContext = React.createContext<AuthenticationContextState>({
  loading: true,
  user: null
});

export default AuthenticationContext;

export { AuthenticationProvider } from "./AuthenticationProvider";

export * from "./hooks";
