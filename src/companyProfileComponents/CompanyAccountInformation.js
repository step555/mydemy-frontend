import React from 'react'
import {connect} from 'react-redux'
import CCourse from './CCourse'
import CPurchase from './CPurchase'

class CompanyAccountInformation extends React.Component{

    render(){
        console.log("CACCOUNTINFO", this.props)
        return !this.props.company.currentCompany || this.props.company.currentCompany.courses === undefined ? null : (
            <div>
                <h4>Name</h4>
                    <p className="account-info">{this.props.company.currentCompany.name}</p>
                <h4>Email Address</h4>
                    <p className="account-info">{this.props.company.currentCompany.email}</p>
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