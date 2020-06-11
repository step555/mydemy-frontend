import React from 'react'
import { connect } from "react-redux";
import { Card, Icon, Image, Grid } from 'semantic-ui-react'
import { Link, Route } from "react-router-dom"
import Course from "./Course"

class CourseListItem extends React.Component{
    render(){
        // console.log("Course", this.props.course)
        // debugger
        return(
            // <div className="course-card">
            <div className="course-card-div">
                <Link to={`/course-list/${this.props.course.id}/`} >
                    <Card.Group>
                        <Card className="course-card">
                            <Image classname="course-card-image" src={this.props.course.picture} />
                            <Card.Content>
                                <h3 className="course-card-text">{this.props.course.name}</h3>
                                <h5 className="course-card-text">{this.props.course.company.name}</h5>
                            </Card.Content>
                        </Card>
                    </Card.Group>
                </Link>
            </div>
        )
    }
}

export default CourseListItem

// {/* <div> 
// <Card fluid className="job-card" onClick={() => (props.fetchJob(props.j.id))} >
//     <Link>
//         <Card.Content>
//             <h1>{props.j.company.name}</h1>
//             <h2>{props.j.name}</h2>
//             <h3>Experience Level: {props.j.experience_level}</h3>
//             {/* <h3>Education Required: {props.j.education_level}</h3> */}
//             <h3>${props.j.salary}</h3>
//             {/* <h3>{props.j.details}</h3> */}
//             {/* <h3>Status: {props.j.status}</h3> */}
            
//         </Card.Content>
//             {/* <button onClick={() => (props.fetchJob(props.j.id))}>Click Here For Details</button> */}
//     </Link>
// </Card>
// </div> */}