import React, { Component } from 'react';
//import axios from 'axios'; moved axios to authActions.js
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';

//react redux part
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  } 

  //to receive props from redux errors: state.errors
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps - Register.js', nextProps);
    if(nextProps.errors) {
      console.log('componentWillReceiveProps inside IF - Register.js',nextProps);
   
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    //props from Redux
    // invoke redux action 'registerUser'
    this.props.registerUser(newUser, this.props.history);

    //TODO: remove when in prod
    console.log('newUser this.props.history Register.js', newUser, this.props.history);
    // moved to authActions.js
    // axios
    //   .post('/api/users/register', newUser)
    //   .then(res => console.log(res.data))
    //   .catch(err => this.setState({ 
    //     errors: err.response.data //from server res
    //   }));
  }

  render() {
    const { errors } = this.state;

    //redux state
    /* this.porps.auth
    *    .user
    *    .isAuthenticated
    *  file: reducers/authReducer.js
    *  const initialState = {
    *    isAuthenticated: false,
    *    user: {}
    *  };
    *  
    *  user is an Object
    *  .user.name
    *  .user.email
    *  .user.password
    *  .user.password2
    * 
    */

    //const { user } = this.props.auth;

    return (
      <section className="full-height register-bg register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.name
                    })}
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password2
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

//export default Register;

//redux
//export default connect(null, { registerUser })(Register);

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

/*
 *  auto: state.auto || the state.'auto' is comes from reducers/index.js
 *  inedx.js = auth: authReducer, // use this.props.auth
 *  =====================
 *  can be access also as
 *   this.props.auth.user
 *   this.props.auth.isAuthenticated
 * 
 *   //errors
 *  this.props.errors
 *  use anothe lifecycle method to use this 'errors'
 *  componentWillRecieveProps()
 */
 const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

// withRouter added for the history use
// ang change this line above 'this.props.registerUser(newUser, this.props.history');
export default connect(mapStateToProps, { registerUser })(withRouter(Register));