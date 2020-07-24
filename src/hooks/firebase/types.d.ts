import { firestore } from "firebase/app";
import "firebase/firestore";

/**
 * The type of query operation.
 */
export type QueryOpType =
  | "where"
  | "orderBy"
  | "limit"
  | "limitToLast"
  | "startAt"
  | "startAfter"
  | "endBefore"
  | "endAt";

/**
 * An operation that can be applied to a Firestore query.
 */
export type QueryOp =
  | WhereOp
  | OrderByOp
  | LimitOp
  | LimitToLastOp
  | StartAtOp
  | StartAfterOp
  | EndBeforeOp
  | EndAtOp;

export interface QueryOpBase {
  op: QueryOpType;
  args: unknown;
}

export interface WhereOp extends QueryOpBase {
  op: "where";
  args: [string | firestore.FieldPath, firestore.WhereFilterOp, unknown];
}

export interface OrderByOp extends QueryOpBase {
  op: "orderBy";
  args: [string | firestore.FieldPath, firestore.OrderByDirection?];
}

export interface LimitOp extends QueryOpBase {
  op: "limit";
  args: [number];
}

export interface LimitToLastOp extends QueryOpBase {
  op: "limitToLast";
  args: [number];
}

export interface StartAtOp<T = unknown> extends QueryOpBase {
  op: "startAt";
  args: [firestore.DocumentSnapshot<T>] | unknown[];
}

export interface StartAfterOp<T = unknown> extends QueryOpBase {
  op: "startAfter";
  args: [firestore.DocumentSnapshot<T>] | unknown[];
}

export interface EndBeforeOp<T = unknown> extends QueryOpBase {
  op: "endBefore";
  args: [firestore.DocumentSnapshot<T>] | unknown[];
}

export interface EndAtOp<T = unknown> extends QueryOpBase {
  op: "endAt";
  args: [firestore.DocumentSnapshot<T>] | unknown[];
}
