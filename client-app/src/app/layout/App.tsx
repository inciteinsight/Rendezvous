import React, { useState, useEffect, Fragment, SyntheticEvent, useContext } from 'react';
import { Header, Icon, Container } from 'semantic-ui-react'
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import Loading from './Loading';
import ActivityStore from '../stores/activityStore';
import {observer} from 'mobx-react-lite';

const App = () => {

  const activityStore = useContext(ActivityStore)

  const [activities, setActivities] = useState<IActivity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [target, setTarget] = useState('')

  const handleEditActivity = async (activity: IActivity) => {
    setSubmitting(true)
    await agent.Activities.update(activity)
    setActivities([...activities.filter(act => act.id !== activity.id), activity])
    setSelectedActivity(activity)
    await setEditMode(false)
    setSubmitting(false)
  }

  const handleDeleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true)
    setTarget(event.currentTarget.name)
    await agent.Activities.delete(id)
    setActivities([...activities.filter(act => act.id !== id)])
    setSubmitting(false)
  }

  useEffect(() => {
    activityStore.loadActivities()
  }, [activityStore])

  if(activityStore.loadingInitial) {
    return <Loading content='Loading Activities...' />
  }

  return (
    <Fragment>
      <NavBar/>
      <Container style={{marginTop: '5em'}}>
        <Header as='h2'>
          <Icon name='users' />
          <Header.Content>React ASP Net Boilerplate</Header.Content>
        </Header>

        <h3>By Roger Lester Palabasan</h3>
        <ActivityDashboard
          setSelectedActivity={setSelectedActivity}
          setEditMode={setEditMode}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  )
}

export default observer(App);
