import React from 'react'
import {connect} from 'react-redux'
import PurchasedCourse from './PurchasedCourse'

class AccountInformation extends React.Component{
    // constructor(){
    //     super()
    //     this.state = {
    //         purchasedCourseArr: []
    //     }
    // }
    // componentDidMount(){
    //     console.log("got here", this)
    // }

    render(){
        console.log("account information", this.props)
        return !this.props.user || this.props.user.courses === undefined ? null : (
            <div>
                <h1>Account information</h1>
                <h4>Name</h4> 
                    <p className="account-info">{this.props.user.name}</p>
                <h4>Email Address</h4>
                    <p className="account-info">{this.props.user.email}</p>
                <h4>Courses</h4>
                 {this.props.user.courses.map(course => {
                    for(let i = 0; i < this.props.user.purchases.length; i++){
                        if(course.id === this.props.user.purchases[i].course_id && this.props.user.purchases[i].is_purchased === false){
                            return (
                                <div>
                                    <PurchasedCourse course={course}/>
                                </div>
                            )
                        }}
                    }
                )}
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => ({
    user: state.user,
    // userCourses: state.userCourses
})

export default connect(mapStateToProps)(AccountInformation)

// export default AccountInformation

// {this.props.user.courses.forEach(course => {
//     const t = this
//     for(let i = 0; i < this.props.user.purchases.length; i++){
//         if(course.id === this.props.user.purchases[i].course_id && this.props.user.purchases[i].is_purchased === false)
//              debugger
//              console.log("is_purchased is false", this.props.user.purchases[i])
//              console.log("is_purchased is false", course)
//              debugger
//              return (
//                  <div>
//                      <PurchasedCourse course={course}/>
//                  </div>
//              )
//              return (
//                  <div>
//                     <p>AAASDFASDASDASFAF</p>
//                     <p>{course.name}</p>
//                  </div>
//              )
//          }
//      }
//  })}