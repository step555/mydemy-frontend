import React from 'react';
import { connect } from "react-redux";
import { Card, Icon, Image, Grid } from 'semantic-ui-react'
import { Link, Route } from "react-router-dom"

const CourseListItem = (props) => {
    return (
        <div className="course-card-div">
            <Link to={`/course-list/${props.course.id}/`} >
                <Card.Group>
                    <Card className="course-card">
                        <div className="course-card-image-div">
                            <Image classname="course-card-image" src={props.course.picture} />
                        </div>
                        <Card.Content>
                            <h3 className="course-card-text course-card-info">{props.course.name}</h3>
                            <h5 className="course-card-text course-card-info">{props.course.subject}</h5>
                            <h5 className="course-card-text course-card-info-last">{props.course.company.name}</h5>
                        </Card.Content>
                    </Card>
                </Card.Group>
            </Link>
        </div>
    )
}

export default CourseListItem