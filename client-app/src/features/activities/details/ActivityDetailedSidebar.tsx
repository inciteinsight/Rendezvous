import React, { Fragment } from 'react'
import { Segment, List, Item, Label, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const ActivityDetailedSidebar = () => {
    return (
        <Fragment>
            <Segment secondary
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{ border: 'none'}}>
                2 people going
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    <Item style={{ position: 'relative'}}>
                        <Label
                            style={{position: 'absolute'}}
                            ribbon='right'
                            color='orange'>
                            Host
                        </Label>
                        <Image size='tiny' src={'/assets/user.png'}/>
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as='h3'>
                                <Link to={'#'}>Jan Czarina</Link>
                            </Item.Header>
                        </Item.Content>
                    </Item>

                    <Item style={{ position: 'relative'}}>
                        <Image size='tiny' src={`/assets/sampleUsers/AzuResolute.jpg`}/>
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as='h3'>
                                <Link to={'#'}>AzuResolute</Link>
                            </Item.Header>
                            <Item.Extra style={{color: 'orange'}}>Being Followed</Item.Extra>
                        </Item.Content>
                    </Item>
                    <Item style={{ position: 'relative'}}>
                        <Image size='tiny' src={`/assets/sampleUsers/Vixiie.jpg`}/>
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as='h3'>
                                <Link to={'#'}>Vixiie</Link>
                            </Item.Header>
                            <Item.Extra style={{color: 'orange'}}>Following</Item.Extra>
                        </Item.Content>
                    </Item>
                </List>
            </Segment>
        </Fragment>
    )
}

export default ActivityDetailedSidebar
