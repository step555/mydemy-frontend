import React from 'react'
import {connect} from 'react-redux'
import {Card, Grid} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {selectingCourseLessons, openingEnlargedCourse, closeEnlargedCourse} from '../redux/actions'
import LessonDashboard from '../lessonComponents/LessonDashboard'

class PurchasedCourse extends React.Component {
    constructor(){
        super()
        this.state = {
            hoveredOnCourse: false,
            // hovered: false
        }
    }

    componentDidMount(){
        this.setState({clickedCourse: false})
    }
    
    handleHoverTrue = () => {
        this.setState({hoveredOnCourse: true})
        // this.props.selectingCourseLessons(this.props.course.id)
        // call something in redux actions.js to fetch and send a payload to reducer.js
        this.props.openingEnlargedCourse(this.props.course)
        // get that state inside a different component
    }

    handleHoverFalse = () => {
        // this.setState({hoveredOnCourse: false})
        // this.props.closeEnlargedCourse()
    }

    handleClickLink = () => {
        this.props.selectingCourseLessons(this.props.course.id)
    }

    render(){
        return(
            <div>
                {/* <Grid>
                    <Grid.Column width={15}> */}
                        <div>
                            {/* <Link to={`/course/${this.props.course.id}/lessons`}> */}
                                <Card>
                                    {/* <div className="user-course-div" onClick={this.handleClickLink}> */}
                                    <div>
                                    <div className="user-course-div" onMouseOver={this.handleHoverTrue} onMouseLeave={this.handleHoverFalse}>
                                        <h5 className="course-card-text">{this.props.course.name}</h5>
                                        <p className="course-card-text">{this.props.course.subject}</p>
                                        <p className="course-card-text">{this.props.course.duration}</p>
                                        <div className="centered-link">
                                            <Link to={`/course/${this.props.course.id}/lessons`}><button onClick={this.handleClickLink}>Start Learning</button></Link>
                                        </div>
                                    </div>
                                </div>
                                </Card>
                            {/* </Link> */}
                            <br></br>
                        </div>
                        {/* </div> */}
                        {/* {this.state.hoveredOnCourse ? 
                        <div classname="enlarged-course-card">
                            <div>
                                <h5 className="enlarged-course-card-text">{this.props.course.name}</h5>
                                <p className="enlarged-course-card-text">{this.props.course.subject}</p>
                                <p className="enlarged-course-card-text">{this.props.course.duration}</p>
                            </div>
                        </div>
                        : null} */}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    console.log("mapDispatchToProps")
    return {
        selectingCourseLessons: (info) => {dispatch( selectingCourseLessons(info) )},
        openingEnlargedCourse: (info) => {dispatch( openingEnlargedCourse(info) )},
        closeEnlargedCourse: (info) => {dispatch( closeEnlargedCourse(info) )}
    }
}

export default connect(null, mapDispatchToProps)(PurchasedCourse)