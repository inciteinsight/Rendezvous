import React from 'react'
import { Header, Container, Segment, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <Segment inverted textAlign='center' vertical className='home'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}} />
                    Rendezvous
                </Header>
                <Header as='h2' inverted content='Welcome to Rendezvous' />
                <Header as='h4' inverted>By Roger Lester Palabasan</Header>
                <Button as={Link} to='/login' size='huge' inverted>
                    Login
                </Button>
            </Container>
        </Segment>
    )
}

export default HomePage
