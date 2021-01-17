import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from './components/navigation';
import Network from './components/network';
import HomePage from './components/homepage';
import UserSection from './components/usersection';
import './App.css';
import Signin from './components/signin';
import Register from './components/register';
import values from './components/values';
import { connect } from 'react-redux';
import { setAluminiSearch } from './components/redux/actions';
import { searchAlumini } from './components/redux/reducer';
import { searchFiltered } from './components/redux/reducer';
import { setFilteredSearch } from './components/redux/actions';
import {Button} from '@material-ui/core';
import Particles from 'react-particles-js';
import {Card} from '@material-ui/core';
import Admin from './admin';


class App extends Component {

    constructor() {
        super()
        this.state = {
            routes: 'unsuccess'
        }
    }


    rerender = async(routes) => {
        await this.setState({ routes: routes });
        localStorage.setItem('routes', routes);
    }

    logout = async() => {
        let r;
        fetch('https://smart-network.herokuapp.com/logout', {
                method: 'post',
                headers: { Authentication: 'Content-Type:application/json' },
                body: JSON.stringify({})
            })
            .then(response => response.json())
            .then(user => {
                r = user;
                localStorage.setItem('routes', user)
            })
        await this.setState({ routes: r });
    }

  
    render() {

        return (
            localStorage.getItem('routes') === 'admin' ?
            <
            Admin logout = { this.logout }
            /> :
            (
                localStorage.getItem('routes')==='success' ?
                <
                div className = "bg-light-gray pa2 ma2" >

                <
                div className = "" >
                <
                Navigation / >
                <
                Button onClick = { this.logout }
                variant = "contained"
                size = "small"
                color = "secondary" > LogOut < /Button> 
                <
                /div> <
                div className = "bg-light-gray pa2 ma2" >
                <
                Switch >
                <
                Route path = '/usersection'
                component = { UserSection }
                />  <
                Route path = '/network'
                component = { Network }
                />  <
                Route path = '/'
                component = { HomePage }
                />  <
                /Switch> <
                /div> 

                <
                /div>  :
                (
                   <div class="particles">
                   <Particles className='particles'
                     params={
                              {
                            particles: {
                                  number:{
                                  value:250,
                                  density:{
                                  enable:true,
                                  value_area:800
                                }
                                }
                              }
                             ,
                            repulse: {
                            distance: 200,
                            duration: 0.4
                            },
                   
                            onhover: {
                            enable: true,
                            mode:' repulse'
                            },
                              interactivity: {
                            events: {
                            onhover: {
                            enable: true,
                            mode: 'repulse'
                              }
                            }
                          }
                       }
                     }
                          
                    />
                    <
                    div className = 'bgds' >
                    <
                    Signin onEmailChange = { this.onEmailChange }
                    onStateChange = { this.onStateChange }
                    rerender = { this.rerender }
                    />   <
                    /div>
                    </div>
                )
            )
        );
    }
}

export default App;