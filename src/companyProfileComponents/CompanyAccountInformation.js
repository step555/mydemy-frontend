import React from 'react'
import {connect} from 'react-redux'
import CCourse from './CCourse'
import CPurchase from './CPurchase'
import EditCompanyProfile from './EditCompanyProfile'
import {Form, Button, ModalDescription} from 'semantic-ui-react'
import { Link, NavLink, withRouter, Route, Switch } from "react-router-dom";
// import ViewEditCourse from "./ViewEditCourse"

class CompanyAccountInformation extends React.Component{
    constructor(){
        super()
        this.state = {
            clickedEditProfileButton: false
        }
    }

    componentDidMount(){
        this.setState({ clickedEditProfileButton: false})
    }

    handleClick = () => {
        this.setState({ clickedEditProfileButton: !this.state.clickedEditProfileButton})
        console.log(this.state.clickedEditProfileButton)
    }

    render(){
        console.log("CACCOUNTINFO", this.props)

        // let filteredCourses = this.props.courses.filter(course => {
        //     debugger
        //     return course.company_id === this.props.company.currentCompany.id
        // })

        return !this.props.company.currentCompany || this.props.company.currentCompany.courses === undefined ? null : (
            <div>
                <h4>Name</h4>
                    <p className="account-info">{this.props.company.currentCompany.name}</p>
                <h4>Email Address</h4>
                    <p className="account-info">{this.props.company.currentCompany.email}</p>

                <Button onClick={this.handleClick}>Edit Profile Information</Button>
                {this.state.clickedEditProfileButton === true ? 
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
                {/* {this.filteredCourses.map(course => {
                    return (
                            <div>
                                <CCourse course={course}/>
                            </div>
                        )
                    }
                )} */}
                <h4>Total Revenue: ${this.props.totalRevenue.totalRevenue}</h4>
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
    return {
      company: state.company,
      totalRevenue: state.totalRevenue,
    //   courses: state.courses
    };
};

export default connect(mapStateToProps)(CompanyAccountInformation)