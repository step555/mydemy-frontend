// import React from 'react'
// import { Button, Form, Segment, Message, Card, Grid, Header, Image } from "semantic-ui-react";
// import { connect } from "react-redux";
// import { withRouter, Link, Redirect } from "react-router-dom";
// // import { loggingIn } from "../redux/actions"
// import { fetchingUser } from "../redux/actions"
// // import {fetchingCourses, fetchingUser, fetchingUserCart, cartTotal, checkingOutCart} from './redux/actions'
// import VideoInput from '../views/VideoInput';

// class LoginForm extends React.Component{
//     constructor(){
//         super()
//         this.state = {
//             email: "",
//             password: "",
//             loggedIn: false,
//             toggleCam: false,
//             // match: []
//         }
//     }

//     handleChange = (e, { name, value }) => {
//         this.setState({ [name]: value });
//         console.log(this.state)
//     };

//     // componentDidMount(){
//     //     this.props.fetchingUser()
//     //     this.props.fetchingUserCart()
//     // }

//     handleLoginSubmit = () => {
//         console.log("logging in")
//         // this.props.loggingIn(this.state.email, this.state.password)
//         this.props.fetchingUser(this.state.email, this.state.password)
//     }

//     toggleCamera = () => {
//         this.setState({toggleCam: !this.state.toggleCam})
//     }

//     fMatch = (face) => {
//         this.setState({match: face})
//     }

//     render(){

//         const redirectToMain = localStorage.token;
//         if (redirectToMain) {
//             return <Redirect to="/" />
//         }
//         return(
//             <div>
//                 <Grid textAlign='center' style={{ height: '75vh'}} verticalAlign='middle' className="user-login">
//                 <Grid.Column style={{ maxWidth: 450 }}>
//                     <Form
//                     size="mini"
//                     key="mini"
//                     onSubmit={this.handleLoginSubmit}
//                     >
//                     {/* <Form.Group widths="equal"> */}
//                     <Segment stacked>
//                     <Form.Input
//                         label="email"
//                         placeholder="email"
//                         name="email"
//                         onChange={this.handleChange}
//                         value={this.state.email}
//                     />
//                     <Form.Input
//                         type="password"
//                         label="password"
//                         placeholder="password"
//                         name="password"
//                         onChange={this.handleChange}
//                         value={this.state.password}
//                     />
//                     <Button type="submit">Login</Button>
//                     </Segment>
//                     </Form>
//                     <Button onClick={this.toggleCamera}>Toggle Camera</Button>
//                     {this.state.toggleCam ? 
//                         <VideoInput fMatch={this.fMatch}/>
//                         : 
//                     null}
//                     <Link to="/company-login">Click here to log in here if you are an institution of learning</Link>
//                     {/* <Link to="/login">Log in</Link> */}
//                     {localStorage.user_or_company === "user" || localStorage.user_or_company === "company" ? null
//                     : 
//                     <Message>
//                     <Link to="/sign-up">Don't have an account? Sign up here</Link>
//                     </Message>
//                     }
//                 </Grid.Column>
//                 </Grid>
//             </div>
//         )
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     // debugger
//     console.log("mapDispatchToProps")
//     return {
//         // loggingIn: (email, password) => {dispatch( loggingIn(email, password) )}
//         fetchingUser: (email, password) => {dispatch( fetchingUser(email, password) )}
//     }
// }
// export default withRouter(connect(null, mapDispatchToProps)(LoginForm));

// // export default LoginForm

import React from 'react'
import { Button, Form, Segment, Message, Card, Grid, Header, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter, Link, Redirect } from "react-router-dom";
// import { loggingIn } from "../redux/actions"
import { fetchingUser } from "../redux/actions"
// import {fetchingCourses, fetchingUser, fetchingUserCart, cartTotal, checkingOutCart} from './redux/actions'
import VideoInput from '../views/VideoInput';

class LoginForm extends React.Component{
    constructor(){
        super()
        this.state = {
            email: "",
            password: "",
            loggedIn: false,
            toggleCam: false,
            face: [],
            openedCam: false
        }
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value });
        console.log(this.state)
    };

    // componentDidMount(){
    //     this.props.fetchingUser()
    //     this.props.fetchingUserCart()
    // }

    handleLoginSubmit = () => {
        console.log("logging in")
        // this.props.loggingIn(this.state.email, this.state.password)
        this.props.fetchingUser(this.state.email, this.state.password, this.state.face)
    }

    toggleCamera = () => {
        this.setState({toggleCam: !this.state.toggleCam})
    }

    fMatch = (descriptors) => {
        // debugger
        this.setState({face: descriptors})
    }

    render(){

        const redirectToMain = localStorage.token;
        if (redirectToMain) {
            return <Redirect to="/" />
        }
        return(
            <div>
                <Grid textAlign='center' style={{ height: '75vh'}} verticalAlign='middle' className="user-login">
                <Grid.Column style={{ maxWidth: 450 }}>
                    {this.state.toggleCam === false ? 
                        <Form
                        size="mini"
                        key="mini"
                        onSubmit={this.toggleCamera}
                        >
                        {/* <Form.Group widths="equal"> */}
                        <Segment stacked>
                        <Form.Input
                            label="email"
                            placeholder="email"
                            name="email"
                            onChange={this.handleChange}
                            value={this.state.email}
                        />
                        <Form.Input
                            type="password"
                            label="password"
                            placeholder="password"
                            name="password"
                            onChange={this.handleChange}
                            value={this.state.password}
                        />
                    <Button type="submit">Move on to facial recognition</Button>
                    {/* <Button type="submit">Login</Button> */}
                    </Segment>
                    </Form>
                        :
                            <div>
                                <Form onSubmit={this.handleLoginSubmit}>
                                    <VideoInput fMatch={this.fMatch} email={this.state.email}/> 
                                    <br></br>
                                    <Button onClick={this.toggleCamera}>Back to username and password</Button>
                                    <Button type="submit">Login</Button>
                                </Form>
                            </div>
                        }
                    <Link to="/company-login">Click here to log in here if you are an institution of learning</Link>
                    {/* <Link to="/login">Log in</Link> */}
                    {localStorage.user_or_company === "user" || localStorage.user_or_company === "company" ? null
                    : 
                    <Message>
                    <Link to="/sign-up">Don't have an account? Sign up here</Link>
                    </Message>
                    }
                </Grid.Column>
                </Grid>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {

    console.log("mapDispatchToProps")
    return {
        // loggingIn: (email, password) => {dispatch( loggingIn(email, password) )}
        fetchingUser: (email, password, face) => {dispatch( fetchingUser(email, password, face) )}
    }
}
export default withRouter(connect(null, mapDispatchToProps)(LoginForm));

// export default LoginForm