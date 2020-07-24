import { useState, useEffect } from "react";
import { firestore } from "firebase/app";

import { useFirestore } from "../../contexts/FirebaseContext";

/**
 * Creates and caches a document reference from a
 * path or a `firestore.DocumentReference` object.
 * @param pathOrReference a path or a reference to a document.
 * @returns `ref`
 */
export const useDocumentReference: <T>(
  pathOrReference?: string | firestore.DocumentReference | null
) => firestore.DocumentReference<T> | undefined = <T = unknown>(
  pathOrReference?: string | firestore.DocumentReference | null
) => {
  const store = useFirestore();
  const [ref, setRef] = useState<firestore.DocumentReference<T> | undefined>(
    undefined
  );

  useEffect(() => {
    // If we have a valid path or reference passed in
    if (pathOrReference) {
      if (
        // Firebase has initialised
        store &&
        // We have a document path passed in
        typeof pathOrReference === "string" &&
        // And the document path has changed
        (!ref || ref.path !== pathOrReference)
      ) {
        // Create document reference
        setRef(store.doc(pathOrReference) as firestore.DocumentReference<T>);
      } else if (
        // We have a reference passed in
        typeof pathOrReference !== "string" &&
        // Document path has changed
        (!ref ||
          ref.path !== (pathOrReference as firestore.DocumentReference).path)
      ) {
        // Set the given document reference
        setRef(pathOrReference as firestore.DocumentReference<T>);
      }
    }
  }, [pathOrReference, ref, setRef, store]);

  return ref;
};

/**
 * Retrieve and listen to a document from Firestore from a path
 * or a document reference. A listener is created only when a valid
 * path or reference is given.
 *
 * Returns the following in an array:
 *  - The document snapshot when retrieved successfully. Null otherwise.
 *  - Error if an error occurred. Null otherwise.
 *  - A boolean representing the loading state of the document snapshot.
 *  - The document reference if one was created. Null otherwise.
 *
 * @param pathOrReference a path (string) or a reference to a document.
 * @returns `[data, error, loading, ref]`
 */
export const useDocument: <T>(
  pathOrReference?: string | firestore.DocumentReference | null
) => [
  firestore.DocumentSnapshot<T> | undefined,
  Error | undefined,
  boolean,
  firestore.DocumentReference<T> | undefined
] = <T = unknown>(
  pathOrReference?: string | firestore.DocumentReference | null
) => {
  const [data, setData] = useState<firestore.DocumentSnapshot<T> | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>(undefined);

  const ref = useDocumentReference<T>(pathOrReference);

  // Make sure we are listening if we have a valid ref
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    if (ref && ref.onSnapshot) {
      // Attach observer to listen to snapshots
      const unsubscribe = ref.onSnapshot(
        snapshot => {
          if (!cancelled) {
            setData(snapshot);
            setError(undefined);
            setLoading(false);
          }
        },
        error => {
          if (!cancelled) {
            setError(error);
            setLoading(false);
          }
        }
      );
      return () => {
        cancelled = true;
        unsubscribe();
      };
    }
  }, [ref, setLoading, setData, setError]);

  return [data, error, loading, ref];
};

/**
 * Retrieve and listen to a document's data from Firestore. A listener
 * is created only when a valid path or reference is given.
 *
 * Returns the following in an array:
 *  - The document data. Null otherwise.
 *  - Error if an error occurred. Null otherwise.
 *  - A boolean representing the loading state of the document snapshot.
 *  - The document reference if one was created. Null otherwise.
 *
 * @param pathOrReference a path (string) or a reference to a document.
 * @param queryOptions allows the hook to construct the query for you automatically based on these options.
 * @returns `[data, error, loading, ref]`
 */
export const useDocumentData: <T>(
  pathOrReference?: string | firestore.DocumentReference | null
) => [
  T | undefined,
  Error | undefined,
  boolean,
  firestore.DocumentReference<T> | undefined
] = <T = unknown>(
  pathOrReference?: string | firestore.DocumentReference | null
) => {
  // Get the document snapshot
  const [dataSnapshot, error, loading, ref] = useDocument<T>(pathOrReference);

  // Cache the data in the state
  const [data, setData] = useState<T | undefined>(undefined);

  // If the snapshot changes, cache the data
  useEffect(() => {
    if (dataSnapshot) setData(dataSnapshot.data() || undefined);
  }, [dataSnapshot, setData]);

  // Return the data
  return [data, error, loading, ref];
};
