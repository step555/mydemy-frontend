import React from 'react'
import {connect} from 'react-redux'
import CCourse from './CCourse'
import CPurchase from './CPurchase'
import EditCompanyProfile from './EditCompanyProfile'
import {Button, Grid} from 'semantic-ui-react'
import { Link } from "react-router-dom";
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
        // console.log("CACCOUNTINFO", this.props)

        // let filteredCourses = this.props.courses.filter(course => {
        //     // debugger
        //     return course.company_id === this.props.company.currentCompany.id
        // })

        return !this.props.company.currentCompany || this.props.company.currentCompany.courses === undefined ? null : (
            <div className="company-account-info-div">
                <h1>Profile</h1>
                <Grid>
                    <Grid.Column width={5}>
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
                        <Link to="/create-new-course"><Button>Create new course</Button></Link>
                    </Grid.Column>

                    <Grid.Column width={5}>
                        <h4>Courses owned by your organization</h4>
                        {this.props.company.currentCompany.courses.map(course => {
                                    return (
                                        <div>
                                            <CCourse course={course}/>
                                        </div>
                                    )
                                }
                        )}
                    </Grid.Column>
                        {/* {this.filteredCourses.map(course => {
                            return (
                                    <div>
                                        <CCourse course={course}/>
                                    </div>
                                )
                            }
                        )} */}
                    <Grid.Column width={6}>
                        <div className="company-account-info-purchases-div">
                        <h4>Total Revenue: ${this.props.totalRevenue.totalRevenue}</h4>
                        <h4>User Purchases: </h4>
                        {this.props.company.currentCompany.purchases.map(purchase => {
                            // this.props.courses.map(course => {
                                // if(course.id === purchase.id && purchase.is_purchased === true){
                                //         let cPurchase = purchase
                                //         debugger
                                    return (
                                        <div>
                                            <CPurchase purchase={purchase}/>
                                            {/* <CPurchase course={course}/> */}
                                        </div>
                                    )
                                // }
                            // })
                        })}
                        </div>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      company: state.company,
      totalRevenue: state.totalRevenue,
      courses: state.courses,
    //   purchases: state.purchases // does not currently exist in store
    };
};

export default connect(mapStateToProps)(CompanyAccountInformation)