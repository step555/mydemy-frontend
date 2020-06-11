import React from 'react'
import {Radio, Grid, Form, Header, Input, Segment, Image, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import { connect } from "react-redux";
import {creatingNewUser, creatingNewCompany} from '../redux/actions'

class RegisterNew extends React.Component{
    constructor(){
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            user_or_company: null
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
        if(this.state.user_or_company === "user"){
            this.props.creatingNewUser(this.state)
        }else if(this.state.user_or_company === "company"){
            this.props.creatingNewCompany(this.state)
        }
    }

    render(){
        return(
            <div className="user-signup"> 
                <Grid textAlign='center' style={{ height: '93vh'}} verticalAlign='middle' >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Form onSubmit={this.handleSubmit}>
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
                                // onChange={this.handleRadioChange}
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
                        {/* <Link to ={"/profile"}> */}
                        <Button type="submit">Register</Button>
                        {/* </Link> */}
                        </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
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