import React, { Fragment } from 'react'
import { Segment, Header, Comment } from 'semantic-ui-react'

const ActivityDetailedChat = () => {
    const sampleUsers = [
        {
            name: 'AzuResolute'
        },
        {
            name: 'Vixiie'
        }
    ]
    return (
        <Fragment>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{ border: 'none'}}>
                <Header>Chat about this event</Header>
            </Segment>
            {sampleUsers.map(user => (
                <Segment>
                    <Comment.Group>
                        <Comment.Avatar src={`assets/sampleUsers/${user.name}.jpg`}/>
                        <Comment.Content>
                            <Comment.Author as='a'>{user.name}</Comment.Author>
                        </Comment.Content>
                    </Comment.Group>
                </Segment>
            ))}
        </Fragment>
    )
}

export default ActivityDetailedChat
