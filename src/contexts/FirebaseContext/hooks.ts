import { useContext } from "react";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

import FirebaseContext from ".";

const REGION = "asia-northeast1";

/**
 * Checks if a Firebase app has been initialised.
 */
export const useFirebase = () => useContext(FirebaseContext).initialised;

/**
 * Returns the Firebase Auth instance.
 */
export const useAuth = () => {
  if (useFirebase()) return firebase.auth();
};

/**
 * Returns the Firebase Firestore instance.
 */
export const useFirestore = () => {
  if (useFirebase()) return firebase.firestore();
};

/**
 * Returns the Firebase Storage instance.
 */
export const useStorage = () => {
  if (useFirebase()) return firebase.storage();
};

/**
 * Returns a HTTPs callable Firebase function with the specified name.
 * @param name the name of the Firebase function
 */
export const useFunction = <T>(name: string) => {
  if (useFirebase())
    return firebase.app().functions(REGION).httpsCallable(name) as (
      data?: T
    ) => Promise<firebase.functions.HttpsCallableResult>;
};

//
// Callable Firebase function names
//

export const FUNCTION = {
};
