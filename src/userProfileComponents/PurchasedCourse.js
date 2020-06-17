import React from 'react'
import {connect} from 'react-redux'
import {Card, Grid} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {selectingCourseLessons} from '../redux/actions'
import LessonDashboard from '../lessonComponents/LessonDashboard'

class PurchasedCourse extends React.Component {
    constructor(){
        super()
        this.state = {
            clickedCourse: false
        }
    }
    
    handleClick = () => {
        this.setState({clickedCourse: !this.state.clickedCourse})
        // this.props.selectingCourseLessons(this.props.course.id)
    }

    handleClickLink = () => {
        this.props.selectingCourseLessons(this.props.course.id)
    }
    render(){
        // console.log("purchased course props", props)

        return(
            <div>
                {/* <Grid>
                    <Grid.Column width={15}> */}
                        <div>
                            <Card>
                                <div className="user-course-div" onClick={this.handleClick}>
                                    <h5 className="course-card-text">{this.props.course.name}</h5>
                                    <p className="course-card-text">{this.props.course.subject}</p>
                                    <p className="course-card-text">{this.props.course.duration}</p>
                                    <Link to={`/course/${this.props.course.id}/lessons`}><button onClick={this.handleClickLink}>Begin your lessons</button></Link>
                                </div>
                            </Card>
                            <br></br>
                        </div>
                    {/* </Grid.Column>
                    <Grid.Column width={15}> */}
                        <div>
                            {this.state.clickedCourse ? 
                            <LessonDashboard course={this.props.course}/>
                            : null}
                        </div>
                    {/* </Grid.Column>
                </Grid> */}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    console.log("mapDispatchToProps")
    return {
        selectingCourseLessons: (info) => {dispatch( selectingCourseLessons(info) )}
    }
}

export default connect(null, mapDispatchToProps)(PurchasedCourse)