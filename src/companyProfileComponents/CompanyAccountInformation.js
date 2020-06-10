import React from 'react'
import {connect} from 'react-redux'
import CCourse from './CCourse'
import CPurchase from './CPurchase'
import EditCompanyProfile from './EditCompanyProfile'
import {Form, Button, ModalDescription} from 'semantic-ui-react'
import { Link, NavLink, withRouter } from "react-router-dom";

class CompanyAccountInformation extends React.Component{
    constructor(){
        super()
        this.state = {
            clickedEditButton: false
        }
    }

    handleClick = () => {
        this.setState({ clickedEditButton: !this.state.clickedEditButton})
        console.log(this.state.clickedEditButton)
    }

    render(){
        console.log("CACCOUNTINFO", this.props)
        return !this.props.company.currentCompany || this.props.company.currentCompany.courses === undefined ? null : (
            <div>
                <h4>Name</h4>
                    <p className="account-info">{this.props.company.currentCompany.name}</p>
                <h4>Email Address</h4>
                    <p className="account-info">{this.props.company.currentCompany.email}</p>

                <Button onClick={this.handleClick}>Edit Profile Information</Button>
                {this.state.clickedEditButton === true ? 
                <div>
                    <EditCompanyProfile company={this.props.company}/>
                </div>
                :
                null
                }
                <br></br><br></br>
                <Button><Link to="/create-new-course">Create new course</Link></Button>


                <h4>Courses owned by your organization</h4>
                {this.props.company.currentCompany.courses.map(course => {
                            return (
                                <div>
                                    <CCourse course={course}/>
                                </div>
                            )
                        }
                )}
                <h4>Total Revenue: ${this.props.totalRevenue}</h4>
                <h4>User Purchases: </h4>
                {this.props.company.currentCompany.purchases.map(purchase => {
                    if(purchase.is_purchased === true){
                        return (
                        <div>
                            <CPurchase purchase={purchase}/>
                        </div>
                        )
                    }
                })}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    // debugger
    return {
      company: state.company,
      totalRevenue: state.totalRevenue
    };
};

export default connect(mapStateToProps)(CompanyAccountInformation)