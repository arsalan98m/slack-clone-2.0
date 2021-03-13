import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { db } from "../firebase";

export default function SidebarModal({ handleClose, open }) {
  const [roomName, setRoomName] = React.useState("");

  const addChannel = () => {
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });

      handleClose();
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Add Channel"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              id="outlined-basic"
              label="Enter Room name"
              variant="outlined"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleClose}
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={addChannel}
            color="primary"
            autoFocus
            variant="contained"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
