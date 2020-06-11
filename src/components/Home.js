import React from 'react'
import {Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const Home = (props) => {
    return(
        <div>
            <h1>Home</h1>
            <div>
                <h1>Access thousands of online courses today!</h1>
                <Link to="/course-list"><Button>Browse Courses</Button></Link>
            </div>
            <br></br>
            <h2>Expert Instruction</h2>
            <h2>Further Your Education</h2>
            <h2>Learn New Skills</h2>
            <h2>Earn Certificates by Completing Courses</h2>

            <br></br><br></br><br></br><br></br><br></br><br></br>
            <div>
                <h2>Popular Subjects</h2>
            </div>
        </div>
    )
}

export default Home