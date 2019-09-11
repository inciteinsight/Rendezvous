import React, { useState, useEffect, Fragment } from 'react';
import { Header, Icon, Container } from 'semantic-ui-react'
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';

const App = () => {

  const [activities, setActivities] = useState<IActivity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null)
  const [editMode, setEditMode] = useState(false)
  
  const handleOpenCreateForm = () => {
    setSelectedActivity(null)
    setEditMode(true)
  }

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(activity => activity.id === id)[0])
    setEditMode(false)
  }

  const handleCreateActivity = async (activity: IActivity) => {
    await agent.Activities.create(activity)
    setActivities([...activities, activity])
    setSelectedActivity(activity)
    setEditMode(false)
  }

  const handleEditActivity = async (activity: IActivity) => {
    await agent.Activities.update(activity)
    setActivities([...activities.filter(act => act.id !== activity.id), activity])
    setSelectedActivity(activity)
    setEditMode(false)
  }

  const handleDeleteActivity = async (id: string) => {
    await agent.Activities.delete(id)
    setActivities([...activities.filter(act => act.id !== id)])
  }

  useEffect(() => {
    agent.Activities.list()
      .then(response => {
        let activities = response.reduce((accum: IActivity[], activity) => {
          activity.startDate = activity.startDate.split('.')[0]
          activity.endDate = activity.endDate.split('.')[0]
          accum.push(activity)
          return accum
        },[])
        setActivities(activities)
      }
      )
    }, [])

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm}/>
      <Container style={{marginTop: '5em'}}>
        <Header as='h2'>
          <Icon name='users' />
          <Header.Content>React ASP Net Boilerplate</Header.Content>
        </Header>

        <h3>By Roger Lester Palabasan</h3>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          setSelectedActivity={setSelectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
        />

      </Container>
    </Fragment>
  )
}

export default App;
