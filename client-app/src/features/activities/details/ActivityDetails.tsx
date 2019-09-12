import React, { useContext } from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import { observer } from 'mobx-react-lite'
import ActivityStore from '../../../app/stores/activityStore'

interface IProps {
    setSelectedActivity: (activity: IActivity | null) => void
    setEditMode: (editMode: boolean) => void
}

const ActivityDetails: React.FC<IProps>= ({setSelectedActivity, setEditMode}) => {
    const activityStore = useContext(ActivityStore)
    const {selectedActivity: activity} = activityStore
    const {title, startDate, endDate, description, category} = activity!
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

export default observer(ActivityDetails)
