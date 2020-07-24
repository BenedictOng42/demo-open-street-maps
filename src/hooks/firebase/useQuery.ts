import { useState, useEffect } from "react";
import { firestore } from "firebase/app";

import { useFirestore } from "../../contexts/FirebaseContext";

import { useCollection, useCollectionData } from "./useCollection";
import { usePersistentValue } from "./helpers";
import { QueryOp } from "./types";

/**
 * This function takes in a query and applies a list
 * of operations to the query.
 *
 * @param ref The query root reference.
 * @param operations A list of operations to apply to the query.
 */
export const generateQuery = <T>(
  ref: firestore.Query<T>,
  operations: (QueryOp | undefined)[]
) => {
  let query = ref;
  for (const op of operations) {
    if (op) {
      switch (op.op) {
        case "where": {
          query = query.where(...op.args);
          break;
        }
        case "orderBy": {
          query = query.orderBy(...op.args);
          break;
        }
        case "limit": {
          query = query.limit(...op.args);
          break;
        }
        case "limitToLast": {
          query = query.limitToLast(...op.args);
          break;
        }
        case "startAt": {
          query = query.startAt(...op.args);
          break;
        }
        case "startAfter": {
          query = query.startAfter(...op.args);
          break;
        }
        case "endAt": {
          query = query.endAt(...op.args);
          break;
        }
        case "endBefore": {
          query = query.endBefore(...op.args);
          break;
        }
      }
    }
  }
  return query;
};

/**
 * Creates a **persistent** Firestore query object from the given
 * collection path and operations.
 *
 * @param path The path to the collection we are querying.
 * @param operations The operations to apply to the query.
 * @param collectionGroup Set to `true` to create a collection group query.
 * @returns `query`
 */
export const useQueryCreator = <T>(
  path?: string | undefined,
  operations?: (QueryOp | undefined)[] | undefined | false,
  collectionGroup?: boolean
) => {
  const store = useFirestore();
  const [query, setQuery] = useState<firestore.Query<T> | undefined>(undefined);

  // Cache a copy of the operations.
  const queryOptions = usePersistentValue(operations);

  // Make sure we have a valid ref if possible
  useEffect(() => {
    // Firebase has initialised
    if (store && path) {
      // Create the query base
      let query = (collectionGroup
        ? store.collectionGroup(path)
        : (store.collection(path) as firestore.CollectionReference<
            T
          >)) as firestore.Query<T>;

      if (queryOptions) {
        // Apply query operations
        query = generateQuery(query, queryOptions);
      }

      // Save the query
      setQuery(query);
    } else {
      setQuery(undefined);
    }
  }, [store, path, collectionGroup, queryOptions]);

  return query;
};

/**
 * Create a query from the given collection path and query
 * operations and listen to the resulting query snapshots.
 *
 * @param path The path to the collection we are querying.
 * @param operations The operations to apply to the query.
 * @returns `[data, error, loading, ref]`
 */
export const useQuery = <T>(
  path?: string | undefined,
  operations?: (QueryOp | undefined)[] | undefined | false
) => {
  const query = useQueryCreator<T>(path, operations);
  return useCollection<T>(query);
};

/**
 * Create a query from the given collection path and query
 * operations and listen to the data in the query snapshot
 * results.
 *
 * @param path The path to the collection we are querying.
 * @param operations The operations to apply to the query.
 * @returns `[data, error, loading, ref]`
 */
export const useQueryData = <T>(
  path?: string | undefined,
  operations?: (QueryOp | undefined)[] | undefined | false
) => {
  const query = useQueryCreator<T>(path, operations);
  return useCollectionData<T>(query);
};

/**
 * Create a collection group query from the given collection
 * group with the given query operations and listen to the
 * resulting query snapshots.
 *
 * @param path The path to the collection group.
 * @param operations The operations to apply to the query.
 * @returns `[data, error, loading, ref]`
 */
export const useGroupQuery = <T>(
  path?: string | undefined,
  operations?: (QueryOp | undefined)[] | undefined | false
) => {
  const query = useQueryCreator<T>(path, operations, true);
  return useCollection<T>(query);
};
