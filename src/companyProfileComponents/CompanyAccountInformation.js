import React from 'react'
import {connect} from 'react-redux'
import CCourse from './CCourse'
import CPurchase from './CPurchase'
import EditCompanyProfile from './EditCompanyProfile'
import {Button, Grid} from 'semantic-ui-react'
import { Link } from "react-router-dom";
import {totalRevenue} from '../redux/actions'

class CompanyAccountInformation extends React.Component{
    constructor(){
        super()
        this.state = {
            clickedEditProfileButton: false
        }
    }

    componentDidMount(){
        this.setState({ clickedEditProfileButton: false})
        this.props.totalR()
    }

    handleClick = () => {
        this.setState({ clickedEditProfileButton: !this.state.clickedEditProfileButton})
        console.log(this.state.clickedEditProfileButton)
    }

    render(){
        return !this.props.company.currentCompany || this.props.company.currentCompany.courses === undefined ? null : (
            <div className="company-account-info-div">
                <br></br>
                <h1>Company Information</h1>
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
                    <Grid.Column width={6}>
                        <div className="company-account-info-purchases-div">
                        <h4>Total Revenue: ${this.props.totalRevenue.totalRevenue}</h4>
                        <h4>User Purchases: </h4>
                        {this.props.company.currentCompany.purchases.map(purchase => {
                                    return (
                                        <div>
                                            <CPurchase purchase={purchase}/>
                                        </div>
                                    )
                        })}
                        </div>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state.company.currentCompany)
    return {
      company: state.company,
      totalRevenue: state.totalRevenue,
      courses: state.courses,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        totalR: (info) => {dispatch( totalRevenue(info) )}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyAccountInformation)