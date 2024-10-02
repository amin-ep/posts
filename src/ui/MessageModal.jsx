/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Paper,
} from "@mui/material";
import { DraggableCore } from "react-draggable";
import { useRef } from "react";

const PaperComponent = (props) => {
  const nodeRef = useRef(null);
  return (
    <DraggableCore nodeRef={nodeRef} handle="#draggable-dialog">
      <Paper {...props} ref={nodeRef} />
    </DraggableCore>
  );
};

function MessageModal({ isOpen, onClose, title, description, onAction }) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog"
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          Cancel
        </Button>
        <Button onClick={onAction}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
}

export default MessageModal;
