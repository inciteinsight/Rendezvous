import React, {useState, FormEvent, useContext, useEffect} from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import {v4 as uuid} from 'uuid';
import ActivityStore from '../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';

interface DetailParams {
    activityId: string
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {

    const activityStore = useContext(ActivityStore)
    const {
        createActivity,
        editActivity,
        submitting,
        loadActivity,
        clearActivity,
        activity: initialFormState
    } = activityStore

    const [activity, setActivity] = useState<IActivity>({
        id: '',
        title: '',
        category: '',
        description: '',
        startDate: '',
        endDate: '',
        city: '',
        venue: ''
    })

    useEffect(() => {
        const {activityId} = match.params
        if(activityId && activity.id.length === 0) {
            loadActivity(activityId).then(
                () => initialFormState && setActivity(initialFormState)
            )
        }
        return () => {
            clearActivity()
        }
    }, [
        loadActivity,
        clearActivity,
        match.params,
        initialFormState,
        activity.id.length
    ])

    const handleSubmmit = () => {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity).then(() => {
                history.push(`/activities/${newActivity.id}`)
            })
        }
        else {
            editActivity(activity).then(() => {
                history.push(`/activities/${activity.id}`)
            })
        }
    }

    const handleChange = (evt: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setActivity({...activity, [evt.currentTarget.name]: evt.currentTarget.value})
    }

    let {title, description, category, startDate, endDate, city, venue} = activity
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmmit}>
                <Form.Input
                    onChange={handleChange}
                    name='title'
                    placeholder='Title'
                    value={title}/>
                <Form.TextArea
                    onChange={handleChange}
                    rows={3}
                    name='description'
                    placeholder='Description'
                    value={description}/>
                <Form.Input
                    onChange={handleChange}
                    name='category'
                    placeholder='Category'
                    value={category}/>
                <Form.Input
                    onChange={handleChange}
                    type='datetime-local'
                    name='startDate'
                    placeholder='Start Date'
                    value={startDate}/>
                <Form.Input
                    onChange={handleChange}
                    type='datetime-local'
                    name='endDate'
                    placeholder='End Date'
                    value={endDate}/>
                <Form.Input
                    onChange={handleChange}
                    name='city'
                    placeholder='City'
                    value={city}/>
                <Form.Input
                    onChange={handleChange}
                    name='venue'
                    placeholder='Venue'
                    value={venue}/>
                <Button
                    loading={submitting}
                    floated='right'
                    positive type='submit'
                    content='Submit'/>
                <Button
                    floated='right'
                    type='button'
                    content='Cancel'
                    onClick={() => history.push('/activities')}/>
            </Form>
        </Segment>
    )
}

export default observer(ActivityForm)
