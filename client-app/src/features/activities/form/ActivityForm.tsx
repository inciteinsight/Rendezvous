import React, {useState, FormEvent, useContext, useEffect} from 'react'
import { Segment, Form, Button, Grid } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import {v4 as uuid} from 'uuid'
import ActivityStore from '../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite'
import { RouteComponentProps } from 'react-router'
import {Form as FinalForm, Field} from 'react-final-form'
import TextInput from '../../../app/utilities/form/TextInput'
import TextAreaInput from '../../../app/utilities/form/TextAreaInput'
import SelectInput from '../../../app/utilities/form/SelectInput'
import {categoryOptions} from '../../../app/utilities/options/categoryOptions'
import DateInput from '../../../app/utilities/form/DateInput'

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
        startDate: null,
        endDate: null,
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

    // const handleSubmmit = () => {
    //     if (activity.id.length === 0) {
    //         let newActivity = {
    //             ...activity,
    //             id: uuid()
    //         }
    //         createActivity(newActivity).then(() => {
    //             history.push(`/activities/${newActivity.id}`)
    //         })
    //     }
    //     else {
    //         editActivity(activity).then(() => {
    //             history.push(`/activities/${activity.id}`)
    //         })
    //     }
    // }

    const handleFinalFormSubmit = (values: any) => {
        console.log(values)
    }

    const handleChange = (evt: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setActivity({...activity, [evt.currentTarget.name]: evt.currentTarget.value})
    }

    let {title, description, category, startDate, endDate, city, venue} = activity
    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm
                        onSubmit={handleFinalFormSubmit}
                        render={({handleSubmit}) => (
                            <Form onSubmit={handleSubmit}>
                                <Field
                                    name='title'
                                    placeholder='Title'
                                    value={title}
                                    component={TextInput}/>
                                <Field
                                    name='description'
                                    placeholder='Description'
                                    rows={3}
                                    value={description}
                                    component={TextAreaInput}/>
                                <Field
                                    name='category'
                                    options={categoryOptions}
                                    placeholder='Category'
                                    value={category}
                                    component={SelectInput}/>
                                <Field
                                    // type='datetime-local'
                                    name='startDate'
                                    placeholder='Start Date'
                                    value={startDate!}
                                    component={DateInput}/>
                                <Field
                                    // type='datetime-local'
                                    name='endDate'
                                    placeholder='End Date'
                                    value={endDate!}
                                    component={DateInput}/>
                                <Field
                                    name='city'
                                    placeholder='City'
                                    value={city}
                                    component={TextInput}/>
                                <Field
                                    name='venue'
                                    placeholder='Venue'
                                    value={venue}
                                    component={TextInput}/>
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
                        )
                    } />
                </Segment>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityForm)
