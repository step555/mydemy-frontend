// import React from 'react'
// import { Link, NavLink, withRouter } from "react-router-dom";
// import {connect} from 'react-redux'
// import { logoutUser } from '../redux/actions'
// // import Navbar from 'react-bootstrap/Navbar'

// const Navbar = (props) => {

//     const handleClick = (event) => {
//         console.log("logging out")
//         localStorage.removeItem("token")
//         props.logoutUser()
//     }

//     console.log("navbar props", props)
//     return (
//         <div id="navlist"> 
//             <Link className="active" to="/">Mydemy</Link>
//             <a href="#">Our Products</a> 
//             <a href="#">Careers</a> 
//             <a href="#">About Us</a> 
//             <a href="#">Contact Us</a> 
//             <div className="topnav-right">
//             <Link to="/course-list">Courses</Link>
//             {/* dropdown for profile to display account and dashboard? */}
//             {props.user.currentUser ? 
//                 <div>
//                     <Link to="/profile">Profile</Link>
//                     {!props.user.currentUser ? null
//                     :
//                         <Link to="/cart">Cart</Link>
//                     }
//                     <Link to="/" onClick={handleClick}>Log out</Link>
//                 </div>
//                     : 
//                 <div>
//                     <Link to="/login">Log in</Link>
//                 </div> 
//             }
//             </div>

//         </div> 
//     )
// }

import React from 'react'
import { Link, NavLink, withRouter } from "react-router-dom";
import {connect} from 'react-redux'
import { logoutUser } from '../redux/actions'
// import Navbar from 'react-bootstrap/Navbar'

const Navbar = (props) => {

    const handleClick = (event) => {
        console.log("logging out")
        localStorage.removeItem("token")
        props.logoutUser()
    }

    return (
        <div id="navlist"> 
            <Link className="active" to="/">Mydemy</Link>
            <a href="#">Our Products</a> 
            <a href="#">Careers</a> 
            <a href="#">About Us</a> 
            <a href="#">Contact Us</a> 
            <div className="navlist-right">
            <Link to="/course-list">Courses</Link>
            {/* dropdown for profile to display account and dashboard? */}
            {props.user.currentUser || props.company.currentCompany ? 
                // <div className="navlist-right">
                //     {props.user.currentUser ? <Link to="/profile">Profile</Link> : null}
                //     {props.company.currentCompany ? <Link to="/company-profile">Profile</Link> : null}
                //     {!props.user.currentUser ? null : <Link to="/cart">Cart</Link>}
                //     {props.user.currentUser || props.company.currentCompany ? <Link to="/" onClick={handleClick}>Log out</Link> : <Link to="/login">Log in</Link>}
                // </div>
                <div className="navlist-right">
                    {props.user.currentUser ? <Link to="/profile">Profile</Link> : null}
                    {props.company.currentCompany ? <Link to="/company-profile">Profile</Link> : null}
                    {!props.user.currentUser ? null : <Link to="/cart">Cart</Link>}
                    <Link to="/" onClick={handleClick}>Log out</Link> 
                </div>
                    : 
                    <Link to="/login">Log in</Link>
            }
            </div>

        </div> 
    )
}

// const NavbarWithRouter = withRouter(Navbar);

const mapStateToProps = (state) => {
    // debugger
    return {
      user: state.user, // send company here as well
      company: state.company
    };
  };

  const mapDispatchToProps = (dispatch) => {
    // debugger
    return {
    //   logOut: (localStorage) => dispatch(logOut(localStorage))
    logoutUser: () => dispatch(logoutUser())
    }
  }

// export default NavbarWithRouter;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));