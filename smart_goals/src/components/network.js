import React, { useState, useEffect } from "react";
import values from "./values";
import { Card } from "@material-ui/core";
import Profiles from "./profiles";
import { setAluminiSearch } from "./redux/actions";
import { connect } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton } from "@material-ui/core";
import { InputAdornment } from "@material-ui/core";
import { CHANGE_ALUMINI_SEARCH } from "./redux/constants";
import Pagination from "./pagination";
import { withRouter } from "react-router-dom";
import { setFilteredSearch } from "./redux/actions";
import Typewriter from "typewriter-effect";
import Grid from "@material-ui/core/Grid";
import "./usersection.css";
let userValues = [];
let length = 0;
let imageArray = [];
let prof = "";
let state = "";
var cardstyle = {
  width: "100%",
  height: "window.innerHeight",
  margin: "32px",
};
const mapStateToProps = (state) => {
  state = state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    search: (aluminiSearch) => dispatch(setAluminiSearch(aluminiSearch)),
    search2: (aluminiSearch) => dispatch(setFilteredSearch(aluminiSearch)),
  };
};

function Network(props) {
  const [aluminiSearch, SetAluminiSearch] = useState("d");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(1);
  const indexOfLastPage = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;
  const [demoArray, setDemoArray] = useState([]);
  const [userValues1, setUserValues1] = useState([]);
  useEffect(() => {
    userValues = [];
    setUserValues1([]);
    fetch("https://smart-network.herokuapp.com/getImage", {
      method: "get",
      headers: { Authentication: "Content-Type:multipart/form-data" },
    })
      .then((response) => response.json())
      .then((data1) => {
        imageArray = data1;
      })
      .catch((err) => console.log(err));
    fetch("https://smart-network.herokuapp.com/fetchUsers", {
      method: "get",
      headers: { Authentication: "Content-Type:application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        length = data.values.length;
        if (data.values.length) {
          for (let i = 0; i < data.values.length; i++) {
            let j = 0;
            for (j; j < imageArray.values.length; j++) {
              if (data.values[i].email === imageArray.values[j].email) {
                prof = imageArray.values[j].image;
                prof = prof.substring(15, prof.length);
                prof = "https://smart-network.herokuapp.com/uploads/" + prof;
                userValues = [
                  ...userValues,
                  {
                    name:
                      data.values[i].firstName.charAt(0).toUpperCase() +
                      data.values[i].firstName.slice(1) +
                      " " +
                      data.values[i].lastName.charAt(0).toUpperCase() +
                      data.values[i].lastName.slice(1),
                    email: data.values[i].email,
                    firstName: data.values[i].firstName,
                    userName: data.values[i].userName,
                    field: data.values[i].field,
                    lastName: data.values[i].lastName,
                    contact: data.values[i].phone,
                    photo: prof,
                  },
                ];
                setUserValues1([
                  ...userValues1,
                  {
                    name:
                      data.values[i].firstName.charAt(0).toUpperCase() +
                      data.values[i].firstName.slice(1) +
                      " " +
                      data.values[i].lastName.charAt(0).toUpperCase() +
                      data.values[i].lastName.slice(1),
                    email: data.values[i].email,
                    firstName: data.values[i].firstName,
                    userName: data.values[i].userName,
                    field: data.values[i].field,
                    lastName: data.values[i].lastName,
                    contact: data.values[i].phone,
                    photo: prof,
                  },
                ]);
                setDemoArray(data.values);
                break;
              }
            }

            if (j !== imageArray.values.length) continue;
            userValues = [
              ...userValues,
              {
                name:
                  data.values[i].firstName.charAt(0).toUpperCase() +
                  data.values[i].firstName.slice(1) +
                  " " +
                  data.values[i].lastName.charAt(0).toUpperCase() +
                  data.values[i].lastName.slice(1),
                email: data.values[i].email,
                firstName: data.values[i].firstName,
                userName: data.values[i].userName,
                field: data.values[i].field,
                lastName: data.values[i].lastName,
                contact: data.values[i].phone,
                photo:
                  "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
              },
            ];
            setUserValues1([
              ...userValues1,
              {
                name:
                  data.values[i].firstName.charAt(0).toUpperCase() +
                  data.values[i].firstName.slice(1) +
                  " " +
                  data.values[i].lastName.charAt(0).toUpperCase() +
                  data.values[i].lastName.slice(1),
                email: data.values[i].email,
                firstName: data.values[i].firstName,
                userName: data.values[i].userName,
                field: data.values[i].field,
                lastName: data.values[i].lastName,
                contact: data.values[i].phone,
                photo:
                  "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
              },
            ]);
            setDemoArray(data.values);
          }
        } else {
          alert(data);
        }
      });
  }, []);

  let currentPost = userValues.filter((Values) => {
    return Values.field.toLowerCase().includes(aluminiSearch.toLowerCase());
  });

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    console.log("pagenumber:", pageNumber);
  };

  const search1 = (event) => {
    SetAluminiSearch(event.target.value);
  };

  return (
    <div className='tc '>
      <div className='courier f2 lh-copy ' style={{ color: "#F75990" }}>
        <Typewriter
          options={{
            strings: ["WELCOME"],
            autoStart: true,
            loop: true,
            cursorClassName: "Typewriter_cursor ",
          }}
          cursorClassName='Typewriter_cursor'
        />
      </div>
      <div className='relative pt4 dib'>
        <input
          className=' tc w-100 ba b--black-20 h2  input-reset newStyle'
          placeholder='search alumini'
          onChange={(event) => search1(event)}
        />
        <div className='dib relative bottom-1 left-2'>
          <div className='relative left-2'>
            <div className='relative left-2'>
              <InputAdornment>
                <IconButton>
                  <SearchIcon
                    onClick={() => {
                      props.search(aluminiSearch);
                      props.search2(aluminiSearch);
                    }}
                  />
                </IconButton>
              </InputAdornment>
            </div>
          </div>
        </div>
      </div>

      <Grid container direction='column'>
        <Grid item container style={{ marginTop: "50px" }}>
          <Grid item lg={2} md={1} xs={0} />
          <Grid item container xs={12} md={10} lg={8} spacing={2}>
            <Profiles currentPost={currentPost} demoArray={demoArray} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Network));
//<Pagination postsPerPage={postsPerPage} totalPosts={length} paginate={paginate}/>

// useEffect(()=>{
//     fetch('http://localhost:3001/fetchUsers', {
//                method: 'get',
//                headers: { Authentication: 'Content-Type:application/json' },
//            })
//            .then(response => response.json())
//            .then(data => {
//                 console.log(data);
//                 let j=1;
//                 userValues=[];
//                 for(let i of data.values){
//                 	userValues=[...userValues,{userName:i.userName,field:i.field,name:i.firstName+" "+ i.lastName,lastName:i.lastName,id:j++,contact:i.phone}];
//                 	setUserValues1([...userValues1,{userName:i.userName,field:i.field,name:i.firstName+" "+ i.lastName,lastName:i.lastName,id:j++,contact:i.phone}])
//                 }
//                 console.log(userValues);
//            })
//            .catch(err=>console.log(err))

// },[])
