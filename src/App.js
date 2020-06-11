import React from 'react';
import './App.css';
import { Route, Switch, withRouter } from "react-router-dom";
import {connect} from 'react-redux'
// import {selectingCourse, creatingNewCourse, removingFromCart, totalRevenue, fetchingCompany, fetchingCourses, fetchingUser, fetchingUserCart, cartTotal, checkingOutCart, gettingProfileFetch, gettingCompanyProfileFetch} from './redux/actions'
import {deletingCourse, creatingNewCourse, removingFromCart, totalRevenue, fetchingCompany, fetchingCourses, fetchingUser, fetchingUserCart, cartTotal, checkingOutCart, gettingProfileFetch, gettingCompanyProfileFetch} from './redux/actions'
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
import LoginForm from "./components/LoginForm"
import CompanyLoginForm from "./components/CompanyLoginForm"
import CompanyProfileContainer from "./companyProfileComponents/CompanyProfileContainer"
import CreateNewCourse from "./companyProfileComponents/CreateNewCourse"
import ViewEditCourse from "./companyProfileComponents/ViewEditCourse"
import Home from "./components/Home"
import RegisterNew from "./components/RegisterNew"

class App extends React.Component{

  componentDidMount(){
    this.props.fetchingCourses()
    // this.props.fetchingUser()

    this.props.gettingProfileFetch()
    this.props.gettingCompanyProfileFetch()

    if(localStorage.token && localStorage.user_or_company === "user"){
      this.props.fetchingUserCart()
    }
    this.props.cartTotal()

    this.props.totalRevenue()

    // this.props.checkingOutCart() // ???
  }
  render(){
  return (
    <div className="app">

      <Navbar />
      <Switch>
        <Route path="/course-list/:courseId" component={Course}/>
        <Route path="/course-list" component={CourseContainer}/>
        <Route path="/profile" component={UserProfileContainer}/>
        <Route path="/company-profile" component={CompanyProfileContainer}/>
        <Route path="/cart" component={CartContainer}/>
        <Route path="/account" component={AccountInformation}/>
        <Route path="/login" component={LoginForm}/>
        <Route path="/company-login" component={CompanyLoginForm}/>
        <Route path="/create-new-course" component={CreateNewCourse}/>
        <Route path="/company/:courseId/view-and-edit-course" component={ViewEditCourse}/>
        <Route path="/register" component={RegisterNew}/>
        <Route path="/sign-up" component={RegisterNew}/>
        <Route path="/" component={Home}/>
      </Switch>

      {/* <Route exact path="/profile" render={() => <ProfileContainer 
          user={this.state.user} 
          applications={this.state.applications}
          deleteAppFromState={this.deleteAppFromState}
          currentJobListings={this.state.currentUserJobListings}
        /> */}

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
    cartTotal: state.cartTotal,
    company: state.company,
    totalRevenue: state.totalRevenue,


  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchingCourses: () => {dispatch( fetchingCourses() )},
    fetchingUser: () => {dispatch( fetchingUser() )},
    fetchingCompany: () => {dispatch( fetchingCompany() )},
    fetchingUserCart: () => {dispatch( fetchingUserCart() )},
    cartTotal: () => {dispatch( cartTotal() )},
    gettingProfileFetch: () => {dispatch(gettingProfileFetch() )},
    gettingCompanyProfileFetch: () => {dispatch(gettingCompanyProfileFetch() )},
    totalRevenue: () => {dispatch(totalRevenue() )},
    // login: () => {dispatch( login() )}
    removingFromCart: () => {dispatch(removingFromCart() )},
    // checkingOutCart: () => {dispatch( checkingOutCart() )} // ???
    creatingNewCourse: () => {dispatch(creatingNewCourse() )},

    // selectingCourse: () => {dispatch(selectingCourse() )}

    deletingCourse: () => {dispatch(deletingCourse() )}
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

// export default withRouter(connect(null, {fetchingCourses: fetchingCourses})(App))

// export default App;