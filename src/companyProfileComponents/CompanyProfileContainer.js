import React from 'react'
import CompanyAccountInformation from './CompanyAccountInformation'

class CompanyProfileContainer extends React.Component{
    // constructor(){
    //     super()
    //     this.state = {

    //     }
    // }
    render(){
        return(
            <div className="gray-field">
                <div className="white-field">
                    <div>
                        <CompanyAccountInformation />
                    </div>
                </div>
            </div>
        )
    }
}

export default CompanyProfileContainer