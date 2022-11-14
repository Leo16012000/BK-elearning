import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import { Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ListAlt, ListALt } from "@material-ui/icons";

import ButtonInfo from "./ButtonInfo";

MyPage.propTypes = {};

function MyPage(props) {
  const [id, setId] = useState(localStorage.getItem("id"));
  console.log(id);
  const [studentClasses, setStudentClasses] = useState([]);
  const [open, setOpen] = React.useState(false);
  //dialog handle

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/getstudentclass?id=${id}`).then(
      (response) => {
        setStudentClasses(response.data); //okay
      }
    );
  }, [id]);
  console.log(studentClasses);

  // const handleClickOpen = (e) => {
  //   e.stopPropagation();
  //   setOpen(true);
  // };

  // const handleClose = (e) => {
  //   e.stopPropagation();
  //   setOpen(false);
  // };

  return (
    <div>
      <ul className="studentClassInfo">
        {studentClasses.map((studentClass) => (
          <li key={studentClass.ClassId}>
            <p>{studentClass.SubjectName}</p>
            <ButtonInfo studentClass={studentClass} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyPage;
