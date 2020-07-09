import React from 'react'
import { Button, Form, Segment, Message, Card, Grid, Header, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { Redirect, withRouter, Link } from "react-router-dom";
import { fetchingCompany } from "../redux/actions"
class CompanyLoginForm extends React.Component{
    constructor(){
        super()
        this.state = {
            email: "",
            password: "",
            loggedIn: false
        }
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value });
        console.log(this.state)
    };

    handleLoginSubmit = () => {
        console.log("logging in")
        if(this.state.email === "" || this.state.password === ""){
            alert("email and password fields cannot be blank")
        }else{
            this.setState({loggedIn: !this.state.loggedIn})
            this.props.fetchingCompany(this.state.email, this.state.password)
        }
    }

    render(){

        const redirectToMain = localStorage.token;
        if (redirectToMain || this.state.loggedIn === true) {
            // debugger
            return <Redirect to="/" />
        }
        return(
            <div>
                <Grid textAlign='center' style={{ height: '75vh'}} verticalAlign='middle' className="user-login">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Form
                    size="mini"
                    key="mini"
                    onSubmit={this.handleLoginSubmit}
                    >
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
                    <Message>
                    <Link to="/login"><strong>Click here to log in if you are a user</strong></Link>
                    </Message>
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
        fetchingCompany: (email, password) => {dispatch( fetchingCompany(email, password) )}
    }
}
export default withRouter(connect(null, mapDispatchToProps)(CompanyLoginForm));