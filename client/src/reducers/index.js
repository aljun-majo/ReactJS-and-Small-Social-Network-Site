import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

//export to store.js
export default combineReducers({
  //authReducer.js
  auth: authReducer, // use this.props.auth
  //errorReducer.js
  errors: errorReducer // use this.props.errors
});
