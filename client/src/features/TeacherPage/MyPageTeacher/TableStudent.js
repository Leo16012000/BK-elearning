import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(StudentId, StudentName, Grade, Sex) {
  return { StudentId, StudentName, Grade, Sex };
}

export default function BasicTable(props) {
  const classes = useStyles();

  const rows = props.studentList.map((st) => {
    return createData(st.StudentId, st.StudentName, st.Grade, st.Sex)
  });

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Student Name</TableCell>
            <TableCell align="right">Student ID</TableCell>
            <TableCell align="right">Grade</TableCell>
            <TableCell align="right">Gender</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.StudentName}
              </TableCell>
              <TableCell align="right">{row.StudentId}</TableCell>
              <TableCell align="right">{row.Grade}</TableCell>
              <TableCell align="right">{row.Sex}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
