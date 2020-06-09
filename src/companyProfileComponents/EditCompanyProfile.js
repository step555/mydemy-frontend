import React from 'react'
import {Form, Button, ModalDescription} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {editingCompanyInfo} from '../redux/actions'


class EditCompanyProfile extends React.Component {
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
        this.props.editingCompanyInfo(this.state)
    }

    componentDidMount(){
        this.setState({ name: this.props.company.currentCompany.name, email: this.props.company.currentCompany.email })
    }
    render(){
        console.log("EDITING", this.props)
        return(
            <div>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input fluid id="name" label='Full Name' placeholder='Full Name' defaultValue={this.props.company.currentCompany.name} onChange={this.onChangeInformation} required/>
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Input fluid id="email" label='Email' placeholder='Email' defaultValue={this.props.company.currentCompany.email} onChange={this.onChangeInformation} required/>
                    </Form.Group>
                    <Form.Field onClick={() => this.edit(this.props)} control={Button}>Submit</Form.Field>
                </Form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    console.log("mapDispatchToProps")
    return {
      editingCompanyInfo: (info) => {dispatch( editingCompanyInfo(info) )}
    }
}

export default connect(null, mapDispatchToProps)(EditCompanyProfile)