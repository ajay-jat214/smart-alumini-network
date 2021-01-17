import React,{useState} from 'react';
import {Card} from '@material-ui/core';
import {Box} from '@material-ui/core';
import { Avatar, Image } from 'antd';
import { Modal, Button } from 'antd';
import './profileitem.css';

export default function ProfileItem({i,values,handleOpen,name}){

 var cardstyle = {
 
    width: '20vw',
    transitionDuration: '0.3s',
    height: '20vw',
}	

  return(

  	<div className="relative pa3 tc tj center">
    <Card style={cardstyle}>
     <div>{
      values.photo.length
      ?
        <Avatar src={values.photo} className="  h1 w2 grow  profile db h-80 w-auto br-100"  onClick={()=>{handleOpen(i);}}/>
      :
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" className="  h5 w5 grow  profile db w-80 h-auto " onClick={()=>{handleOpen(i);}}/>
     }</div>
     <div>{name}</div>
     </Card> 
     </div>
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