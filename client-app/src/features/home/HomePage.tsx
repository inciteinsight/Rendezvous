import React, { useContext, Fragment } from 'react'
import { Header, Container, Segment, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { RootStoreContext } from '../../app/stores/rootStore'
import LoginForm from '../user/LoginForm'
import RegisterForm from '../user/RegisterForm'

const HomePage = () => {
    const rootStore = useContext(RootStoreContext)
    const {isLoggedIn, user} = rootStore.userStore
    const {openModal} = rootStore.modalStore
    return (
        <Segment inverted textAlign='center' vertical className='home'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}} />
                    Rendezvous
                </Header>
                {isLoggedIn && user ? 
                    <Fragment>
                        <Header as='h2' inverted content={`Welcome to Rendezvous, ${user.displayName}`} />
                        <Button as={Link} to='/activities' size='huge' inverted>
                            Go To Activities
                        </Button>
                    </Fragment> :
                    <Fragment>
                        <Header as='h2' inverted content='Welcome to Rendezvous' />
                        <Button onClick={() => openModal(<LoginForm />)} size='huge' inverted>
                            Login
                        </Button>
                        <Button onClick={() => openModal(<RegisterForm />)} size='huge' inverted>
                            Register
                        </Button>
                    </Fragment>
                }
                <Header as='h4' inverted>By Roger Lester Palabasan</Header>
            </Container>
        </Segment>
    )
}

export default HomePage
