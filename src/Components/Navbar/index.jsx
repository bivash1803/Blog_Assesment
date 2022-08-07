import { Link } from "react-router-dom";
import React from "react";
import PropTypes from 'prop-types'
const Navbar = ({ authUser,removeAuthUser }) => {
  //authuser = false
  //console.log(authUser)
  return (
    <nav className="topbar topbar-inverse topbar-expand-md topbar-sticky">
      <div className="container">
        <div className="topbar-left">
          <button className="topbar-toggler">☰</button>
          <Link className="topbar-brand" to="/">
            <img className="logo-default" src={`${process.env.PUBLIC_URL}/assets/img/logo.png`} alt="logo" />
            <img className="logo-inverse" src={`${process.env.PUBLIC_URL}/assets/img/logo-light.png`} alt="logo" />
          </Link>
        </div>
        <div className="topbar-right">
          <ul className="topbar-nav nav">
            <li className="nav-item">
              {/* <a className="nav-link" href="index.html">Home</a> */}

              <Link className="nav-link" to="/">Home</Link>
            </li>
            {
              authUser &&
              <li className="nav-item">
                <Link className="nav-link" to="/articles/create">Write new article</Link>
              </li>
            }
            {
              authUser &&
              <li className="nav-item">
                <a className="nav-link">Hey {authUser && authUser.name} !!

                  <i className="fa fa-caret-down" />
                </a>
                <div className="nav-submenu">
                  <Link className="nav-link" to="/user/articles">My articles</Link>
                  <Link className="nav-link" to="/" onClick={()=>removeAuthUser()}>Logout</Link>
                </div>
              </li>
            }
            {

              !authUser &&
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            }
            {
              !authUser &&
              <li className="nav-item">
                <Link className="nav-link" to="/register">Signup</Link>
              </li>
            }
          </ul>
        </div>
      </div>
    </nav>

  )
}
Navbar.propTypes = {
  // authUser: PropTypes.shape({
  //   user: PropTypes.shape({
  //     name: PropTypes.string,
  //   }).isRequired,
  // }),
  removeAuthUser:PropTypes.func.isRequired,
  authUser: PropTypes.shape({
    name: PropTypes.string,
    token:PropTypes.string,
  }),
  





};

Navbar.defaultProps = {
  authUser: null,
};

export default Navbar;