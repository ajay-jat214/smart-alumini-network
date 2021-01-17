import { CHANGE_ALUMINI_SEARCH,CHANGE_CHAT_SEARCH, CHANGE_FILTERED_SEARCH, CHANGE_ROUTE , CHANGE_CLICK ,EMAIL_SIGNIN_CREDENTIALS,USERNAME_SIGNIN_CREDENTIALS,MESSAGE_OBJECT,MESSAGE_LIST,EVENTS_LOAD_CONST} from './constants.js';
const initialstate = {
    aluminiSearch: ''
}

export const searchAlumini = (state = initialstate, action = {}) => { //searchRobots

    switch (action.type) {
        case CHANGE_ALUMINI_SEARCH:
            return Object.assign({}, state, { aluminiSearch: action.payload });
        default:
            return state;
    }

}

const initialstate2 = {
    filteredSearch: ''
}

export const searchFiltered = (state = initialstate2, action = {}) => { //searchRobots

    switch (action.type) {
        case CHANGE_FILTERED_SEARCH:
            return Object.assign({}, state, { filteredSearch: action.payload });
        default:
            return state;
    }

}

const initialstate3 = {
    routes: ''
}

export const searchRoute = (state=initialstate3, action = {}) => { //searchRobots
  
    switch (action.type) {
        case CHANGE_ROUTE:
            return Object.assign({}, state, { routes: action.payload });
        default:
            return state;
    }

}

const initialstate4 = {
    chatSearch: ''
}

export const searchChat = (state = initialstate4, action = {}) => { //searchRobots
 
    switch (action.type) {
        case CHANGE_CHAT_SEARCH:
            return Object.assign({}, state, { chatSearch: action.payload });
        default:
            return state;
    }

}

const initialstate10 = {
    click: 0
}

export const searchClick = (state = initialstate10, action = {}) => { 
 console.log('uess');
    switch (action.type) {
        case CHANGE_CLICK:
            return Object.assign({}, state, { click: action.payload });
        default:
            return state;
    }

}

const initialstate5 = {
    emailCredentials: ''
}

export const emailDetails = (state = initialstate5, action = {}) => { //searchRobots
 
    switch (action.type) {
        case EMAIL_SIGNIN_CREDENTIALS:
            return Object.assign({}, state, { emailCredentials: action.payload });
        default:
            return state;
    }

}

const initialstate6 = {
    userNameCredentials: ''
}

export const userNameDetails = (state = initialstate6, action = {}) => { //searchRobots
 
    switch (action.type) {
        case USERNAME_SIGNIN_CREDENTIALS:
            return Object.assign({}, state, { userNameCredentials: action.payload });
        default:
            return state;
    }

}

const initialstate7 = {
    messageObject: ''
}

export const messageDetails = (state = initialstate7, action = {}) => { //searchRobots
 
    switch (action.type) {
        case MESSAGE_OBJECT:
            return Object.assign({}, state, { messageObject: action.payload });
        default:
            return state;
    }

}

const initialstate8 = {
    allMessages: ''
}

export const messageList = (state = initialstate8, action = {}) => { //searchRobots
 
    switch (action.type) {
        case MESSAGE_LIST:
            return Object.assign({}, state, { allMessages: action.payload });
        default:
            return state;
    }
}

const initialstate9 = {
    EVENTS_LOAD: ''
}

export const calendarList = (state = initialstate9, action = {}) => { //searchRobots
 
    switch (action.type) {
        case EVENTS_LOAD_CONST:
            return Object.assign({}, state, { EVENTS_LOAD: action.payload });
        default:
            return state;
    }
}