import React from 'react'
import {Button, Grid} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const Home = (props) => {
    return(
        <div>
            <br></br><br></br>
            <div className="home-div">
                <div className="top-learning-div">
                    <img className="top-learning-image" src="../../../images/Online-education-laptop.jpg"></img>
                    <div className="inside-top-learning-image">
                        <br></br><br></br>
                        <h1 className="inside-top-learning-image-h1">Access thousands of online courses today!</h1>
                        <Link to="/course-list" className="inside-top-learning-image-h1"><Button>Browse Courses</Button></Link>
                        <Link to="/about"><Button>Learn More</Button></Link>
                    </div>
                </div>
            <br></br><br></br><br></br><br></br>
            <div className="what-you-can-do-div">
                <Grid>
                    <Grid.Column width={4}>
                        <h4>Expert Instruction</h4>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <h4>Further Your Education</h4>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <h4>Learn New Skills</h4>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <h4>Earn Certificates</h4>
                    </Grid.Column>
                </Grid>
            </div>
                <br></br><br></br>
            <div>
                <h2 style={{textAlign: "center"}}>Trusted by employers all over the world</h2>
                <img src="../../../images/company-logos.png" alt="companies" id="companies"></img>
                <br></br><br></br><br></br><br></br><br></br><br></br>
                </div>
            </div>
            <br></br><br></br><br></br>
        </div>
    )
}

export default Home