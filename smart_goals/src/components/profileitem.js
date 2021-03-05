import React,{useState} from 'react';
import {Box} from '@material-ui/core';
import { Image } from 'antd';
import { Modal } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {CardHeader,Avatar,IconButton,CardMedia} from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';


const useStyles=makeStyles((theme)=>({
  imageHeight:{
    objectFit:'cover',
  },
  FullHeight:{
    height:"100%",
    maxWidth:"320px",
    margin:'auto',
    minWidth:'250px',
  }
}))

export default function ProfileItem({i,values,handleOpen,name,photo}){
 const classes=useStyles();


  
  var a=name.slice(0,1).toUpperCase();
  return(
    <Card className={classes.FullHeight}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" >
            {a}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <ShareIcon />
          </IconButton>
        }
        title={name}
        subheader={values.contact}
      />

      {
      photo.length
      ?
        <CardMedia
          className={classes.imageHeight}
          style={{height:'200px'}}
          image={photo}
          onClick={()=>{handleOpen(i);}}
        />
      :
        <CardMedia
          className={classes.imageHeight}
          style={{height:'200px'}}
          image="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          onClick={()=>{handleOpen(i);}}
        />
      }
      <CardContent>
        <Typography variant="body1" component="p">
          {values.field}
        </Typography>
      </CardContent>

    </Card>
  );
}



          // fetch('http://localhost:3001/getImage', {
          //               method: 'get',
          //               headers: { Authentication: 'Content-Type:multipart/form-data' },
          //           })
          //           .then(response => response.json())
          //           .then(data1 => {
          //             imageArray=data1;
          //           })
          //           .catch(err=>console.log(err));
          //   fetch('http://localhost:3001/fetchUsers', {
          //         method: 'get',
          //         headers: { Authentication: 'Content-Type:application/json' },
          //     })
          //     .then(response => response.json())
          //     .then(data => {
                
          //         if (data) {
                    
          //                     for(let i=0;i<data.values.length;i++){
          //                       let j=0;
          //                       for(j;j<imageArray.values.length;j++){
          //                         if(data.values[i].email===imageArray.values[j].email){
          //                           prof=imageArray.values[j].image;
          //                           prof=prof.substring(15,prof.length);
          //                           prof="http://localhost:3001/uploads/"+prof;
          //                           userValues=[...userValues,{email:data.values[i].email,firstName:data.values[i].firstName,userName:data.values[i].userName,field:data.values[i].field,lastName:data.values[i].lastName,contact:data.values[i].phone,photo:prof}];
          //                           break;
          //                         }
          //                       }
                                
          //                       if(j!==imageArray.values.length)
          //                         continue;
          //                       userValues=[...userValues,{email:data.values[i].email,firstName:data.values[i].firstName,userName:data.values[i].userName,field:data.values[i].field,lastName:data.values[i].lastName,contact:data.values[i].phone,photo:''}];
              
          //                     }
          //       }else {
          //             alert(data)
          //         }
          //     }) 




   // <div className="relative pa3 tc tj center">
   //  <Card style={cardstyle}>
   //   <div>{
   //    values.photo.length
   //    ?
   //      <Avatar src={values.photo} className="  h1 w2 grow  profile db h-80 w-auto br-100"  onClick={()=>{handleOpen(i);}}/>
   //    :
   //      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" className="  h5 w5 grow  profile db w-80 h-auto " onClick={()=>{handleOpen(i);}}/>
   //   }</div>
   //   <div>{name}</div>
   //   </Card> 
   //   </div>