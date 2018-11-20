import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//redux
import { Provider } from 'react-redux';

//import logo from './logo.svg';
import './App.css';

//reactstrap
//import { Container } from 'reactstrap';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';

//Auth
import Register from './components/auth/Register';
import Login from './components/auth/Login';

//Store
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div>
            <Navbar /> 
            <Route exact path="/" component={ Landing } />

            <Route exact path="/register" component={ Register } />
            <Route exact path="/login" component={ Login } />

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}


export default App;
