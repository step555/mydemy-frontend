import React from 'react'
import CourseListItem from './CourseListItem'
import { Route, Switch } from "react-router-dom";
import {connect} from 'react-redux'
import { Grid, Dropdown } from 'semantic-ui-react'
import {inputtingSearch} from '../redux/actions'
import Searchbar from './Searchbar'
import CourseDropdown from './CourseDropdown'

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
        console.log("sorted courses", this.props.courses)
        // const byDuration = [
        //     { key: 1, text: '0-3 weeks', value: 1 },
        //     { key: 2, text: '3-6 weeks', value: 2 },
        //     { key: 3, text: '6-9 weeks', value: 3 },
        //     { key: 4, text: '9-12 weeks', value: 4 },
        //     { key: 5, text: '12-15 weeks', value: 5 }
        //   ]
          
        //   const byPrice = [
        //       { key: 1, text: '$0-30', value: 1 },
        //       { key: 2, text: '$30-100', value: 2 },
        //       { key: 3, text: '$100-150', value: 3 },
        //       { key: 4, text: '$150-200', value: 4 },
        //   ]
          
        //   const byDifficultyLevel = [
        //       { key: 1, text: 'Beginner', value: 1 },
        //       { key: 2, text: 'Intermediate', value: 2 },
        //       { key: 3, text: 'Advanced', value: 3 }
        //   ]

        return(
            <div clasName="course-container-div">
                <div className="courses-top-div">
                        {/* <Grid.Column> */}
                            <Searchbar />
                            {/* <h1 className="courses-title">Browse Our Courses Here</h1>
                            <div class="wrapper">
                                <input class="search" placeholder="Search" type="text" name="search" onChange={(event) => this.handleChange(event)}></input>
                            </div> */}
                        {/* </Grid.Column> */}
                        {/* <Grid.Column>

                        </Grid.Column> */}
                    <div className="course-dropdown-container-div">
                        {/* <Grid>
                            <Grid.Column width={4}>
                                <p>Sort by duration</p>
                                <Dropdown
                                clearable 
                                placeholder={"sort by duration"}
                                options={byDuration} selection 
                                onChange={null} />
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <p>Sort by price</p>
                                <Dropdown
                                clearable 
                                placeholder={"sort by price"}
                                options={byPrice} selection 
                                onChange={null} />
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <p>Sort by difficulty level</p>
                                <Dropdown
                                clearable 
                                placeholder={"Sort by difficulty level"}
                                options={byDifficultyLevel} selection 
                                onChange={null} />
                            </Grid.Column>
                        </Grid> */}
                        {/* <Grid>
                            <Grid.Column> */}
                                <CourseDropdown />
                            {/* </Grid.Column>
                        </Grid> */}
                        <div>
                            <p>back</p>
                            <p>forward</p>
                        </div>
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
    console.log("the state you need to manipulate", state)
    return {
    //   courses: state.courses
    courses: state.courses.filter(
        c => {
            // debugger
        return (
          c.name.toLowerCase().includes(state.searchText.toLowerCase()) ||
          c.subject.toLowerCase().includes(state.searchText.toLowerCase()) ||
          c.company.name.toLowerCase().includes(state.searchText.toLowerCase()) ||
          c.duration.toLowerCase().includes(state.searchText.toLowerCase()) ||
        //   c.price.toLowerCase().replace("$", "").includes(state.searchText.toLowerCase()) ||
          c.difficulty_level.toLowerCase().includes(state.searchText.toLowerCase())
        )
          }  )
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

