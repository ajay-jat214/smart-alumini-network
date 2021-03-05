import React,{useState,useEffect} from 'react';
import {Card} from '@material-ui/core';
import './homepage.css';
import {setChatSearch,setClick} from './redux/actions';
import {connect} from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import {Avatar} from 'antd'
var cardstyle={
 height:'60px',
 width:'370px',
 background:'black',
 color:'white',

}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const mapStateToProps=(state)=>{
	const emailCredentials=state.emailDetails.emailCredentials;
  const email=state.searchChat.chatSearch.email;
	const x={emailCredentials}
	return x;
}

const mapDispatchToProps=(dispatch)=>{
	return{ 
    search:(values)=>dispatch(setChatSearch(values)),
    click:(values)=>dispatch(setClick(values))
	}
}
function ChatItem(props){
 const classes = useStyles();
 return(
 <div>
 <div className="pt2 ">{
   props.emailCredentials!=props.values[props.id].email
   ?
   <div onClick={props.click.bind(null,1)}>
  <div className="flex pl2 pb1 pt1 pointer glow:hover input-reset  bg-black white ajay " onClick={props.search.bind(null,props.values[props.id])} >
   <div>{
    props.values[props.id].photo.length
    ?
    <div className="flex row">
    <img src={props.values[props.id].photo} onerror="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.pnghttps://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style={{height:"45px",width:"45px",position:'absolute'}} className="br-pill ajeeb"/>
    <div style={{flex:'1'}}>{
    props.id<props.notificationLength
    ?
    <div className="notifications">
    <Badge badgeContent={1} color="error" style={{position:'absolute'}}>
      <MailIcon />
    </Badge>
    </div>
    :
    null
    }</div>
    </div>
    :
    <div className="flex row">
    <AccountCircleIcon style={{height:"50px",width:"50px"}}/>
    <div>{
    props.id<props.notificationLength
    ?
    <div className="notifications z-999">
    <Badge badgeContent={1} color="error" style={{position:'absolute'}}>
      <MailIcon />
    </Badge>
    </div>
    :
    null
    }</div>
    </div>
   }</div>
  <div className="pt3 ml5 pl5">
  {props.values[props.id].firstName.charAt(0).toUpperCase()+props.values[props.id].firstName.slice(1)}
  </div>
  </div>
  </div>
  :
  null
 }</div>
 
 </div>
 );
}

export default connect(mapStateToProps,mapDispatchToProps)(ChatItem);