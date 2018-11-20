import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
  render() {
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
                        <DropdownToggle nav caret>
                        Account
                        </DropdownToggle>
                        <DropdownMenu right>
                        <Link className="dropdown-item" to="/login">Login</Link>
                        <DropdownItem divider />
                        <Link className="dropdown-item" to="/register">
                            Signup
                        </Link>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </section>
        </Navbar>
        
      </header>
    );
  }
}

Navbar.propTypes = {
    light: PropTypes.bool,
    dark: PropTypes.bool,
    fixed: PropTypes.string,
    color: PropTypes.string,
    role: PropTypes.string,
    expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
    // pass in custom element to use
  }
NavbarBrand.propTypes = {
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
    // pass in custom element to use
}

export default NavBar;