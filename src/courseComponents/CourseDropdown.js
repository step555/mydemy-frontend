import React from 'react'
import { Grid, Dropdown } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {sortByDuration, sortByPrice, sortByDifficultyLevel, changeSearchText} from '../redux/actions'

const CourseDropdown = (props) => {

    const byDuration = [
        { key: 1, text: '0-3 weeks', value: 1 },
        { key: 2, text: '3-6 weeks', value: 2 },
        { key: 3, text: '6-9 weeks', value: 3 },
        { key: 4, text: '9-12 weeks', value: 4 },
        { key: 5, text: '12-15 weeks', value: 5 }
      ]
      
      const byPrice = [
          { key: 1, text: '$0-30', value: 1 },
          { key: 2, text: '$30-100', value: 2 },
          { key: 3, text: '$100-150', value: 3 },
          { key: 4, text: '$150-200', value: 4 },
      ]
      
      const byDifficultyLevel = [
          { key: 1, text: 'Beginner', value: 1 },
          { key: 2, text: 'Intermediate', value: 2 },
          { key: 3, text: 'Advanced', value: 3 }
      ]

    return (
        <div>
            <Grid>
                <Grid.Column width={4}>
                    <p>Sort by duration</p>
                    <Dropdown
                    clearable 
                    placeholder={"sort by duration"}
                    options={byDuration} selection 
                    // onChange={(event) => props.sortByDuration(event.target.innerText)}
                    onChange={(event) => props.changeSearchText(event.target.innerText)}
                    // value={props.value}       
                    />
                </Grid.Column>
                <Grid.Column width={4}>
                    <p>Sort by price</p>
                    <Dropdown
                    clearable 
                    placeholder={"sort by price"}
                    options={byPrice} selection 
                    // onChange={(event) => props.sortByPrice(event.target.innerText)}
                    onChange={(event) => props.sortByPrice(event.target.innerText)}
                    />
                </Grid.Column>
                <Grid.Column width={4}>
                    <p>Sort by difficulty level</p>
                    <Dropdown
                    clearable 
                    placeholder={"Sort by difficulty level"}
                    options={byDifficultyLevel} selection 
                    // onChange={(event) => props.sortByDifficultyLevel(event.target.innerText)}
                    onChange={(event) => props.changeSearchText(event.target.innerText)}
                    />
                </Grid.Column>
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
    //   courses: state.courses
        // sortedByDuration: state.sortedByDuration,
        // sortedByPrice: state.sortedByPrice,
        // sortedByDifficultyLevel: state.sortedByDifficultyLevel,
        value: state.searchText
    };
};

const mapDispatchToProps = dispatch => {
    return {
    //   sortByDuration: (info) => {dispatch(sortByDuration(info))},
      sortByPrice: (info) => {dispatch(sortByPrice(info))},
    //   sortByDifficultyLevel: (info) => {dispatch(sortByDifficultyLevel(info))},
      changeSearchText: (searchText) => {dispatch(changeSearchText(searchText))}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CourseDropdown)