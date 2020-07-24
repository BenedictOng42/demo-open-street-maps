import React, { FC, useState, useEffect } from "react";

import { useAuth } from "../FirebaseContext";

import AuthenticationContext from ".";

/**
 * Provides the user's authentication state through context if they are logged in.
 */
export const AuthenticationProvider: FC = ({ children }) => {
  const auth = useAuth();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<firebase.User | null>(null);
  const [location, setLocation] = useState<Position | null>(null);
  useEffect(() => {
    if (auth) {
      let cancelled = false;
      const unsubscribe = auth.onAuthStateChanged((userInfo) => {
        if (!cancelled) {
          setLoading(false);
          setUser(userInfo);
        }
      });

      return () => {
        cancelled = true;
        unsubscribe();
      };
    }
  }, [auth, setLoading, setUser, setLocation]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((data) => {
      setLocation(data);
    });
  }, [setLocation, location]);

  return (
    <AuthenticationContext.Provider
      value={{
        loading,
        user,
        location,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
