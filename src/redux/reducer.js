import signUp from '../reducers/signUp';
import signIn from '../reducers/signIn';
import add from '../reducers/add.js';
import all from '../reducers/all.js';
import edit from '../reducers/edit.js';
import { combineReducers } from 'redux';


export default combineReducers({
    signUp,
    signIn,
    add,
    all,
    edit
});