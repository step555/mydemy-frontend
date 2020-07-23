import React from 'react';
import { connect } from "react-redux";
import { Card, Icon, Image, Grid } from 'semantic-ui-react'
import { Link, Route } from "react-router-dom"

const CourseListItem = () => {
    return (
        <div className="course-card-div">
            <Link to={`/course-list/${this.props.course.id}/`} >
                <Card.Group>
                    <Card className="course-card">
                        <div className="course-card-image-div">
                            <Image classname="course-card-image" src={this.props.course.picture} />
                        </div>
                        <Card.Content>
                            <h3 className="course-card-text course-card-info">{this.props.course.name}</h3>
                            <h5 className="course-card-text course-card-info">{this.props.course.subject}</h5>
                            <h5 className="course-card-text course-card-info-last">{this.props.course.company.name}</h5>
                        </Card.Content>
                    </Card>
                </Card.Group>
            </Link>
        </div>
    )
}

export default CourseListItem