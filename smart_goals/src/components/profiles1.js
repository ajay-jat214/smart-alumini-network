import React,{useState,useEffect} from 'react';
import ProfileItem from './profileitem';
import values from './values';
import {Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Modal} from '@material-ui/core';
import {Backdrop} from '@material-ui/core';
import {Fade} from '@material-ui/core';
import { Avatar, Image } from 'antd';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
let prof='';
let profile=[];

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Profiles1({currentPost}){
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [id,setId]=useState('');
  const [userName,setUserName]=useState('');
  const [name,setName]=useState('');
  const [field,setField]=useState('');
  const [contact,setContact]=useState('');
  const [photo,setPhoto]=useState('');
  const [email,setEmail]=useState('');

  const handleOpen = (id) => {
  	setId(id);
    setEmail(currentPost[id].email);
  	setUserName(currentPost[id].userName);
  	setName(currentPost[id].name)
  	setField(currentPost[id].field);
  	setContact(currentPost[id].contact);
    setPhoto(currentPost[id].photo);
    setOpen(true);
  };

  const fun = () => {
    console.log(email);
     fetch('https://git.heroku.com/smart-network/deleteUser', {
                method: 'post',
                headers: { Authentication: 'Content-Type:application/json' },
                body: JSON.stringify({
                    email:email,
                    array:currentPost
                })
            })
            .then(response => response.json())
            .then(data => {
              alert(data);
            })
            .catch(err=>console.log(err));
  };

  const handleClose = () => {
    setOpen(false);
  };

return(
	<div className="center tc" >
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
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
              <h2 id="transition-modal-title">{userName}</h2>
        <div onClick={fun}>
        <IconButton aria-label="delete" className={classes.margin} onClick={fun}>
          <DeleteIcon fontSize="large" />
        </IconButton>
        </div>
              <div>{

              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" className=" pr2 h5 w5 grow  profile db" />
              }</div>

            <p id="transition-modal-description">Name : {name}</p>
            <p id="transition-modal-description">Field : {field}</p>
            <p id="transition-modal-description" className="center pl5 b">{contact}</p>
          </div>
        </Fade>
      </Modal>
   
   <div className="mx-100 flex flex-wrap flex-center" >
     {
      currentPost.map((values,i)=> <ProfileItem i={i} key={i} values={values} handleOpen={handleOpen} name={currentPost[i].name}/> )
     }
    </div>
   </div>
  );
}


