import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
//import InboxIcon from '@material-ui/icons/MoveToInbox';
//import MailIcon from '@material-ui/icons/Mail';
import { Link } from 'react-router-dom';
import Network from './network';
import HomePage from './homepage';
import UserSection from './usersection';
import './hero.css';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/card';

const useStyles = makeStyles({
    list: {
        width: 250,
        height: window.innerHeight,
    },
    fullList: {
        width: 'auto',
    },
});

export default function Navigation(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [anchor]: open });
    };
    const list = (anchor) => ( <
        div className = " anchor1" >
        <
        div className = {
            clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })
        }
        role = "presentation"
        onClick = { toggleDrawer(anchor, false) }
        onKeyDown = { toggleDrawer(anchor, false) } >

        <
        List store = { props.store } > {
            ['Network'].map((text, index) => ( <
                Link to = '/network'
                className = "link" >
                <
                ListItem button key = { text } >
                <
                ListItemText primary = { text }
                /> <
                /ListItem> <
                /Link>
            ))
        } <
        /List> <
        Divider / >
        <
        List > {
            ['HomePage'].map((text, index) => ( <
                Link to = '/'
                className = "link" >
                <
                ListItem button key = { text } >
                <
                ListItemText primary = { text }
                /> <
                /ListItem> <
                /Link>
            ))
        } <
        /List> <
        Divider / >
        <
        List > {
            ['UserSection'].map((text, index) => ( <
                Link to = '/usersection'
                className = "link" >
                <
                ListItem button key = { text } >
                <
                ListItemText primary = { text }
                /> <
                /ListItem> <
                /Link>
            ))
        } <
        /List> <
        Divider / >

        <
        /div> <
        /div>
    );

    return ( <
        div className = "pr4 anchor2" >
        <
        Card >
        <
        div className = "nav" > {
            ['☰'].map((anchor) => ( <
                React.Fragment key = { anchor } >
                <
                Button onClick = { toggleDrawer(anchor, true) } > { anchor } < /Button> <
                Drawer anchor = { anchor }
                open = { state[anchor] }
                onClose = { toggleDrawer(anchor, false) } > { list(anchor) } <
                /Drawer> <
                /React.Fragment>
            ))
        } <
        /div> <
        /Card> <
        /div>
    );
}