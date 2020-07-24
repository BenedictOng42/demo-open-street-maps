import firebase from "firebase/app";

export interface AuthenticationContextState {
  /**
   * `true` if the current user authentication state is loading.
   */
  loading: boolean;

  /**
   * The currently authenticated user if available.
   */
  user: firebase.User | null;

  location: Position | null;
}
