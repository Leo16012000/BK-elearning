import React, { useEffect, useState } from "react";
import Axios from "axios";
import TableStudent from './TableStudent'

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from '@material-ui/core/Paper';
import { Box } from "@material-ui/core";
import { ListAlt } from "@material-ui/icons";
import { PostAdd } from "@material-ui/icons";
import { DeleteForever } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function ButtonList(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const { teacherClass } = props;
  const roomDetail = teacherClass;

  const [openStudentList, setOpenStudentList] = useState(false);
  const [openRoomDetail, setOpenRoomDetail] = useState(false);
  const [openTextBook, setOpenTextBook] = useState(false);

  const [studentList, setStudentList] = useState([]);
  const [textBookList, setTextBookList] = useState([]);
  const [allTextBook, setAllTextBook] = useState([]);
  const [isAdd, setAdd] = useState(false);

  console.log('class: ', teacherClass)

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/getalltextbook`).then(
      (response) => {
        setAllTextBook(response.data); //okay
      }
    );
  }, [teacherClass])

  const handleClose = (name) => {
    switch(name){
      case 'StudentList':
        setOpenStudentList(false);
        break;
      case 'RoomDetail':
        setOpenRoomDetail(false);
        break;
      case 'TextBook':
        setOpenTextBook(false);
        break;
      default:
        break;
    }
  };

  function handleStudentList() {
    setOpenStudentList(!openStudentList);
    Axios.get(`http://localhost:3001/api/getstudentinclass?classId=${teacherClass.ClassId}`).then(
      (response) => {
        setStudentList(response.data); //okay
      }
    );
  };

  function handleRoomDetail() {
    setOpenRoomDetail(!openRoomDetail);
  };

  function handleTextBook() {
    setOpenTextBook(!openTextBook);
    Axios.get(`http://localhost:3001/api/gettextbook?subjectId=${teacherClass.CSubjectId}`).then(
      (response) => {
        setTextBookList(response.data); //okay
      }
    );
  };

  function renderRoomDetail(){
    return(
      <Box>
        <DialogContentText>
          Class Id: {roomDetail.ClassId}
        </DialogContentText>
        <DialogContentText>
          Subject Id: {roomDetail.CSubjectId}
        </DialogContentText>
        <DialogContentText>
          Numbers of Student: {roomDetail.NumberOfStudent}
        </DialogContentText>
        <DialogContentText>
          Main Teacher: {roomDetail.MainTeacher}
        </DialogContentText>
        <DialogContentText>
          Falcility: {roomDetail.CFalcility}
        </DialogContentText>
        <DialogContentText>
          Room: {roomDetail.CRoom}{roomDetail.CBuilding}
        </DialogContentText>
      </Box>
    );
  }

  function renderTextBook(book){
    return(
      <div style={{display: 'flex', flexDirection: 'row', borderBottom: '1px solid'}}>
        <Box >
          <DialogContentText>
            <h2> {book.TextBookName} </h2>
          </DialogContentText>
          <DialogContentText>
            Subject Id: {book.UseSubjectId}
          </DialogContentText>
          <DialogContentText>
            TextBook Id: {book.UseTextBookId}
          </DialogContentText>
          <DialogContentText>
            TextBook Name: {book.TextBookName}
          </DialogContentText>
          <DialogContentText>
            Released: {book.YearOfRelease}
          </DialogContentText>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          style={{position: 'absolute', right: '10%', marginTop: '20%'}}
          onClick={(e) => handleDeleteTextBook(book.TextBookId)}
          startIcon={<DeleteForever />}
        >
          Delete
        </Button>
      </div>
    );
  }

  function addForm(){
    return (
      <Dialog
        open={true}
        fullWidth={true}
        maxWidth={'xs'}
      >
        <FormControl className={classes.formControl} error>
          <InputLabel htmlFor="name-native-error">Select TextBook</InputLabel>
          <NativeSelect
            value={state.name}
            onChange={handleChange}
            name="name"
            inputProps={{
              id: 'name-native-error',
            }}
          >
            <optgroup label="Textbooks">
              {allTextBook.map(book => <option value={book.TextBookName}>{book.TextBookName}</option>)}
            </optgroup>
          </NativeSelect>
          <Button
            variant="contained"
            color="secondary"
            onClick={(e) => handleAdd(state.name)}
            startIcon={<PostAdd />}
          >
            ADD Textbook
          </Button>
        </FormControl>
      </Dialog>
    )
  }

  function handleAdd(bookName){
    const bookAdding = allTextBook.filter(book => book.TextBookName === bookName)[0];
    console.log('book: ', bookAdding);
    Axios.post(
      `http://localhost:3001/api/addTextbook?subjectId=${teacherClass.CSubjectId}&&textbookId=${bookAdding.TextBookId}`
    ).then(() => {
      setAdd(false);
      console.log('Add Book Successfully')
    });
  }

  function handleDeleteTextBook(textbookId){
    Axios.post(
      `http://localhost:3001/api/deleteTextbook?textbookId=${textbookId}`
    ).then(() => {
      console.log("Delete Successfully");
      handleTextBook();
    });
  }

  return (
    <Box>
      <h2>{teacherClass.SubjectName} - {teacherClass.CRoom}{teacherClass.CBuilding} </h2>
      <Button
        variant="contained"
        color="secondary"
        style={{marginRight: 20}}
        onClick={(e) => handleStudentList()}
        startIcon={<ListAlt />}
      >
        Student List
      </Button>
      <Dialog
        open={openStudentList}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth={'lg'}
      >
        <DialogTitle id="form-dialog-title">
          Student List
        </DialogTitle>
        <DialogContent>
          {<TableStudent studentList={studentList} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose('StudentList')} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        variant="contained"
        color="secondary"
        style={{marginRight: 20}}
        onClick={(e) => handleRoomDetail()}
        startIcon={<ListAlt />}
      >
        Room Detail
      </Button>
      <Dialog
        open={openRoomDetail}
        onClose={(e) => handleClose('RoomDetail')}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth={'xs'}
      >
        <DialogTitle id="form-dialog-title">
          {teacherClass.SubjectName}
        </DialogTitle>
        <DialogContent>
          {renderRoomDetail()}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose('RoomDetail')} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        variant="contained"
        color="secondary"
        onClick={(e) => handleTextBook()}
        startIcon={<ListAlt />}
      >
        TextBook
      </Button>
      <Dialog
        open={openTextBook}
        fullWidth={true}
        maxWidth={'xs'}
        onClose={(e) => handleClose('TextBook')}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Main TextBook
        </DialogTitle>
        <DialogContent>
          { textBookList.map(book => renderTextBook(book)) }
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAdd(true)} style={{marginRight: 30}} color='secondary' startIcon={<PostAdd />}>
            ADD TextBook
          </Button>
          { isAdd && addForm() }
          <Button onClick={() => handleClose('TextBook')} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ButtonList;

