import { TEST_DISPATCH, GET_ERRORS } from './types';
import axios from 'axios';

// Test Dispatch
// dispatch this into Register.js
// export const registerUser = userData => {
//   return {
//     type: TEST_DISPATCH,
//     payload: userData
//   }
// }

export const registerUser = (userData, history) => dispatch => {
  console.log('history - authActions.js', history);
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))//redirect to login page after successfuly registered
    .catch(err =>
      dispatch({// it will only dispatch when error occurs
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// import axios from 'axios';
// import setAuthToken from '../utils/setAuthToken';
// import jwt_decode from 'jwt-decode';

// //default CONSTANTS
// import { GET_ERRORS, SET_CURRENT_USER } from './types';

// // Register User
// export const registerUser = (userData, history) => dispatch => {
//   axios
//     .post('/api/users/register', userData)
//     .then(res => history.push('/login'))
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// // Login - Get User Token
// export const loginUser = userData => dispatch => {
//   axios
//     .post('/api/users/login', userData)
//     .then(res => {
//       // Save to localStorage
//       const { token } = res.data;
//       // Set token to ls
//       localStorage.setItem('jwtToken', token);
//       // Set token to Auth header
//       setAuthToken(token);
//       // Decode token to get user data
//       const decoded = jwt_decode(token);
//       // Set current user
//       dispatch(setCurrentUser(decoded));
//     })
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// // Set logged in user
// export const setCurrentUser = decoded => {
//   return {
//     type: SET_CURRENT_USER,
//     payload: decoded
//   };
// };

// // Log user out
// export const logoutUser = () => dispatch => {
//   // Remove token from localStorage
//   localStorage.removeItem('jwtToken');
//   // Remove auth header for future requests
//   setAuthToken(false);
//   // Set current user to {} which will set isAuthenticated to false
//   dispatch(setCurrentUser({}));
// };
