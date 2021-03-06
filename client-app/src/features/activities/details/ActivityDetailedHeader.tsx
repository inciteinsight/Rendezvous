import React from 'react'
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import {format} from 'date-fns'

const activityImageStyle = {
    filter: 'brightness(30%)'
}

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
}

const ActivityDetailedHeader: React.FC<{activity: IActivity}> = ({activity}) => {
    const {id, title, startDate, category} = activity!
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: 0}}>
                <Image src={`/assets/categoryImages/${category}.jpg`} fluid style={activityImageStyle}/>
                <Segment basic style={activityImageTextStyle}>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={title}
                                    style={{ color: 'white' }} />
                                <p>{format(startDate,'eeee MMMM do yyyy')}</p>
                                <p>
                                    Hosted by <strong>Jan Czarina</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Join Activity</Button>
                <Button>Cancel Attendance</Button>
                <Button
                    as={Link} to={`/manage/${id}`}
                    color='orange'
                    floated='right'> Manage Event
                    </Button>
            </Segment>
        </Segment.Group>
    )
}

export default observer(ActivityDetailedHeader)
