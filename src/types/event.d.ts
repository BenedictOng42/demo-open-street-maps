import { firestore } from "firebase/app";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: firestore.Timestamp;
  location: firestore.GeoPoint;
}
