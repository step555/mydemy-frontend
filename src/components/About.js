import React from 'react'

const About = (props) => {
    return (
        // <div className="myDiv">
        <div className="about-page">
            <div className="about-text">
                <br/>
            <h3>Our Mission</h3>
                <p>Bringing knowledge to everybody with a desire to learn</p>
            {/* <h3>Our Values</h3>
                <p>People matter: value and respect each other</p>
                <p></p>
                <p>Integrity: always do the right thing</p> */}
            <h3>About Us</h3>
            <div className="about-us-text-container"></div>
            {/* <p>BassyJobs is one of the world’s largest job and recruiting sites.</p>
            <p>Built on the foundation of increasing workplace transparency, BassyJobs offers millions of the latest job listings, combined with a growing database of company reviews, CEO approval ratings, salary reports, interview reviews and questions, benefits reviews, office photos and more. Unlike other job sites, all of this information is shared by those who know a company best — the employees. In turn, job seekers on BassyJobs are well-researched and more informed about the jobs and companies they apply to and consider joining. This is why thousands of employers across all industries and sizes turn to BassyJobs to help them recruit and hire quality candidates at scale who stay longer. BassyJobs is available anywhere via its mobile apps.</p>        
            <p>BassyJobs operates as a part of Recruit Holdings’ growing HR Technology business segment. BassyJobs is headquartered in Washington, DC and was founded by Sebastian Dornel and Uzoma Ariguzo</p> */}
            <a href="https://google.com" id="about-blog">Check Out Our Blog Here</a>
            <br></br>
            <h3>Learn More and Follow Us Here</h3>
            <div className="learn-parts">
                <a href="https://twitter.com">
                    <img src="../images/twitter.png" alt="twitter" id="twitter-icon" className="about-icon"></img>
                </a>
                <a href="https://instagram.com">
                    <img src="../images/instagram.png" alt="instagram" id="instagram-icon" className="about-icon"></img>
                </a>
                <a href="https://facebook.com">
                    <img src="../images/facebook.png" alt="facebook" id="facebook-icon" className="about-icon"></img>
                </a>
                <a href="https://linkedin.com">
                    <img src="../images/linkedin.png" alt="linkedin" id="linkedin-icon" className="about-icon"></img>
                </a>
            </div>
            </div>
        </div>
        )
}

export default About