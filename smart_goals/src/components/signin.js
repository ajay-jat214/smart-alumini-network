import React from 'react';
import { connect } from 'react-redux';
import { CHANGE_ROUTE } from './redux/constants';
import { setRoute } from './redux/actions';
import { setEmailCredentials } from './redux/actions';
import { setUserNameCredentials } from './redux/actions';

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
            data2: ''
        }
    }
    
    componentDidUpdate(){
        this.props.rerender(this.state.data2);
    }

    onButtonSubmit =async (props) => {
        
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

    onSubmit1=()=>{
        if(this.state.signInEmail==='jatajay004@gmail.com')
            if(this.state.signInPassword==="ajstyles89")
                this.setState({data2:'admin'})
            else
                alert('invalid password')

    }
   
    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value })

    }

    render() {
        
        return (
            <article className = "vh-90 br2 ba dark-gray b--black-10 mv8 w-90 mt4  mw6 center shadow-5" >
            <main className = "white pa4 black-80 " >
            <div className = "measure center tc parent" >
            <fieldset id = "sign_up"
            className = "ba b--transparent " >
            <legend className = "f4 fw6 ph0 mh0 black" > Sign In </legend> 
            <div className = "mt3" >
            <label className = "db fw6 lh-copy f6 black" htmlFor = "email-address" > Email </label> 
            <input className = "b pa2 input-reset ba bg-white hover-bg-black hover-white w-100"
            type = "email"
            name = "email-address"
            id = "email-address"
            onChange = { this.onEmailChange }
            /> 
            </div> <div className = "mv3" >
            <label className = "db fw6 lh-copy f6 black" htmlFor = "password" > Password </label> 
            <input className = "b pa2 input-reset ba bg-white hover-bg-black hover-white w-100"
            type = "password"
            name = "password"
            id = "password"
            onChange = { this.onPasswordChange }
            />
            </div>

            </fieldset> 

         
            <div className = "black" >
            <input className = "black b ph3 pv2 input-reset ba b--white bg-white grow pointer f6 dib pointer"
            type = "submit"
            value = "Social Sign in"
            onClick = {() => {
            this.onButtonSubmit(this.props);
            this.props.rerender(this.state.data2);
            }}
            />
            <div className = "black" >
            <input className = "black b ph3 pv2 input-reset ba b--white bg-white grow pointer f6 dib pointer"
            type = "submit"
            value = "Admin Sign in"
            onClick = {() => {
            this.props.rerender(this.state.data2);
            this.onSubmit1(this.state.data2);
            }}
            />
            </div> 
          

            </div> 
            </div>
            </main> 
            </article>
        );

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);