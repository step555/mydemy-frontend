import React from 'react'
import { Link, NavLink, withRouter } from "react-router-dom";
import {connect} from 'react-redux'
// import Navbar from 'react-bootstrap/Navbar'

const Navbar = (props) => {

    console.log("navbar props", props)
    // debugger
    return (
        <div id="navlist"> 
            <Link className="active" to="/">Mydemy</Link>
            <a href="#">Our Products</a> 
            <a href="#">Careers</a> 
            <a href="#">About Us</a> 
            <a href="#">Contact Us</a> 
            <div className="topnav-right">
            <Link to="/course-list">Courses</Link>
            {/* dropdown for profile to display account and dashboard? */}
            {props.user.currentUser ? 
                <div>
                    <Link to="/profile">Profile</Link>
                    <Link to="/cart">Cart</Link>
                    <Link to="/">Log out</Link>
                </div>
                    : 
                <div>
                    <Link to="/login">Log in</Link>
                </div> 

            }
            </div>

        </div> 
    )
}

// const NavbarWithRouter = withRouter(Navbar);

const mapStateToProps = (state) => {
    // debugger
    return {
      user: state.user,
    };
  };

// export default NavbarWithRouter;
export default withRouter(connect(mapStateToProps, null)(Navbar));