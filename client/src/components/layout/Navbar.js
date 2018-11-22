import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// redux and auth
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {

    //from redux
    // isAuthenticated is bool and this came from redux 'auth'
    // user is object
    const { isAuthenticated, user } = this.props.auth

    const accountAdminNav = (
      <DropdownMenu right>
        <Link 
          className="dropdown-item" 
          title={`${user.name} profile`} 
          to="/profile"
        >
          <img 
            src={user.avatar} 
            alt={user.name} 
            title="This is your Gravatar image from your gravatar email account"
            className="rounded" 
            style={{
              verticalAlign: 'middle',
              width: '50px',
              height: '50px',
              borderRadius: '50%'
            }}
            />
            <span className="text-capitalize ml-2">{user.name}</span>
            <span className="small mt-3 mx-auto d-block">{user.email}</span>
        </Link>
            
        <DropdownItem divider />

        <Link 
          className="dropdown-item" 
          title="Edit Profile"
          to="/profile"
        >
          Edit Profile
        </Link>
        <DropdownItem 
          tag="a" 
          href="#" 
          onClick={this.onLogoutClick.bind(this)} 
          className="dropdown-item" 
          title="Log out"
        >
        <span>Logout</span></DropdownItem>
      </DropdownMenu>
    )
    const accountGuestNav = (
      <DropdownMenu right>
        <Link className="dropdown-item" to="/login">Login</Link>
        <DropdownItem divider />
        <Link className="dropdown-item" to="/register">
            Signup
        </Link>
      </DropdownMenu>
    )

    return (
      <header>
        <Navbar color="dark" dark expand="md">
            <section className="container">
                <Link className="navbar-brand" to="/">TheGoodArtisan</Link>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Link className="nav-link" to="/posts/all">News</Link>
                    </NavItem>
                    <NavItem>
                        <Link className="nav-link" to="/profiles">Profiles</Link>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        { 
                          //dropdown menu
                          isAuthenticated ? 
                            (
                              <DropdownToggle nav>
                                <span>Howdy,</span> 
                                <span className="ml-2 text-capitalize">{user.name}</span>
                                <span className="float-right ml-2">
                                  <img 
                                    src={user.avatar} 
                                    alt={user.name} 
                                    title="This is your Gravatar image from your gravatar email account"
                                    className="rounded" 
                                    style={{
                                      verticalAlign: 'middle',
                                      width: '20px',
                                      height: '20px',
                                      borderRadius: '50%'
                                    }}
                                    />
                                </span>
                              </DropdownToggle>    
                            )
                            
                            : 
                            <DropdownToggle nav caret>
                              Account
                            </DropdownToggle> 
                         }
                        
                        { 
                          //dropdown here
                          isAuthenticated ? accountAdminNav : accountGuestNav
                         }
                    </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </section>
        </Navbar>
        
      </header>
    );
  }
}

NavBar.propTypes = {
    light: PropTypes.bool,
    dark: PropTypes.bool,
    fixed: PropTypes.string,
    color: PropTypes.string,
    role: PropTypes.string,
    expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    // pass in custom element to use
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  }
NavbarBrand.propTypes = {
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
    // pass in custom element to use
}

const mapStateToProps = (state) => ({
  auth: state.auth
});



export default connect(mapStateToProps, { logoutUser })(NavBar);