import React from 'react'
import { Item, Button, Label, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'

interface IProps {
    activities: IActivity[]
    selectActivity: (id: string) => void
}

const ActivityList: React.FC<IProps> = ({activities, selectActivity}) => {
    return (
        <Segment clearing>
            <Item.Group divided>
                {activities.map(activity => {
                    const {id, title, startDate, endDate, description, city, venue, category} = activity
                    return (
                        <Item key={id}>
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
                                        floated='right'
                                        content='View'
                                        color='blue'
                                        onClick={() => selectActivity(id)}
                                    />
                                    <Label basic content={category}></Label>
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                        )
                    }
                )}
            </Item.Group>
        </Segment>
    )
}

export default ActivityList
