import React from 'react';
import { connect } from 'react-redux';
import { CHANGE_ROUTE } from './redux/constants';
import { setRoute } from './redux/actions';
import { setEmailCredentials } from './redux/actions';
import { setUserNameCredentials } from './redux/actions';
import './usersection.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import UserForm from './userForm';
const mapStateToProps=(state)=>{
   }

const mapDispatchToProps = dispatch => {
    return {
        search: (data) => dispatch(setRoute(data)),
        search2: (data) => dispatch(setEmailCredentials(data)),
        search3: (data) => dispatch(setUserNameCredentials(data))
    }
}


class Signin extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            signInUserName:'',
            data2: '',
            signUp:false
        }
    }
    
    componentDidUpdate(){
        this.props.rerender(this.state.data2);
    }
    funCalling=()=>{this.setState({signUp:!this.state.signUp});}
    onButtonSubmit =async (props) => {
        this.props.rerender(this.state.data2);
        await fetch('https://smart-network.herokuapp.com/signin', {
                method: 'post',
                headers: { Authentication: 'Content-Type:application/json' },
                body: JSON.stringify({
                    email: this.state.signInEmail,
                    password: this.state.signInPassword
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'success') {
                    this.setState({signInUserName:data.userName});
                    props.search3(this.state.signInUserName);
                    this.setState({ data2: data.message });
                } else {
                    alert(data)
                }
            })
            .catch(err=>console.log(err))

            props.search2(this.state.signInEmail);
                        
    }

    onSubmit1=async()=>{
        
        if(this.state.signInEmail==='jatajay004@gmail.com')
            if(this.state.signInPassword==="ajstyles89"){
                            this.props.rerender("admin");
                            await this.setState({data2:'admin'});
                        }
            else
                alert('invalid password');

    }
   
    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value })

    }

    render() {
        
        return (
            <article className = "vh-90 br2 ba dark-gray b--black-10 mv8 w-90 mt4  mw6 center shadow-5" >{
                    <main className = "white pa4 black-80 " >
                    <div className = "measure center tc parent" >
                    <MuiThemeProvider >
                      <React.Fragment>
                        <Box className="box">
                        <TextField
                         hintText="Enter Your Email"
                         floatingLabelText="Email"
                         className="textField"
                         onChange={this.onEmailChange}
                         variant="outlined"
                        />
                        <br/>
                        <TextField
                        type="password"
                         hintText="Enter Your Password"
                         floatingLabelText="Password"
                         error={true}
                         onChange={this.onPasswordChange}
                        />
                        <br/>
                        </Box>
                      </React.Fragment>
                    </MuiThemeProvider> 

                 
                    <div className = "black" >

                    <Button style={{color:'black'}} onClick = {()=>{this.onButtonSubmit(this.props);this.props.rerender(this.state.data2);}}>Social Sign In</Button>
                    <div className = "black" >

                    <Button style={{color:'black'}} onClick = {()=>{this.onSubmit1(this.state.data2);this.props.rerender(this.state.data2);}}>Admin Sign In</Button>
                    </div> 
                  
                    <Button className="pointer grow" variant='outlined'onClick={this.props.funCalling}>Sign Up!</Button>
                    </div> 
                    </div>
                    </main> 

            }</article>
        );

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);