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
            // <div className="gray-field">
            //     <div className="white-field">
                    <div className="company-account-information-div">
                        <CompanyAccountInformation />
                        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                    </div>
            //     </div>
            // </div>
        )
    }
}

export default CompanyProfileContainer