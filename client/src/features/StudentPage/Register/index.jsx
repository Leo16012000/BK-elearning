import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import { Box, Card, CardContent, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";

function Register() {
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  }));

  const classes = useStyles();

  const [studentId, setId] = useState(localStorage.getItem("id")); //id login of student
  const [subjectId, setSubjectId] = useState(-1); //subject search
  const [classIdChoose, setClassIdChoose] = useState(-1);
  const [searchSubjectClass, setSearchSubjectClass] = useState([]); //list lớp học của môn học

  //change search when subject id change
  const handleChangeSubjectId = (e) => {
    setSubjectId(+e.target.value);
    console.log(e.target.value);
    console.log(subjectId);
  };

  useEffect(() => {
    Axios.get(
      `http://localhost:3001/api/getsubjectsearch?subjectId=${subjectId}`
    ).then((response) => {
      console.log(response.data);
      setSearchSubjectClass(response.data); //ủa chạy được mà ta????
    });
  }, [subjectId]);

  //get all subject that student registered
  const [studentClasses, setStudentClasses] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/getstudentclass?id=${studentId}`).then(
      //okay
      (response) => {
        console.log("class registerd", response.data);
        setStudentClasses(response.data); //okay
      }
    );
  }, [studentId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //check if subject has registered
    if (studentClasses.some((x) => x.CSubjectId === subjectId)) {
      alert("You've already register this subject");
      return;
    }
    //insert into db
    if (classIdChoose !== -1) {
      Axios.post(
        `http://localhost:3001/api/insertStudentIntoClass?studentId=${studentId}&classId=${classIdChoose}`
      ).then(() => {
        alert("successful insert");
      });
    }
  };

  // const sendPost = () => {
  //   Axios.post(
  //     "http://localhost:3001/api/insertStudentIntoClass?studentId=2010742&classId=20107"
  //   ).then(() => {
  //     alert("successful insert");
  //   });
  // };

  return (
    <div>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={(e) => handleSubmit(e)}
      >
        <Box>
          <TextField
            id="standard-basic"
            label="Enter Subject ID"
            onChange={(e) => {
              handleChangeSubjectId(e);
            }}
          />

          <ul className="listClassOfSubject">
            {searchSubjectClass.map((classUnit) => (
              <li key={classUnit.ClassId}>
                <Card>
                  <CardContent>
                    <Box
                      display="inline"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box flex="1 1 auto">
                        <Typography component="p" variant="body1">
                          Subject: {classUnit.SubjectName}
                        </Typography>

                        <Typography component="p" variant="body1">
                          Class Id: {classUnit.ClassId}
                        </Typography>

                        <Typography component="p" variant="body2">
                          Number Of Student: {classUnit.NumberOfStudent}/60
                        </Typography>

                        <Typography component="p" variant="body2">
                          Main Teacher: {classUnit.TeacherName}
                        </Typography>
                      </Box>

                      <Box mr={1}>
                        <Button
                          variant="contained"
                          color={
                            classUnit.ClassId === classIdChoose
                              ? "primary"
                              : "inherit"
                          }
                          className={classes.button}
                          startIcon={<Add />}
                          onClick={() => {
                            console.log(classUnit.ClassId); //okay
                            setClassIdChoose(classUnit.ClassId);
                          }}
                        >
                          Register
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>

          <Button type="submit" color="secondary" variant="contained">
            Submit
          </Button>
        </Box>
      </form>
      {/* <Button onClick={() => sendPost()}>Send Post Req</Button> */}
    </div>
  );
}

export default Register;
