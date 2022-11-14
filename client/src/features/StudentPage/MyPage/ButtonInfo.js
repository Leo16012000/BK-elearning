import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Box } from "@material-ui/core";
import { ListAlt } from "@material-ui/icons";
import Axios from "axios";

function ButtonInfo(props) {
  const [open, setOpen] = useState(false);
  const { studentClass } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickDelete = (e) => {
    Axios.delete(
      `http://localhost:3001/api/deletestudentclass?classId=${
        studentClass.ClassId
      }&studentId=${localStorage.getItem("id")}`
    ).then(console.log("delete success"));
  };
  return (
    <Box>
      <Button
        variant="contained"
        color="secondary"
        onClick={(e) => handleClickOpen()}
        startIcon={<ListAlt />}
      >
        Detail
      </Button>
      <Dialog
        open={open}
        onClose={(e) => handleClose()}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {studentClass.SubjectName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Class Id: {studentClass.ClassId}
          </DialogContentText>
          <DialogContentText>
            Subject Id: {studentClass.CSubjectId}
          </DialogContentText>
          <DialogContentText>
            Credit: {studentClass.CollegeCredit}
          </DialogContentText>
          <DialogContentText>
            Main Teacher: {studentClass.MainTeacher}
          </DialogContentText>
          <DialogContentText>
            Falcility: {studentClass.CFalcility}
          </DialogContentText>
          <DialogContentText>
            Building: {studentClass.CBuilding}
          </DialogContentText>
          <DialogContentText>Room: {studentClass.CRoom}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        variant="contained"
        color="secondary"
        onClick={(e) => handleClickDelete(e)}
        startIcon={<ListAlt />}
      >
        Delete
      </Button>
    </Box>
  );
}

export default ButtonInfo;
