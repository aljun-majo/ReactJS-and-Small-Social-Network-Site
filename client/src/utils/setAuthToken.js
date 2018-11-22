import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    console.log('if -- axios.defaults - setAuthToken.js ', axios.defaults);
    console.log('if -- token - setAuthToken.js ', token);
    // Apply to every request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    console.log('else -- axios - setAuthToken.js ', axios.defaults);
    // Delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
