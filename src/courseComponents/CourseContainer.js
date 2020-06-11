import React from 'react'
import CourseListItem from './CourseListItem'
import { Route, Switch } from "react-router-dom";
import {connect} from 'react-redux'
import { Grid } from 'semantic-ui-react'

class CourseList extends React.Component{
    render(){
        return(
            <div clasName="course-container-div">
                <div className="courses-top-div">
                    <h1 className="courses-title">Browse Our Courses Here</h1>
                    <div class="wrapper">
                        <input class="search" placeholder="Search" type="text" name="search" onChange={null}></input>
                    </div>
                </div>
                <br></br><br></br>
                {/* {this.props.course.name} */}
                {/* <Switch>
                    <Route
                        path="/course-list/:courseId"
                        component={CourseContainer}
                    />
                </Switch> */}
                {/* searchbar here */}
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

