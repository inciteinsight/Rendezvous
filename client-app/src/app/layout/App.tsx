import React, { useEffect, Fragment, useContext } from 'react';
import { Container } from 'semantic-ui-react'
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import Loading from './Loading';
import ActivityStore from '../stores/activityStore';
import { observer } from 'mobx-react-lite';
import { Route } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

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
        <Route exact path='/' component={HomePage}/>
        <Route path='/activities' component={ActivityDashboard}/>
        <Route path='/activities/:ActivityId' component={ActivityDetails}/>
        <Route path='/createActivity' component={ActivityForm}/>
      </Container>
    </Fragment>
  )
}

export default observer(App);
