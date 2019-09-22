import React from 'react'
import { Item, Button, Segment, Icon } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import { IActivity } from '../../../app/models/activity'
import {format} from 'date-fns'

const ActivityListItem: React.FC<{activity: IActivity}> = ({activity}) => {
    const { id, title, startDate, description, city, venue, category} = activity
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                    <Item.Image size='small' src={`/assets/categoryImages/${category}.jpg`} />
                        <Item.Content>
                            <Item.Header as='a'>{title}</Item.Header>
                            <Item.Description>
                                Hosted by Jan Czarina
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <Icon name='hourglass start' /> {format(startDate,'h:mm a')}
                {/* <Icon name='hourglass end' /> {endDate} */}
                <Icon name='marker' /> {venue}, {city}
                <Icon name='users' /> {category}
            </Segment>
            <Segment secondary>
                Attendees will go here
            </Segment>
            <Segment clearing>
                <span>{description}</span>
                <Button
                    as={Link} to={`/activities/${id}`} 
                    floated='right'
                    content='View'
                    color='blue' />
            </Segment>
        </Segment.Group>
    )
}

export default observer(ActivityListItem)
