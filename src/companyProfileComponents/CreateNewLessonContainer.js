import React from 'react'
import {connect} from 'react-redux'
import {Form, TextArea, Button} from 'semantic-ui-react'
import NewLesson from './NewLesson'

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
        for(let i = 0; i < this.state.lessonsArray.length; i++){
            if( this.state.lessonsArray[i][2].length > 0 && !this.state.lessonsArray[i][2].includes('youtube.com/embed') ){ // https://www.youtube.com/embed/nghuHvKLhJA
                alert("Please use a valid youtube embed")
            }else if( this.state.lessonsArray[i][0].length === 0 || this.state.lessonsArray[i][1].length === 0 ){
                alert("All required lesson fields must be filled in")
            }else{
                let newNumLessons = [...this.state.numberOfLessons, 1]
                this.setState({numberOfLessons: newNumLessons})
            }
        }
    }

    decreaseNumLessons = (index, individualLessonArray) => {
        let updated
        let newNumLessons = this.state.numberOfLessons.pop()
        this.setState({newNumLessons: newNumLessons})
        for(let i = 0; i < this.state.lessonsArray.length; i++){
            if(index === i){
                this.setState({ lessonsArray: this.state.lessonsArray.splice(i, 1) })
            }
        }
    }

    deletedLastLesson = () => {
        let updatedLArr = this.state.lessonsArray
        let updatedNumArr = this.state.numberOfLessons
        
        if(this.state.numberOfLessons.length > this.state.lessonsArray.length){
            updatedNumArr.pop()
            this.setState({numberOfLessons: updatedNumArr})
        }else if(this.state.numberOfLessons.length === this.state.lessonsArray.length){
            updatedLArr.pop()
            updatedNumArr.pop()
            this.setState({
                lessonsArray: updatedLArr,
                numberOfLessons: updatedNumArr
            })
        }
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
                                <NewLesson numberOfLessons={this.state.numberOfLessons} decreaseNumLessons={this.decreaseNumLessons} index={index} parentOnChangeLessonInformation={this.parentOnChangeLessonInformation} addToNumLessons={this.addToNumLessons} />
                            </div>
                        )
                    })}
                    <br></br>
                    {this.state.numberOfLessons.length > 1 ? 
                    <Button onClick={this.deletedLastLesson}>Delete</Button>
                    : null
                    }
                </div>
                : null 
                }
            </div>
        )
    }
}

export default connect(null, null)(CreateNewLessonContainer)