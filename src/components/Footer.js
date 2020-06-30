import React from "react"
import { Segment, Container, Grid, List, Header} from "semantic-ui-react"
import {Link} from 'react-router-dom'

class Footer extends React.Component {

    render() {
        return (
        <div className="footer">
            <Segment inverted vertical style={{ padding: '1em 0em' }}>
                <Container>
                    <Grid divided inverted stackable>
                    <Grid.Row>
                        <Grid.Column width={5}>
                        <Header inverted as='h4' content='About' />
                        <List link inverted>
                            <List.Item as='a'>Sitemap</List.Item>
                            <List.Item as='a'>Contact Us</List.Item>
                            <Link to="about"><List.Item as='a'>About Us</List.Item></Link>
                        </List>
                        </Grid.Column>
                        <Grid.Column width={5}>
                        <Header inverted as='h4' content='Services' />
                        <List link inverted>
                            <List.Item as='a'>Leave a Review</List.Item>
                            <List.Item as='a'>Our Products</List.Item>
                            <List.Item as='a'>Find a Career with Us</List.Item>
                        </List>
                        </Grid.Column>
                        <Grid.Column width={5}>
                        <Header as='h4' inverted>
                            MYDEMY
                        </Header>
                        <p>
                            COPYRIGHT 2020 
                        </p>
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        </div>
        )
    }
}

export default Footer;