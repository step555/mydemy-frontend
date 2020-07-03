import React from 'react'
import { Link, NavLink, withRouter } from "react-router-dom";
import {connect} from 'react-redux'
import { logoutUser } from '../redux/actions'

const Navbar = (props) => {

    const handleClick = (event) => {
        console.log("logging out")
        localStorage.clear()
        props.logoutUser()
    }

    return (
        <div id="navlist"> 
            <Link className="active" to="/">Mydemy</Link>
            <a href="#">Our Products</a> 
            <a href="#">Careers</a> 
            <Link to="/about">About Us</Link> 
            <a href="#">Contact Us</a> 
            <div className="navlist-right">
            <Link to="/course-list">Courses</Link>
            {props.user.currentUser || props.company.currentCompany ? 
                <div className="navlist-right">
                    {props.user.currentUser ? <Link to="/profile">Profile</Link> : null}
                    {props.user.currentUser ? <Link to="user-courses">Your Courses</Link> : null}
                    {props.company.currentCompany ? <Link to="/company-profile">Profile</Link> : null}
                    {!props.user.currentUser ? null : <Link to="/cart">Cart</Link>}
                    <Link to="/" onClick={handleClick}>Log out</Link> 
                </div>
                    : 
                        <Link to="/login">Log in/Register</Link>
            }
            </div>

        </div> 
    )
}

const mapStateToProps = (state) => {
    return {
      user: state.user,
      company: state.company
    };
  };

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));