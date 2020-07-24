import React, { FC, useState, useEffect } from "react";
import firebase, { initializeApp } from "firebase/app";

import FirebaseContext from ".";
import { FirebaseProviderProps } from "./types";

/**
 * This provider attempts to initialise Firebase when it is loaded.
 */
export const FirebaseProvider: FC<FirebaseProviderProps> = ({
  firebaseConfig,
  children
}) => {
  const [initialised, setInitialised] = useState(false);

  useEffect(() => {
    if (!initialised && firebaseConfig) {
      // Check if Firebase is already initialised
      if (firebase.apps.length > 0) {
        setInitialised(true);
        return;
      }
      try {
        // Initialise the app
        initializeApp(firebaseConfig);
        setInitialised(true);
        console.log(`Initialised Firebase.`)
      } catch (error) {
        console.error(error)
      }
    }
  }, [initialised, firebaseConfig, setInitialised]);

  return (
    <FirebaseContext.Provider value={{ initialised }}>
      {children}
    </FirebaseContext.Provider>
  );
};
