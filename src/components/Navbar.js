import React from 'react'
import { Link, NavLink, withRouter } from "react-router-dom";
// import Navbar from 'react-bootstrap/Navbar'

const Navbar = (props) => {

    return (
        <div id="navlist"> 
            <Link className="active" to="/">Mydemy</Link>
            <a href="#">Our Products</a> 
            <a href="#">Careers</a> 
            <a href="#">About Us</a> 
            <a href="#">Contact Us</a> 
            <div className="topnav-right">
            <Link to="/course-list">Courses</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/cart">Cart</Link>
            </div>

        </div> 
    )
}

const NavbarWithRouter = withRouter(Navbar);

export default NavbarWithRouter;