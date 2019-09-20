import React from 'react'
import { Item, Button, Label } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import { IActivity } from '../../../app/models/activity'

const ActivityListItem: React.FC<{activity: IActivity}> = ({activity}) => {
    const { title, startDate, endDate, description, city, venue, category} = activity
    return (
        <Item>
        <Item.Image size='tiny' src={`/assets/categoryImages/${category}.jpg`} />
            <Item.Content>
                <Item.Header as='a'>{title}</Item.Header>
                <Item.Meta>{startDate}</Item.Meta>
                <Item.Meta>{endDate}</Item.Meta>
                <Item.Description>
                    <div>{description}</div>
                    <div>{city}, {venue}</div>
                </Item.Description>
                <Item.Extra>
                    <Button
                        as={Link} to={`/activities/${activity.id}`} 
                        floated='right'
                        content='View'
                        color='blue' />
                    <Label basic content={category}></Label>
                </Item.Extra>
            </Item.Content>
        </Item>
    )
}

export default observer(ActivityListItem)
