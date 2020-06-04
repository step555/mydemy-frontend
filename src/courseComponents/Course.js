import React from 'react'
import { connect } from "react-redux";

class Course extends React.Component{
    // constructor(){
    //     super()
    //     this.state = {
    //         institution: ""
    //     }
    // }

    // componentDidMount(){

    // }

    render(){
        console.log(this.props.course)

        return !this.props.course ? null : (
            <div>
                <h1>{this.props.course.name}</h1>
                {/* cart picture? */}
                <h5>Add to cart </h5> 
                <br></br>
                <br></br>
                <h2>About this course</h2>
                    <p>{this.props.course.text_preview}</p>
                    <img src={this.props.course.picture} alt="picture"/>
        <br></br>
                <h5>Institution: {this.props.course.company.name}</h5>
                <h5>Subject: {this.props.course.subject}</h5>
                <h5>Price: ${this.props.course.price}</h5>
                <h5>Duration: {this.props.course.duration}</h5>
                <h5>Difficulty level: {this.props.course.difficulty_level}</h5>
                <h5>Content covered in this course:</h5>
                <ul>
                    {this.props.course.content_covered.map(content => {
                        return <li>{content}</li>
                    })}
                </ul>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => ({
    course: state.courses.find(c => {
        // debugger
        return c.id === parseInt(ownProps.match.params.courseId)})
})

export default connect(mapStateToProps)(Course)

// export default Course