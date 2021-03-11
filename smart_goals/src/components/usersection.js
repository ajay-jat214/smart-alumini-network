import React, { useState, useEffect } from "react";
import { Card } from "@material-ui/core";
import Schedule from "./schedule";
import { connect } from "react-redux";
import "./usersection.css";
import ToDoList from "./todolist/todolist";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Avatar } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import { Modal } from "@material-ui/core";
import { Backdrop } from "@material-ui/core";
import { Fade, Button, IconButton } from "@material-ui/core";
const axios = require("axios");
const mapStateToProps = (state) => {
  const email = state.emailDetails.emailCredentials;
  const x = { email };
  return x;
};
let prof = "";

var cardstyle = {
  display: "block",
  width: "100%",
  transitionDuration: "0.35s",
};

var cardstyle1 = {
  display: "block",
  width: "100%",
  transitionDuration: "0.35s",
};

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "250px",
    margin: "auto",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function UserSection(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [image, setImage] = React.useState({ preview: "", raw: "" });
  const [profile, setProfile] = React.useState("");
  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  React.useEffect(() => {
    fetch("https://smart-network.herokuapp.com/getImage", {
      method: "get",
      headers: { Authentication: "Content-Type:multipart/form-data" },
    })
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.values.length; i++) {
          if (data.values[i].email === props.email) {
            prof = data.values[i].image;
            prof = prof.substring(15, prof.length);
            setProfile(prof);
          }
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profileImage", image.raw);
    formData.append("email", props.email);

    axios
      .post("https://smart-network.herokuapp.com/uploadImage", formData, {
        headers: { Authentication: "Content-Type:multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
        prof = res.data.results.image;
        prof = prof.substring(15, prof.length);
        setProfile(prof);
        // this.setState({msg:res.data.message});
        // this.setState({profileImage:res.data.results.profileImage});
      })
      .catch((err) => console.log(err));
  };

  const handleOpen = (id) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className=''>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <label htmlFor='profileImage'>
              {profile.length ? (
                <img
                  src={"https://smart-network.herokuapp.com/uploads/" + profile}
                  alt='profile'
                  height='200'
                  width='200'
                  className='br-100 '
                />
              ) : (
                <Avatar
                  src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                  className='  h5 w5 grow  profile db w-80 h-auto '
                  style={{ height: "100px", width: "100px" }}
                />
              )}
            </label>
            <input
              type='file'
              id='profileImage'
              style={{ display: "none" }}
              onChange={handleChange}
            />
            <br />
            <Button
              onClick={handleUpload}
              style={{ position: "relative", marginLeft: "50px" }}
            >
              Upload
            </Button>
          </div>
        </Fade>
      </Modal>

      <div className='mt6'>{<Button onClick={handleOpen}>UPLOAD</Button>}</div>

      <Schedule />
    </div>
  );
}

export default connect(mapStateToProps, null)(UserSection);

// <br />
