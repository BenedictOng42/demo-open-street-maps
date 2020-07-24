import { Event } from "../../types";

export interface EventCardProps {
  /**
   * The event to show in the event card.
   */
  event?: Event;

  /**
   * Callback for when the options button is clicked.
   */
  onOptions?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
