import { useContext } from "react";
import firebase from "firebase/app";

import AuthenticationContext from ".";

/**
 * Retrieve the current authentication state from the context.
 * @returns `[user, loading]`
 */
export const useAuthentication = (): [firebase.User | null, boolean] => {
  const { loading, user } = useContext(AuthenticationContext);
  return [user, loading];
};
