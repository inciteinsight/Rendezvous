import React, { Fragment } from 'react'
import { Segment, Header, Comment, Form, Button } from 'semantic-ui-react'

const ActivityDetailedChat = () => {
    const sampleUsers = [
        {
            name: 'AzuResolute',
            text: 'I look forward to attending your event!'
        },
        {
            name: 'Vixiie',
            text: 'Can\'t wait!'
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
            <Segment>
                <Comment.Group>
                {sampleUsers.map(user => (
                    <Comment>
                        <Comment.Avatar src={`/assets/sampleUsers/${user.name}.jpg`}/>
                        <Comment.Content>
                            <Comment.Author as='a'>{user.name}</Comment.Author>
                            <Comment.Metadata>
                                <div>Today at 12:50PM</div>
                            </Comment.Metadata>
                            <Comment.Text>{user.text}</Comment.Text>
                            <Comment.Actions>
                                <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                    </Comment>
                ))}
                <Form reply>
                    <Form.TextArea />
                    <Button primary
                        content='Add Reply'
                        labelPosition='left'
                        icon='edit' />
                </Form>
                </Comment.Group>
            </Segment>
        </Fragment>
    )
}

export default ActivityDetailedChat
