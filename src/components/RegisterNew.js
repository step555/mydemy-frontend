import React from 'react'
import {Radio, Grid, Form, Header, Input, Segment, Image, Button} from 'semantic-ui-react'
import {Link, Redirect} from 'react-router-dom'
import { connect } from "react-redux";
import {creatingNewUser, creatingNewCompany} from '../redux/actions'
import NewUserVideoInput from '../views/NewUserVideoInput';

class RegisterNew extends React.Component{
    constructor(){
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            user_or_company: null,
            clickedNext: false,
            descriptors: []
        }
    }

    componentWillMount(){
        this.setState({
            name: "",
            email: "",
            password: "",
            user_or_company: null
        })
    }

    signUp = (event) => {
        console.log(event.target.id)
        this.setState({ [event.target.id]: event.target.value })
    }

    isUser = () => {
        this.setState({user_or_company: "user"})
    }

    isCompany = () => {
        this.setState({user_or_company: "organization"})
    }

    handleSubmit = () => {
        if(this.state.name === "" || this.state.email === "" || this.state.password === ""){
            alert("Invalid entry. Please enter a valid email, name, and password")
        }else if(this.state.descriptors === "" && this.state.user_or_company === "user"){
            alert("It appears you have not give our system enough time to analyze your face. Please try again")
        }else{
            if(this.state.user_or_company === "user"){
                this.props.creatingNewUser(this.state)
            }else if(this.state.user_or_company === "organization"){
                this.props.creatingNewCompany(this.state)
            }
        }
    }

    getDescriptors = (descriptors) => {
        this.setState({descriptors: descriptors})
    }

    next = () => {
        this.setState({ clickedNext: !this.state.clickedNext })
    }

    render(){
        const redirectToMain = localStorage.token;
        if (redirectToMain) {
            return <Redirect to="/" />
        }
        return(
            <div className="user-signup"> 
                <Grid textAlign='center' style={{ height: '93vh'}} verticalAlign='middle' >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Form onSubmit={this.next}>
                        <Segment stacked>
                        <Form.Field
                        control={Input}
                        label='Full Name'
                        placeholder='Full Name'
                        id="name"
                        onChange={this.signUp}
                        />
                        <Form.Field
                        control={Input}
                        label='Email'
                        placeholder='Email'
                        id="email"
                        onChange={this.signUp}
                        />
                        <Form.Field
                        control={Input}
                        label='Password'
                        placeholder='Password'
                        id="password"
                        onChange={this.signUp}
                        />

                        <Form.Field>
                            <Form.Field>
                                Selected value: <b>{this.state.user_or_company}</b>
                            </Form.Field>
                            <Radio
                                label='User'
                                name='radioGroup'
                                value='user'
                                checked={this.state.user_or_company === 'user'}
                                onClick={this.isUser}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Radio
                                label='Organization'
                                name='radioGroup'
                                value='organization'
                                checked={this.state.user_or_company === 'organization'}
                                onClick={this.isCompany}
                            />
                        </Form.Field>
                        {this.state.user_or_company === 'user' ? 
                            <Button type="submit">Image Capture</Button>
                        : null}
                            {this.state.clickedNext ? 
                                <div>
                                    <Form onSubmit={this.handleSubmit}>
                                        <h2>Analyzing... please wait until you see the blue box around your face before continuing</h2>
                                        <NewUserVideoInput getDescriptors={this.getDescriptors} />
                                        <br></br>
                                        <Button type="submit">Register</Button>
                                    </Form>
                                </div>
                            : null}
                        </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      creatingNewUser: (info) => {dispatch( creatingNewUser(info) )},
      creatingNewCompany: (info) => {dispatch( creatingNewCompany(info) )}
    }
}


export default connect(null, mapDispatchToProps)(RegisterNew)