import React from 'react'
import {Form, Button, ModalDescription, Grid} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {editingUserInfo} from '../redux/actions'


class EditUserProfile extends React.Component {
    constructor(){
        super()
        this.state = {
            name: "",
            email: ""
        }
    }

    // page refreshes upon submit?

    onChangeInformation = (event) => {
        console.log("event", event.target.value)
        this.setState( { [event.target.id]: event.target.value } )
    }

    edit = () => {
        if(this.state.name === "" || this.state.email === ""){
            alert("You cannot leave a field blank")
            return null
        }
        this.props.back()
        this.props.editingUserInfo(this.state)
    }

    componentDidMount(){
        this.setState({ name: this.props.user.currentUser.name, email: this.props.user.currentUser.email })
    }
    render(){
        console.log("EDITING", this.props)
        return(
            <div className="edit-account-info-div">
                <br></br>
                <Grid style={{ height: '75vh'}} className="user-login">
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input fluid id="name" label='Full Name' placeholder='Full Name' defaultValue={this.props.user.currentUser.name} onChange={this.onChangeInformation} required/>
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Input fluid id="email" label='Email' placeholder='Email' defaultValue={this.props.user.currentUser.email} onChange={this.onChangeInformation} required/>
                            </Form.Group>
                            <div className="edit-account-info-buttons">
                                <Grid>
                                    <Grid.Column width={8}>
                                        <Form.Field onClick={() => this.edit(this.props)} control={Button}>Submit</Form.Field>
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        <Button onClick={this.props.back}>Back</Button>
                                    </Grid.Column>  
                                </Grid>  
                            </div>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    console.log("mapDispatchToProps")
    return {
      editingUserInfo: (info) => {dispatch( editingUserInfo(info) )}
    }
}

export default connect(null, mapDispatchToProps)(EditUserProfile)