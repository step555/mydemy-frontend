import React from 'react'
import {connect} from 'react-redux'
import CCourse from './CCourse'

class CompanyAccountInformation extends React.Component{

    render(){
        console.log(this.props)
        return !this.props.company.currentCompany || this.props.company.currentCompany.courses === undefined ? null : (
            <div>
                <h4>Name</h4>
                    <p className="account-info">{this.props.company.currentCompany.name}</p>
                <h4>Email Address</h4>
                    <p className="account-info">{this.props.company.currentCompany.email}</p>
                <h4>Courses owned by your organization</h4>
                {this.props.company.currentCompany.courses.map(course => {
                    for(let i = 0; i < this.props.company.currentCompany.courses.length; i++){
                            return (
                                <div>
                                    <CCourse course={course}/>
                                </div>
                            )
                        }}
                )}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    // debugger
    return {
      company: state.company
    };
};

export default connect(mapStateToProps)(CompanyAccountInformation)