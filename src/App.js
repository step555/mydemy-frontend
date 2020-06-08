import React from 'react';
import './App.css';
import { Route, Switch, withRouter } from "react-router-dom";
import {connect} from 'react-redux'
import {fetchingCourses, fetchingUser, fetchingUserCart, cartTotal, checkingOutCart} from './redux/actions'
// import {fetchingUser} from './redux/actions'
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Login from './components/Login';
// import About from './components/About';
import CourseContainer from "./courseComponents/CourseContainer";
import Course from "./courseComponents/Course";
import UserProfileContainer from "./userProfileComponents/UserProfileContainer";
import CartContainer from "./cartComponents/CartContainer"
import AccountInformation from "./userProfileComponents/AccountInformation"
import Dashboard from "./userProfileComponents/Dashboard"
import LoginForm from "./components/LoginForm"

class App extends React.Component{

  componentDidMount(){
    this.props.fetchingCourses()
    this.props.fetchingUser()
    this.props.fetchingUserCart()
    this.props.cartTotal()
    // this.props.checkingOutCart() // ???
  }
  render(){
  return (
    <div className="app">

      <Navbar />
      <h1>MyDemy</h1>
      <Switch>
        <Route path="/course-list/:courseId" component={Course}/>
        <Route path="/course-list" component={CourseContainer}/>
        <Route path="/profile" component={UserProfileContainer}/>
        <Route path="/cart" component={CartContainer}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/account" component={AccountInformation}/>
        <Route path="/login" component={LoginForm}/>
      </Switch>

    </div>
    )
  }
}

const mapStateToProps = (state) => {
  // debugger
  return {
    courses: state.courses,
    user: state.user,
    cart: state.cart,
    cartTotal: state.cartTotal
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchingCourses: () => {dispatch( fetchingCourses() )},
    fetchingUser: () => {dispatch( fetchingUser() )},
    fetchingUserCart: () => {dispatch( fetchingUserCart() )},
    cartTotal: () => {dispatch( cartTotal() )},

    // login: () => {dispatch( login() )}
    
    // checkingOutCart: () => {dispatch( checkingOutCart() )} // ???
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

// export default withRouter(connect(null, {fetchingCourses: fetchingCourses})(App))

// export default App;