import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'

interface IProps {
    activity: IActivity
    setSelectedActivity: (activity: IActivity | null) => void
    setEditMode: (editMode: boolean) => void
}

const ActivityDetails: React.FC<IProps>= ({activity, setSelectedActivity, setEditMode}) => {
    const {title, startDate, endDate, description, category} = activity
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{title}</Card.Header>
                <Card.Meta>
                    <span>{startDate}</span>
                    <span>{endDate}</span>
                </Card.Meta>
                <Card.Description>
                    {description}
                </Card.Description>
                </Card.Content>
                <Card.Content extra>
                <a>
                    <Button.Group widths={2}>
                        <Button basic color='blue' content='Edit' onClick={() => setEditMode(true)}/>
                        <Button basic
                            color='blue'
                            content='Cancel'
                            onClick={() => setSelectedActivity(null)}/>
                    </Button.Group>
                </a>
            </Card.Content>
      </Card>
    )
}

export default ActivityDetails
