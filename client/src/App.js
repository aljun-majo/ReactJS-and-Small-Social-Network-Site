import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

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



class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar /> 
          <Route exact path="/" component={ Landing } />

          <Route exact path="/register" component={ Register } />
          <Route exact path="/login" component={ Login } />

          <Footer />
        </div>
      </Router>
    );
  }
}


export default App;
