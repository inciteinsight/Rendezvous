import React from 'react'
import { Item, Button, Label, Segment, Icon } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import { IActivity } from '../../../app/models/activity'

const ActivityListItem: React.FC<{activity: IActivity}> = ({activity}) => {
    const { title, startDate, endDate, description, city, venue, category} = activity
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                    <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as='a'>{title}</Item.Header>
                            <Item.Description>
                                Hosted by EJ
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <Icon name='hourglass start' /> {activity.startDate}
                <Icon name='hourglass end' /> {activity.endDate}
                <Icon name='marker' /> {activity.venue}, {activity.city}
            </Segment>
            <Segment secondary>
                Attendees will go here
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button
                    as={Link} to={`/activities/${activity.id}`} 
                    floated='right'
                    content='View'
                    color='blue' />
            </Segment>
        </Segment.Group>
    )
}

export default observer(ActivityListItem)
