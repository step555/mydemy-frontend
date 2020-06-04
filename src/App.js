import React from 'react';
import './App.css';
import { Route, Switch, withRouter } from "react-router-dom";
import {connect} from 'react-redux'
import {fetchingCourses, fetchingUser} from './redux/actions'
// import {fetchingUser} from './redux/actions'
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Login from './components/Login';
// import About from './components/About';
import CourseContainer from "./courseComponents/CourseContainer";
import Course from "./courseComponents/Course";
import UserProfileContainer from "./userProfileComponents/UserProfileContainer";
import Cart from "./components/Cart"

class App extends React.Component{

  componentDidMount(){
    this.props.fetchingCourses()
    this.props.fetchingUser()

    // fetch('http://localhost:3000/courses')
    // .then(resp => resp.json())
    // .then(data => {
    //   debugger
    // })
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
        <Route path="/cart" component={Cart}/>
      </Switch>

    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    courses: state.courses,
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchingCourses: () => {dispatch( fetchingCourses() )},
    fetchingUser: () => {dispatch( fetchingUser() )}
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

// export default withRouter(connect(null, {fetchingCourses: fetchingCourses})(App))

// export default App;