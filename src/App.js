import React from 'react';
import './App.css';
import { Route, Switch, withRouter } from "react-router-dom";
import {connect} from 'react-redux'
import {fetchingCourses, gettingProfileFetch, gettingCompanyProfileFetch} from './redux/actions'
import Navbar from "./components/Navbar";
import CourseContainer from "./courseComponents/CourseContainer";
import Course from "./courseComponents/Course";
import UserProfileContainer from "./userProfileComponents/UserProfileContainer";
import CartContainer from "./cartComponents/CartContainer"
import AccountInformation from "./userProfileComponents/AccountInformation"
import LoginForm from "./components/LoginForm"
import CompanyLoginForm from "./components/CompanyLoginForm"
import CompanyProfileContainer from "./companyProfileComponents/CompanyProfileContainer"
import CreateNewCourse from "./companyProfileComponents/CreateNewCourse"
import EditCourse from "./companyProfileComponents/EditCourse"
import Home from "./components/Home"
import RegisterNew from "./components/RegisterNew"
import CheckoutForm from "./cartComponents/CheckoutForm"
import LessonDashboard from "./lessonComponents/LessonDashboard"
// import Lesson from './lessonComponents/Lesson'
import LessonContainer from './lessonComponents/LessonContainer'
import About from './components/About'
import Footer from './components/Footer'
import UserCoursesContainer from './userProfileComponents/UserCoursesContainer'

class App extends React.Component{

  componentDidMount(){
    this.props.fetchingCourses()
    this.props.gettingProfileFetch()
    this.props.gettingCompanyProfileFetch()
    // if(localStorage.token && localStorage.user_or_company === "user"){
      // debugger
      // this.props.fetchingUserCart()
    // }
    // this.props.fetchingUser()
    // this.props.totalRevenue()
    // this.props.cartTotal()
    // this.props.checkingOutCart() // ???
  }
  render(){
    return (
      <div className="App">
        <div style={{ margin: "auto", width: 400 }}>
        <Navbar />
        <Footer />
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
          <Route path="/company/:courseId/edit" component={EditCourse}/>

          <Route path="/register" component={RegisterNew}/>
          <Route path="/sign-up" component={RegisterNew}/>
          <Route path="/checkout" component={CheckoutForm}/>
          <Route path="/course/:courseId/lessons" component={LessonDashboard}/>

          <Route path="/course/:courseId/lessons/:lessonId" component={LessonContainer}/>
          <Route path="/about" component={About}/>
          <Route path="/user-courses" component={UserCoursesContainer}/>
          <Route path="/" component={Home}/>
        </Switch>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchingCourses: () => {dispatch( fetchingCourses() )},
    gettingProfileFetch: () => {dispatch(gettingProfileFetch() )},
    gettingCompanyProfileFetch: () => {dispatch(gettingCompanyProfileFetch() )},
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
// export default (App);

// import React from 'react';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <div style={{width: 400}}>
//       <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
//       </div>
//     </div>
//   );
// }

// export default App;
