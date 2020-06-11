import React from 'react'
import CourseListItem from './CourseListItem'
import { Route, Switch } from "react-router-dom";
import {connect} from 'react-redux'
import { Grid } from 'semantic-ui-react'

class CourseList extends React.Component{
    render(){
        return(
            <div>
                <h1>Courses</h1>
                <br></br><br></br>
                {/* {this.props.course.name} */}
                {/* <Switch>
                    <Route
                        path="/course-list/:courseId"
                        component={CourseContainer}
                    />
                </Switch> */}
                <div className="course-container">
                    <Grid relaxed columns={4}>
                        {this.props.courses.map(course => {
                            return ( 
                                <Grid.Column>
                                    <CourseListItem key={course.id} course={course}/>
                                </Grid.Column>
                            )
                        })}
                    </Grid>
                </div>
            </div>
        )
    }
}

// {props.paintings.map(painting => (
//     <PaintingListItem
//       key={painting.id}
//       selectPainting={props.selectPainting}
//       painting={painting}

const mapStateToProps = (state) => {
    return {
      courses: state.courses
    };
};

export default connect(mapStateToProps)(CourseList)
// export default CourseList

