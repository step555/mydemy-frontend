import React from 'react'
import {connect} from 'react-redux'
import {fetchingAllUsers} from '../redux/actions'

class CPurchase extends React.Component{

    componentDidMount(){
        this.props.fetchingAllUsers()
    }
    render(){
        this.props.courses.filter(c => {
            if(c.id === this.props.purchase.course_id){
                this.props.purchase.course = c
            }
        })
        this.props.users.filter(u => {
            if(u.id === this.props.purchase.user_id){
            this.props.purchase.user = u
            }
        })
        return(
            <div>
                {this.props.purchase.course === undefined || this.props.purchase.user === undefined ? null : 
                    <div>
                        {this.props.purchase.is_purchased === true ? 
                        <div>
                            <h5 className="account-info">Purchase ID: {this.props.purchase.id}</h5>
                            <p className="account-info">Course Name: {this.props.purchase.course.name}</p>
                            <p className="account-info">User Name: {this.props.purchase.user.name}</p>
                            <p className="account-info">User Email: {this.props.purchase.user.email}</p>
                            <br></br>
                        </div>
                        : null
                        }
                    </div>
                }
                </div>
            )
        }
    }
const mapStateToProps = (state) => {
    return {
      courses: state.courses,
      users: state.allUsers
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      fetchingAllUsers: () => {dispatch( fetchingAllUsers() )},

    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(CPurchase)