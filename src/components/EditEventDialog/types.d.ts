import { Event } from "../../types";

export interface EditEventDialogProps {
  open?: boolean;
  onClose?: () => void;
  event?: Event | null;
  onEdit?: () => void;
}
