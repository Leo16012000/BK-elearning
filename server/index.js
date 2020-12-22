const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "1912",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/login", (req, res) => {
  const sqlSelect = "SELECT * FROM student where StudentID=?;";
  db.query(sqlSelect, +[req.query.id], (err, result) => {
    if (result.length > 0) {
      console.log(result);
      res.send(result);
    }
  });
});

//student command ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.get("/api/getstudentinfo", (req, res) => {
  const sqlSelect = "SELECT * FROM student where StudentID=?;";
  db.query(sqlSelect, [+req.query.id], (err, result) => {
    res.send(result);
  });
});
//get the subject that the student registered by student ID/2010742 /

app.get("/api/getstudentclass", (req, res) => {
  const sqlSelect =
    "SELECT t.ClassId,  c.CSubjectId,c.MainTeacher,c.CFalcility,c.CBuilding,c.CRoom,s.SubjectName,s.CollegeCredit FROM TAKECLASS as t, CLASS as c, SUBJECT as s where t.StudentID=? AND t.ClassId = c.ClassId AND s.SubjectId=c.CSubjectId;";
  db.query(sqlSelect, +[req.query.id], (err, result) => {
    if (result.length > 0) {
      console.log(result);
      res.send(result);
    }
  });
});

//get all class of a subject with subject id
app.get("/api/getsubjectsearch", (req, res) => {
  const sqlSelect =
    "SELECT subject.SubjectId, subject.SubjectName, subject.CollegeCredit, class.ClassId,class.CFalcility,class.MainTeacher,class.NumberOfStudent,TeacherName FROM subject , class,teacher where MainTeacher= TeacherId AND class.CSubjectId=? AND subject.SubjectId = class.CSubjectId;";
  db.query(sqlSelect, +[req.query.subjectId], (err, result) => {
    if (result.length > 0) {
      console.log(result);
      res.send(result);
    }
  });
});

//insert student into class
app.post("/api/insertStudentIntoClass", (req, res) => {
  const sqlInsert =
    "INSERT INTO TakeClass (StudentId,ClassId,SemesterId) VALUES (?,?,201);"; //lệnh đúng rồi
  db.query(
    sqlInsert,
    [+req.query.studentId, +req.query.classId],
    (err, result) => {}
  );
});

//teacher command ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// select all info about teacher through teacherID
app.get("/api/getstudentinfo", (req, res) => {
  const sqlSelect = "SELECT * FROM TEACHER where TeacherId=?;";
  db.query(sqlSelect, +[req.query.id], (err, result) => {
    res.send(result);
  });
});

//get all the class that the teacher will teach through teacher ID
app.get("/api/getteacherclass", (req, res) => {
  const sqlSelect = "SELECT * from CLASS where MainTeacher=?";
  db.query(sqlSelect, +[req.query.id], (err, result) => {
    if (result.length > 0) {
      console.log(result);
      res.send(result);
    }
  });
});

//get all the students and their informations in a class through class id
app.get("/api/getstudentofaclass", (req, res) => {
  const sqlSelect =
    "SELECT StudentId,SFacultyId,StudentName,Sex,Bdate,Grade,StareOfStudy from TAKECLASS,STUDENT where ClassId=?";
  db.query(sqlSelect, +[req.query.id], (err, result) => {
    if (result.length > 0) {
      console.log(result);
      res.send(result);
    }
  });
});

// app.get("/api/getstudentremove", (req, res) => {
//   const sqlSelect = "";
//   db.query(sqlSelect, +[req.query.id], (err, result) => {
//     if (result.length > 0) {
//       console.log(result);
//       res.send(result);
//     }
//   });
// });

app.listen(3001, () => {
  console.log("running on port 3001");
});
