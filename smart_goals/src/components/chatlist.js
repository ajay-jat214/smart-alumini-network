import React,{useState,useEffect} from 'react';
import values from './values';
import ChatItem from './chatitem';
import './homepage.css';
let data2;
let userValues1=[],imageArray=[],prof='',chat=[];
let timeStamp1=[],notificationLength=0;

function ChatList(props){

 const [values,setValues]=useState([]);
 const [userValues,setUserValues]=useState([]);
 const [timeStamp,setTimeStamp]=useState([]);

 useEffect(()=>{
          chat=[];
          setUserValues([]);imageArray=[];
          userValues1=[];timeStamp1=[];notificationLength=0;chat=0;

          for(let i=0;i<userValues1.length;i++)
            userValues1.pop();
          for(let i=0;i<userValues.length;i++)
            userValues.pop();
          for(let i=0;i<timeStamp1.length;i++)
            timeStamp1.pop();
          for(let i=0;i<timeStamp.length;i++)
            timeStamp.pop();
          for(let i=0;i<imageArray.length;i++)
            imageArray.pop();

          for(let i=0;i<chat.length;i++)
            chat.pop();

          fetch('https://git.heroku.com/smart-network/getImage', {
                        method: 'get',
                        headers: { Authentication: 'Content-Type:multipart/form-data' },
                    })
                    .then(response => response.json())
                    .then(data1 => {
                      imageArray=data1;
                    })
                    .catch(err=>console.log(err));
            fetch('https://git.heroku.com/smart-network/fetchUsers', {
                  method: 'get',
                  headers: { Authentication: 'Content-Type:application/json' },
              })
              .then(response => response.json())
              .then(data => {
            
                  if (data) {

                            for(let i=0;i<data.values.length;i++)
                             if(props.emailCredentials!==data.values[i].email)
                              fetch('http://git.heroku.com/smart-network/fetchStamp/',{
                                method:'post',
                                headers: {Authentication:'Content-Type:application/json'},
                                body: JSON.stringify({
                                  email:data.values[i].email,
                                  emailCredentials:props.emailCredentials,
                                }),
                              })
                              .then(res=>res.json())
                              .then(data1=>{

                                if(!timeStamp.includes({emailCredentialsOfLastMessage:data1[0].message[data1[0].message.length-1].emailCredentials})){
                                  timeStamp1=[...timeStamp1,{timeStamp:data1[0].message[data1[0].message.length-1].timeStamp,emailCredentialsOfLastMessage:data1[0].message[data1[0].message.length-1].emailCredentials}];
                                  setTimeStamp([...timeStamp,{timeStamp:data1[0].message[data1[0].message.length-1].timeStamp,emailCredentialsOfLastMessage:data1[0].message[data1[0].message.length-1].emailCredentials}]);
                                }

                              })
                              .catch(err=>console.log(err));
                              
                              timeStamp1.sort((a,b) => (a.timeStamp > b.timeStamp) ? 1 : ((b.timeStamp > a.timeStamp) ? -1 : 0)); 

                              for(let i=0;i<data.values.length;i++){
                                let j=0;
                                for(j;j<imageArray.values.length;j++){
                                  if(data.values[i].email===imageArray.values[j].email){
                                    prof=imageArray.values[j].image;
                                    prof=prof.substring(15,prof.length);
                                    prof="http://localhost:3001/uploads/"+prof;
                                    setUserValues([...userValues,{email:data.values[i].email,firstName:data.values[i].firstName,userName:data.values[i].userName,field:data.values[i].field,lastName:data.values[i].lastName,contact:data.values[i].phone,photo:prof}]);
                                    if(data.values[i].email!==props.emailCredentials)
                                      if(!userValues1.includes({email:data.values[i].email}))
                                        userValues1=[...userValues1,{email:data.values[i].email,firstName:data.values[i].firstName,userName:data.values[i].userName,field:data.values[i].field,lastName:data.values[i].lastName,contact:data.values[i].phone,photo:prof}];
                                    break;
                                  }
                                }
                                
                                if(j!==imageArray.values.length)
                                  continue;
                                if(!userValues1.includes({email:data.values[i].email}))
                                  setUserValues([...userValues,{email:data.values[i].email,firstName:data.values[i].firstName,userName:data.values[i].userName,field:data.values[i].field,lastName:data.values[i].lastName,contact:data.values[i].phone,photo:''}]);
                                  userValues1=[...userValues1,{email:data.values[i].email,firstName:data.values[i].firstName,userName:data.values[i].userName,field:data.values[i].field,lastName:data.values[i].lastName,contact:data.values[i].phone,photo:''}];

                              }
                }else {
                      alert(data)
                  }
              })  

    },[]);


  // if(timeStamp.length===5)
  // console.log(new Date(timeStamp[0].timeStamp),new Date(timeStamp[1].timeStamp),new Date(timeStamp[0].timeStamp)>new Date(timeStamp[1].timeStamp));
  timeStamp1.sort((a,b) => (b.timeStamp > a.timeStamp) ? 1 : ((a.timeStamp > b.timeStamp) ? -1 : 0)); 

	 chat=userValues.filter((values,i)=>
    {return values.firstName.toLowerCase().includes(props.chatSearch.toLowerCase())});

  let k=timeStamp1.length-1;
  let demoArray=[];
  for(let i=0;i<timeStamp1.length;i++){
    for(let j=0;j<userValues1.length;j++){
      if(userValues1[j].email!==props.emailCredentials)
        if(userValues1[j].email===timeStamp1[i].emailCredentialsOfLastMessage){
          demoArray[i]=userValues1[j];
        }
    }
    if(i===timeStamp1.length-1){

      chat=demoArray;

      notificationLength=chat.length;
    }
  }
  for(let i=0;i<userValues1.length;i++)
    if(!chat.includes(userValues1[i]))
      chat.push(userValues1[i]);
 return(
  <div  style={{ overflowY:'scroll',border: '5px solid black',height:'470px',display:'block'}} className="ghumao ">{
  	 chat.map((values,id)=><ChatItem values={chat} id={id} notificationLength={notificationLength}/>)
  }</div>
 );

}

export default ChatList;