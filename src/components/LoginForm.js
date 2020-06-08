import React from 'react'
import { Button, Form, Segment, Message, Card, Grid, Header, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
// import { loggingIn } from "../redux/actions"
import { fetchingUser } from "../redux/actions"
// import {fetchingCourses, fetchingUser, fetchingUserCart, cartTotal, checkingOutCart} from './redux/actions'
class LoginForm extends React.Component{
    constructor(){
        super()
        this.state = {
            email: "",
            password: ""
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
        this.props.fetchingUser(this.state.email, this.state.password)
    }

    render(){
        return(
            <div>
                <Form
                size="mini"
                key="mini"
                onSubmit={this.handleLoginSubmit}
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
                <Button type="submit">Login</Button>
                </Segment>
                </Form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    // debugger
    console.log("mapDispatchToProps")
    return {
        // loggingIn: (email, password) => {dispatch( loggingIn(email, password) )}
        fetchingUser: (email, password) => {dispatch( fetchingUser(email, password) )}
    }
}
export default withRouter(connect(null, mapDispatchToProps)(LoginForm));

// export default LoginForm