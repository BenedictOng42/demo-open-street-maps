export interface FirebaseContextState {
  /**
   * `true` if Firebase has been initialised.
   */
  initialised: boolean;
}

export interface FirebaseProviderProps {
  /**
   * The configuration object used to initialise the
   * Firebase application.
   */
  firebaseConfig: Record<string, unknown> | null;
}
