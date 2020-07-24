import { FirebaseContextState } from "./types";
import React from "react";

/**
 * Informs its children about the availability of Firebase.
 */
const FirebaseContext = React.createContext<FirebaseContextState>({
  initialised: false,
});

export default FirebaseContext;

export { FirebaseProvider } from "./FirebaseProvider";

export * from "./hooks";
