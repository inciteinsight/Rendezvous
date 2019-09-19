import React, { useEffect, Fragment, useContext } from 'react';
import { Header, Icon, Container } from 'semantic-ui-react'
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import Loading from './Loading';
import ActivityStore from '../stores/activityStore';
import { observer } from 'mobx-react-lite';

const App = () => {

  const activityStore = useContext(ActivityStore)

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
        <ActivityDashboard/>
      </Container>
    </Fragment>
  )
}

export default observer(App);
