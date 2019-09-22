import React from 'react'
import { Segment, Grid, Icon } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import {format} from 'date-fns'

const ActivityDetailedInfo: React.FC<{activity: IActivity}> = ({activity}) => {
    const {startDate, description, venue, city} = activity!
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{description}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='calendar'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <span>{format(startDate, 'eeee MMMM do yyyy')} at {format(startDate, 'h:mm a')}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='marker'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <span>{venue}, {city}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
}

export default ActivityDetailedInfo
