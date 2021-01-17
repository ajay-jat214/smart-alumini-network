import * as React from 'react';
import {Card} from '@material-ui/core';
import Schedule from './schedule';
import {connect} from 'react-redux';
import './usersection.css';
import ToDoList from './todolist/todolist';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
const axios = require('axios');
const mapStateToProps=(state)=>{
   const email=state.emailDetails.emailCredentials;
   const x={email};
   return x;
}
let prof='';

  var cardstyle={
    display:'block',
    width:'100%',
    transitionDuration:'0.35s',
  }

  var cardstyle1={
    display:'block',
    width:'100%',
    transitionDuration:'0.35s',
  }


function UserSection(props){
  const [image, setImage] = React.useState({ preview: "", raw: "" });
  const [profile,setProfile]=React.useState('');
  const handleChange = e => {
 
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }
  };


  React.useEffect(()=>{
  fetch('https://smart-network.herokuapp.com/getImage', {
                method: 'get',
                headers: { Authentication: 'Content-Type:multipart/form-data' },
            })
            .then(response => response.json())
            .then(data => {
                 for(let i=0;i<data.values.length;i++){
                  if(data.values[i].email===props.email){
                    prof=data.values[i].image;
                    prof=prof.substring(15,prof.length);
                     setProfile(prof);
                     console.log(prof,profile);
                  }
                 }
            })
            .catch(err=>console.log(err))
  },[]);


  const handleUpload = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profileImage", image.raw);
    formData.append("email",props.email);
    
        axios.post("https://smart-network.herokuapp.com/uploadImage",formData,{
            headers: { Authentication: 'Content-Type:multipart/form-data' },
        }).then(res=>{
            
            prof=res.data.results.image;
            prof=prof.substring(15,prof.length);
             setProfile(prof);
           // this.setState({msg:res.data.message});
           // this.setState({profileImage:res.data.results.profileImage});
        })
        .catch(err=>console.log(err))


  };
 
console.log(profile);


 return(
     <div className="tc pa2 tc tj center maxy">
    <div className="tc tj center">
      <label htmlFor="profileImage">{
          profile.length
          ?
          <img src={"https://smart-network.herokuapp.com/"+profile} alt="dummy" height='70' width='70' className='br-100 ' />
          :
           <AccountCircleIcon style={{height:"50px",width:"50px"}}/>
      }</label>
      <input
        type="file"
        id="profileImage"
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <br />
      <div>{
      profile.length
      ?
      <button onClick={handleUpload}>Update</button>
      :
      <button onClick={handleUpload}>Upload</button>

      }</div>
    </div>
    <Card>
     <Schedule/>
    </Card>
     </div>
 	);

}

export default connect(mapStateToProps,null)(UserSection);
