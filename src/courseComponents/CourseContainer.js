import React from 'react'
import CourseListItem from './CourseListItem'
import { Route, Switch } from "react-router-dom";
import {connect} from 'react-redux'
import { Grid } from 'semantic-ui-react'
import {inputtingSearch} from '../redux/actions'
import Searchbar from './Searchbar'

class CourseList extends React.Component{
    constructor(){
        super()
        this.state = {
            courses: ""
        }
    }

    componentDidMount(){
        console.log("mounted", this.props)
    }

    handleChange = (event) => {
        console.log(event.target.value)
    }

    render(){
        console.log("render", this.props)
        return(
            <div clasName="course-container-div">
                <div className="courses-top-div">
                    <Searchbar />
                    {/* <h1 className="courses-title">Browse Our Courses Here</h1>
                    <div class="wrapper">
                        <input class="search" placeholder="Search" type="text" name="search" onChange={(event) => this.handleChange(event)}></input>
                    </div> */}
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
    //   courses: state.courses
    courses: state.courses.filter(
        c => 
          c.name.toLowerCase().includes(state.searchText.toLowerCase()) ||
          c.subject.toLowerCase().includes(state.searchText.toLowerCase()) ||
          c.company.name.toLowerCase().includes(state.searchText.toLowerCase())
        )
    };
};

// const mapDispatchToProps = (dispatch) => {
//     console.log("mapDispatchToProps")
    
//     return {
//       inputtingSearch: (info) => {dispatch( inputtingSearch(info) )}
//     }
// }

export default connect(mapStateToProps, null)(CourseList)

// export default connect(mapStateToProps, mapDispatchToProps)(CourseList)

// export default CourseList

