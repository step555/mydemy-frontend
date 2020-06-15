import React from 'react'
import {connect} from 'react-redux'

class CreateNewLessonContainer extends React.Component{
    
    render(){
        return (
            <div>
                <h1>Lesson Container</h1>
            </div>
        )
    }
}

// const mapStateToProps = (state) => {
//     return {
//       company: state.company,
//       totalRevenue: state.totalRevenue,
//       courses: state.courses,
//     //   purchases: state.purchases // does not currently exist in store
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//       creatingNewCourse: (info) => {dispatch( creatingNewCourse(info) )}
//     }
// }

export default connect(null, null)(CreateNewLessonContainer)