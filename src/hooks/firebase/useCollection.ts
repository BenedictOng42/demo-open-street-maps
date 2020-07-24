import { useState, useEffect } from "react";
import { firestore } from "firebase/app";

import { useFirestore } from "../../contexts/FirebaseContext";

/**
 * Creates and caches a query reference from a collection
 * path, or an existing `firestore.CollectionReference` or
 * `firestore.Query` object.
 * @param pathOrReference a path (string) to a collection or a reference to a collection/query.
 * @returns `ref`
 */
export const useCollectionReference: <T>(
  pathOrReference?:
    | string
    | firestore.CollectionReference<T>
    | firestore.Query<T>
) => firestore.Query<T> | undefined = <T>(
  pathOrReference?:
    | string
    | firestore.CollectionReference<T>
    | firestore.Query<T>
) => {
  const store = useFirestore();
  const [ref, setRef] = useState<firestore.Query<T> | undefined>(undefined);

  useEffect(() => {
    // If we have a valid path or reference passed in
    if (pathOrReference) {
      if (
        // Firebase has initialised
        store &&
        // We have a document path passed in
        typeof pathOrReference === "string" &&
        // And the document path has changed
        (!ref ||
          (ref as firestore.CollectionReference<T>).path !== pathOrReference)
      ) {
        // Create collection reference
        setRef(
          store.collection(pathOrReference) as firestore.CollectionReference<T>
        );
      } else if (
        // We have a reference passed in
        typeof pathOrReference !== "string" &&
        // Query has changed
        (!ref || !ref.isEqual(pathOrReference))
      ) {
        // Set the given query
        setRef(pathOrReference as firestore.Query<T>);
      }
    } else {
      setRef(undefined);
    }
  }, [pathOrReference, ref, setRef, store]);

  return ref;
};

/**
 * Retrieve and listen to documents in a collection or query. A
 * listener is created only when a valid path or reference is given.
 *
 * Returns the following in an array:
 *  - The query snapshot when retrieved successfully. Null otherwise.
 *  - Error if an error occurred. Null otherwise.
 *  - A boolean representing the loading state of the query.
 *  - The query/collection reference if one was created. Null otherwise.
 *
 * @param pathOrReference a path (string) to a collection or a reference to a collection/query.
 * @returns `[data, error, loading, ref]`
 */
export const useCollection: <T>(
  pathOrReference?:
    | string
    | firestore.CollectionReference<T>
    | firestore.Query<T>
) => [
  firestore.QuerySnapshot<T> | undefined,
  Error | undefined,
  boolean,
  firestore.Query<T> | undefined
] = <T = unknown>(
  pathOrReference?:
    | string
    | firestore.CollectionReference<T>
    | firestore.Query<T>
) => {
  const [data, setData] = useState<firestore.QuerySnapshot<T> | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>(undefined);

  const ref = useCollectionReference(pathOrReference);

  // Make sure we are listening if we have a valid ref
  useEffect(() => {
    if (ref && ref.onSnapshot) {
      setLoading(true);
      const unsubscribe = ref.onSnapshot(
        snapshot => {
          setData(snapshot);
          setError(undefined);
          setLoading(false);
        },
        error => {
          setError(error);
          setLoading(false);
        }
      );

      return unsubscribe;
    } else {
      setLoading(true);
      setData(undefined);
    }
  }, [ref, setLoading, setData, setError]);

  return [data, error, loading, ref];
};

/**
 * Retrieve and listen to documents in a collection or query and
 * extract the retrieved data if it exists. A listener is only
 * created when a valid path or reference is given.
 *
 * Returns the following in an array:
 *  - The data in the query snapshot when retrieved successfully. Null otherwise.
 *  - Error if an error occurred. Null otherwise.
 *  - A boolean representing the loading state of the query.
 *  - The query/collection reference if one was created. Null otherwise.
 *
 * @param pathOrReference a path (string) to a collection or a collection reference/query.
 * @returns `[data, error, loading, ref]`
 */
export const useCollectionData: <T>(
  pathOrReference?:
    | string
    | firestore.CollectionReference<T>
    | firestore.Query<T>
) => [
  T[] | undefined,
  Error | undefined,
  boolean,
  firestore.Query<T> | undefined
] = <T = unknown>(
  pathOrReference?:
    | string
    | firestore.CollectionReference<T>
    | firestore.Query<T>
) => {
  // Retrieve the data
  const [data, setData] = useState<T[] | undefined>(undefined);
  const [docs, error, loading, ref] = useCollection<T>(pathOrReference);

  // Update and extract the data from the query snapshot when it changes
  useEffect(() => {
    if (docs) {
      setData(docs.docs.map(d => d.data()));
    } else {
      setData(undefined);
    }
  }, [setData, docs]);

  return [data, error, loading, ref];
};
