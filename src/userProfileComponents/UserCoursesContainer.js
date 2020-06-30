import React from 'react'
import EnlargedCourseCard from './EnlargedCourseCard'
import PurchasedCourse from './PurchasedCourse'
import {Grid, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const UserCoursesContainer = (props) => {
    console.log(props.user.currentUser)
    return !props.user.currentUser || props.user.currentUser.courses === undefined ? null : (
        <div>
            <br></br><br></br>
                <Grid>
                    <Grid.Column width={null}>

                    </Grid.Column>
                    <div classname="return-to-profile-button">
                        <Grid.Column width={2}>
                            <br></br><br></br>
                                <Link to="/profile"><Button>View Profile Information</Button></Link>
                        </Grid.Column>
                    </div>
                    <Grid.Column width={5}>
                        <div className="account-purchases-div">
                            <h3 className="h3-course">Courses</h3>
                            {props.user.currentUser.courses.map(course => {
                                for(let i = 0; i < props.user.currentUser.purchases.length; i++){
                                    if(course.id === props.user.currentUser.purchases[i].course_id && props.user.currentUser.purchases[i].is_purchased === true){
                                        return (
                                            <div>
                                                <PurchasedCourse course={course}/>
                                            </div>
                                        )
                                    }}
                                }
                            )}
                            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                        </div>
                    </Grid.Column>
                {props.enlargedCourse.name !== undefined ? 
                    <Grid.Column width={5}>
                        <div className="enlarged-course-card-div">
                            <EnlargedCourseCard />
                        </div>
                    </Grid.Column>
                    : 
                    <div>
                        <h2>Hover over a course card to see more information</h2>
                    </div>
                    }
                </Grid>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    enlargedCourse: state.enlargedCourse,
    user: state.user,
    // userCourses: state.userCourses
})

export default connect(mapStateToProps, null)(UserCoursesContainer)