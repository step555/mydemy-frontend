import React from 'react'
import {connect} from 'react-redux'
import {Form, TextArea, Button} from 'semantic-ui-react'
import NewLesson from './NewLesson'
// import {} from '../redux/actions'

class CreateNewLessonContainer extends React.Component{
    constructor(){
        super()
        this.state = {
            numberOfLessons: [1],
            lessonsArray: [],
            updatedLessonArray: []
        }
    }

    componentDidUpdate(){
        this.props.addLessonsArrayToCourseState(this.state.lessonsArray)
    }

    parentOnChangeLessonInformation = (lesson) => {
        // debugger
        let updatedLessonsArray = [...this.state.lessonsArray]
        updatedLessonsArray.length = this.state.numberOfLessons.length
        for(let i = 0; i < this.state.numberOfLessons.length; i++){
            if(lesson.index === i){
                updatedLessonsArray[i] = [lesson.lessonName, lesson.lessonText, lesson.video]
                if(updatedLessonsArray[i].lessonName !== "" && updatedLessonsArray[i].lessonText !== ""){
                    this.state.lessonsArray[i] = updatedLessonsArray[i]
                    this.setState({
                        lessonsArray: [...this.state.lessonsArray],
                        updatedLessonsArray: [updatedLessonsArray[i]]
                    })
                }
            }
        }
    }
   
    addToNumLessons = () => {
        let newNumLessons = [...this.state.numberOfLessons, 1]
        this.setState({numberOfLessons: newNumLessons})
    }

    decreaseNumLessons = (index, individualLessonArray) => {
        let updated
        // let updated = this.state.lessonsArray
        let newNumLessons = this.state.numberOfLessons.pop()
        this.setState({numNumLessons: newNumLessons})
        for(let i = 0; i < this.state.lessonsArray.length; i++){
            if(index === i){
                // updated = this.state.lessonsArray.splice(i, 1) // only returns what you wanted to delete
                // debugger
                // this.state.lessonsArray
                // updated = this.state.lessonsArray.filter(element => {
                //     const t = this
                //     // debugger
                //     return element[0] !== individualLessonArray[0]
                // })
                // this.setState({ lessonsArray: this.state.lessonsArray.splice(i, 1) })

                delete this.state.lessonsArray[i]
                // debugger
                updated = this.state.lessonsArray.filter(item => item)
                console.log("works here?", updated) // this is still deleting the below lesson...
                this.setState({lessonsArray: updated},() => console.log(this.state.lessonsArray))
            }
        }
        // debugger
        // this.setState({lessonsArray: [...updated]},() => console.log("updated", this.state.lessonsArray))
    }

    render(){
        return (
            <div>
                {this.props.finishedCourseInfo === true ?
                <div>
                    <h1>Create Your Lessons Here</h1>
                    {this.state.numberOfLessons.map((input, index) => {
                        return (
                            <div>
                                <NewLesson decreaseNumLessons={this.decreaseNumLessons} index={index} parentOnChangeLessonInformation={this.parentOnChangeLessonInformation} addToNumLessons={this.addToNumLessons} />
                            </div>
                        )
                    })}
                    <br></br>
                    {/* <Button onClick={this.addNextLesson}>Add more lessons</Button> */}
                </div>
                : null 
                }
            </div>
        )
    }
}

// const mapStateToProps = (state) => {
//     return {

//     };
// };

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

export default connect(null, mapDispatchToProps)(CreateNewLessonContainer)