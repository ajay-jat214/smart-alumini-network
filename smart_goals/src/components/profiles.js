import React,{useState,useEffect} from 'react';
import ProfileItem from './profileitem';
import values from './values';
import {Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Modal} from '@material-ui/core';
import {Backdrop} from '@material-ui/core';
import {Fade} from '@material-ui/core';
import { Avatar, Image } from 'antd';
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

export default function Profiles({currentPost}){
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [id,setId]=useState('');
  const [userName,setUserName]=useState('');
  const [name,setName]=useState('');
  const [field,setField]=useState('');
  const [contact,setContact]=useState('');
  const [photo,setPhoto]=useState('');

  const handleOpen = (id) => {
  	setId(id);
  	setUserName(currentPost[id].userName);
  	setName(currentPost[id].name)
  	setField(currentPost[id].field);
  	setContact(currentPost[id].contact);
    setPhoto(currentPost[id].photo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

return(
	<div className="center tc" >
    <div>

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
              <div>{
              photo.length
              ?
              <Avatar src={photo} className=" pr2 h-auto w-auto grow  profile db xs" />
              :
	            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" className=" pr2 h5 w5 grow  profile db" />
              }</div>
            <p id="transition-modal-description">Name : {name}</p>
            <p id="transition-modal-description">Field : {field}</p>
            <p id="transition-modal-description" className="center pl5 b">{contact}</p>
          </div>
        </Fade>
      </Modal>
    </div>
   <div className="mx-100 flex flex-wrap flex-center" >
     {
      currentPost.map((values,i)=> <ProfileItem i={i} key={i} values={values} handleOpen={handleOpen} name={currentPost[i].name}/> )
     }
    </div>
   </div>
  );
}


