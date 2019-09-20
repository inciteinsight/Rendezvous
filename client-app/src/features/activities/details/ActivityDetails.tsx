import React, { useContext, useEffect } from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import ActivityStore from '../../../app/stores/activityStore'
import { RouteComponentProps } from 'react-router'
import Loading from '../../../app/layout/Loading'
import { Link } from 'react-router-dom'

interface DetailParams {
    activityId: string
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {
    const activityStore = useContext(ActivityStore)
    const {
        activity,
        loadActivity,
        loadingInitial
    } = activityStore

    useEffect(() => {
        loadActivity(match.params.activityId)
    }, [loadActivity, match.params.activityId])

    
    if(loadingInitial || !activity) {
        return <Loading content='Loading Activity...'/>
    }

    const {id, title, startDate, endDate, description, category} = activity!
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
                    <Button.Group widths={2}>
                        <Button basic
                            as={Link} to={`/manage/${id}`}
                            color='blue'
                            content='Edit' />
                        <Button basic
                            color='blue'
                            content='Cancel'
                            onClick={() => history.push('/activities')}/>
                    </Button.Group>
            </Card.Content>
      </Card>
    )
}

export default observer(ActivityDetails)
