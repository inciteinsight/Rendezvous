import React from 'react'
import { Header, Icon, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <Container style={{marginTop: '4em'}}>
            <Header as='h2'>
                <Icon name='users' />
                <Header.Content>React ASP Net Boilerplate</Header.Content>
            </Header>
            <h3>By Roger Lester Palabasan</h3>
            <h4>Go to <Link to='/activities'>Activities</Link></h4>
        </Container>
    )
}

export default HomePage