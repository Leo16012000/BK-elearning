import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import React, { Component, useEffect } from "react";
import Box from "@material-ui/core/Box";
import { Add, Input } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Button,
  Container,
  Dialog,
  DialogContent,
  LinearProgress,
} from "@material-ui/core";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

  link: {
    color: "white",
    textDecoration: "none",
  },
  right: {
    position: "absolute",
    right: 10,
    bottom: 15,
  },
}));

const handleSubmit = (e) => {
  e.preventDefault();
  let request = {
    username: document.getElementById("name").value,
    password: document.getElementById("pass").value,
  };
  // let route = "http://localhost:3001/api/login";
  // route += "?id=" + request.username;
  // console.log(route);
  console.log(request); // okay
  Axios.get(`http://localhost:3001/api/login?id=${request.username}`)
    .then((result) => {
      if (100 <= request.username && request.username <= 999) {
        localStorage.setItem("role", "teacher");
      } else if (1500000 <= request.username && request.username <= 2100000) {
        localStorage.setItem("role", "student");
      }
      localStorage.setItem("id", `${request.username}`);
      return document.location.href="/";
    })
    .catch((error) => {
      alert("Wrong username or password, please try again!!!");
    });
};

export default function Login(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.isOpen);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        text-align="center"
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <DialogTitle id="form-dialog-title">Sign in</DialogTitle>

          <DialogContent>
            <DialogContentText>
              To get into this website, must be sign in first
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Username"
              type="text"
              fullWidth
            />
            <TextField
              margin="dense"
              id="pass"
              label="Password"
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              onClick={handleSubmit}
              color="primary"
              display="inline-block"
            >
              Log in
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
