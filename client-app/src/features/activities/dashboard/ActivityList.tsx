import React, { SyntheticEvent, useContext } from 'react'
import { Item, Button, Label, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import { observer } from 'mobx-react-lite'
import ActivityStore from '../../../app/stores/activityStore'

interface IProps {
    deleteActivity: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void
    submitting: boolean
    target: string
}

const ActivityList: React.FC<IProps> = ({
    deleteActivity,
    submitting,
    target
}) => {

    const activityStore = useContext(ActivityStore)
    const {activitiesByStartDate, selectActivity} = activityStore;
    return (
        <Segment clearing>
            <Item.Group divided>
                {activitiesByStartDate.map(activity => {
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
                                    <Button
                                        name={activity.id}
                                        loading={target === activity.id && submitting}
                                        floated='right'
                                        content='Delete'
                                        color='red'
                                        onClick={(evt) => deleteActivity(evt, id)}
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

export default observer(ActivityList)
