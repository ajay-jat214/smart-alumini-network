import React, { useState, useEffect } from "react";
import { Card } from "@material-ui/core";
import { connect } from "react-redux";
import { CHANGE_CHAT_SEARCH } from "./redux/constants";
import ChatList from "./chatlist";
import "./homepage.css";
import Typewriter from "typewriter-effect";
import { setChatSearch } from "./redux/actions";
import values from "./values";
import Messaging from "./messaging";
import Chat from "./chat";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { messageSearch } from "./redux/actions";
import io from "socket.io-client";
import ScrollToBottom, { useScrollToBottom } from "react-scroll-to-bottom";
import Grid from "@material-ui/core/Grid";
let dataArray = [];
let socket;
let prof = "";
let userValuse1 = [];
let imageArray = [];
let photo = "";
let firstName = "";

var cardstyle = {
  display: "block",
  height: "470px",
};
var cardd = {
  background: "#005254",
};

var carddd = {
  background: "black",
};

const mapStateToProps = (state) => {
  const emailCredentials = state.emailDetails.emailCredentials;
  const email = state.searchChat.chatSearch.email;
  const userName = state.searchChat.chatSearch.userName;
  const userNameCredentials = state.userNameDetails.userNameCredentials;
  const x = { emailCredentials, userNameCredentials, email, userName };
  return x;
};

const mapDispatchToProps = (dispatch) => {
  return { search: (values) => dispatch(messageSearch(values)) };
};

function HomePage(props) {
  const [chatSearch, setChatSearch] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [sentMessage, setSentMessage] = useState("");
  const [array, setArray] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [select, setSelect] = useState(-1);
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("");
  const [demo, setDemo] = useState("");
  const [value, setValue] = useState([]);
  const [mess, setMess] = useState([]);
  const [sessionMessages, setSessionMessages] = useState([]);
  const ENDPOINT = "https://smart-network.herokuapp.com/";
  const scrollToBottom = useScrollToBottom();

  useEffect(() => {
    socket = io(ENDPOINT);

    const email = props.email;
    const name = props.firstName;
    const userNameCredentials = props.userNameCredentials;

    socket.emit("join", { email: props.emailCredentials, name: name });

    // return()=>{
    //  socket.emit('disconnect');
    //  socket.off();
    // }
  }, [ENDPOINT, props]);

  useEffect(() => {
    fetch("https://smart-network.herokuapp.com/messaging", {
      method: "post",
      headers: { Authentication: "Content-Type:application/json" },
      body: JSON.stringify({
        emailCredentials: props.emailCredentials,
        email: props.email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length) setMessageList(data[0].message);
      })
      .catch((err) => {
        console.log(err);
        setMessageList([]);
      });
  }, [ENDPOINT, props, props.email]);

  useEffect(() => {
    fetch("https://smart-network.herokuapp.com/getImage", {
      method: "get",
      headers: { Authentication: "Content-Type:multipart/form-data" },
    })
      .then((response) => response.json())
      .then((data1) => {
        for (let j = 0; j < data1.values.length; j++) {
          prof = data1.values[j].image;
          prof = prof.substring(15, prof.length);
          prof = "https://smart-network.herokuapp.com/uploads/" + prof;
          imageArray = [
            ...imageArray,
            { email: data1.values[j].email, photo: prof },
          ];
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
    socket.on("recieveMessage", ({ emailCredentials, email, message }) => {
      setDemo("dkflasdf");
      setMess([...mess, { email: emailCredentials, message: message }]);
      specialFunction1(email, emailCredentials, message);
      setMessages([...messages, { emailCredentials, message }]);
      setFrom(emailCredentials);
      setTo(email);
      setSentMessage(message);
      setSessionMessages([
        ...sessionMessages,
        { emailCredentials: emailCredentials, email: email, message: message },
      ]);
      props.search({ from: emailCredentials, message: message });
    });

    specialFunction1(props.emailCredentials, props.email, sentMessage);
    if (sentMessage.length)
      setArray([
        ...dataArray,
        {
          emailCredentials: props.emailCredentials,
          email: props.email,
          message: sentMessage,
        },
      ]);

    setSentMessage("");
  }, [ENDPOINT, props, sentMessage, message]);

  const specialFunction1 = (emailCredentials, email, message) => {
    fetch("https://smart-network.herokuapp.com/messaging", {
      method: "post",
      headers: { Authentication: "Content-Type:application/json" },
      body: JSON.stringify({
        emailCredentials: emailCredentials,
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length) {
          dataArray = data[0].message;
          setArray(data[0].message);
        } else setArray([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendMessage = (event) => {
    setDemo("kdfjl");
    if (message.length) {
      event.preventDefault();
      setSentMessage(message);
      if (message) {
        const email = props.email;
        const userName = props.userName;
        const userNameCredentials = props.userNameCredentials;
        const emailCredentials = props.emailCredentials;
        localStorage.setItem("email", emailCredentials);
        socket.emit(
          "sendMessage",
          { email, message, userName, emailCredentials, userNameCredentials },
          () => setMessages([...messages, message])
        );

        setMessage("");
      }
      specialFunction1(props.emailCredentials, props.email, message);
    }
  };

  const chatt = values.filter((values, i) => {
    return values.name.toLowerCase().includes(chatSearch.toLowerCase());
  });

  for (let i = 0; i < imageArray.length; i++) {
    if (imageArray[i].email === props.email) {
      photo = imageArray[i].photo;
      break;
    } else photo = "";
  }

  return (
    <div style={{ marginTop: "30px" }}>
      <div className='courier f2 lh-copy rok ' style={{ color: "#F75990" }}>
        <Typewriter
          options={{
            strings: ["CHAT"],
            autoStart: true,
            loop: true,
          }}
        />
      </div>

      <Grid
        container
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        direction='column'
      >
        <div className=''>
          <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
            <input
              className='h2 glow:hover input-reset ba b--white bg-black hover-bg-white hover-black  white'
              placeholder='search'
              style={{ width: "100%" }}
              onChange={(event) => setChatSearch(event.target.value)}
            />
          </Grid>
        </div>

        <Grid item container xl={12} lg={12} md={12} sm={12} xs={12}>
          <Grid item xl={3} lg={4} md={4} sm={6} xs={3}>
            <ChatList
              demo={demo}
              chatSearch={chatSearch}
              array={messageList}
              emailCredentials={props.emailCredentials}
              email={props.email}
            />
          </Grid>

          <Grid
            item
            container
            direction='column'
            xl={9}
            lg={8}
            md={8}
            sm={6}
            xs={9}
          >
            <Grid item>
              {photo.length ? (
                <Card style={cardd} className='flex row w-100'>
                  <img
                    src={photo}
                    height='50px'
                    width='50px'
                    className='br-pill ml2'
                  />
                  <div className='white pl2 h-100-ns f3 measure-wide ml2 mt2'>
                    {props.userName.charAt(0).toUpperCase() +
                      props.userName.slice(1)}
                  </div>
                </Card>
              ) : (
                <Card style={cardd} className='white flex row'>
                  <AccountCircleIcon
                    style={{ height: "50px", width: "50px" }}
                  />
                  <div className='white pl2 h-100-ns f3 measure-wide ml2 mt2'>
                    {props.userName.charAt(0).toUpperCase() +
                      props.userName.slice(1)}
                  </div>
                </Card>
              )}
            </Grid>

            <div className='w-100 h-75 scroll'>
              <Card style={{ height: "100%" }}>
                {array.length ? (
                  <div
                    style={{ height: "350px" }}
                    className='messaging scrollll '
                  >
                    <div className='wall'>
                      <Messaging
                        array={array}
                        messages={messageList}
                        from={from}
                        to={to}
                        emailCredentials={props.emailCredentials}
                        email={props.email}
                      />
                    </div>
                  </div>
                ) : (
                  <div className='walls white b pl2 pt2'>
                    Hey, Welcome to the Chat!!
                  </div>
                )}
              </Card>
            </div>

            <div className='w-100 ajay'>
              <Card style={carddd}>
                <input
                  placeholder='type message...'
                  style={{ height: "20px", width: "100%" }}
                  className='pa2 ma2 ba b--near-white'
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  onKeyPress={(event) =>
                    event.key === "Enter" ? sendMessage(event) : null
                  }
                />
              </Card>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
