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
                                <CourseDropdown />
                        <div>
                            {/* <p>back</p>
                            <p>forward</p> */}
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
    // const priceRangeArr = state.searchText.replace("$", "").replace("$", "").split("-")
    // let priceRangeArrToInteger = [parseInt(priceRangeArr[0]), parseInt(priceRangeArr[1])]
    // let sortedValue = priceRangeArrToInteger.filter(c => {
    //     return c >= priceRangeArrToInteger[0] && c <= priceRangeArrToInteger[1]
    // })

    // debugger
    if(state.dropdownPrice[1] > 0){
        return {
            courses: state.courses.filter(
                c => {
                    return (
                        c.price >= state.dropdownPrice[0] && c.price <= state.dropdownPrice[1]
                    )
                }
            )
        }
    }else{
    return {
    courses: state.courses.filter(
        c => {
        return (
            c.name.toLowerCase().includes(state.searchText.toLowerCase()) ||
            c.subject.toLowerCase().includes(state.searchText.toLowerCase()) ||
            c.company.name.toLowerCase().includes(state.searchText.toLowerCase()) ||
            c.duration.toLowerCase().includes(state.searchText.toLowerCase()) ||
            c.difficulty_level.toLowerCase().includes(state.searchText.toLowerCase())

        )})
    }};
};
// state.courses.filter(c => c.price >= state.dropdownPrice[0] && c.price <= state.dropdownPrice[1])

//   c.price.toLowerCase().replace("$", "").includes(state.searchText.toLowerCase()) ||
//   const priceRangeArr = value.replace("$", "").replace("$", "").split("-")
//   let priceRangeArrToInteger = [parseInt(priceRangeArr[0]), parseInt(priceRangeArr[1])]
//   let sortedValue = priceRangeArrToInteger.filter(c => {
//       return c >= priceRangeArrToInteger[0] && c <= priceRangeArrToInteger[1]
//   })
// )

// const mapDispatchToProps = (dispatch) => {
//     console.log("mapDispatchToProps")
    
//     return {
//       inputtingSearch: (info) => {dispatch( inputtingSearch(info) )}
//     }
// }

export default connect(mapStateToProps, null)(CourseList)

// export default connect(mapStateToProps, mapDispatchToProps)(CourseList)

// export default CourseList

