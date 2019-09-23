import React, {useState, FormEvent, useContext, useEffect} from 'react'
import { Segment, Form, Button, Grid, FormGroup } from 'semantic-ui-react'
import { IActivityFormValues, ActivityFormValues } from '../../../app/models/activity'
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
import { combineDateAndTime } from '../../../app/utilities/tools/tool'

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

    const [activity, setActivity] = useState<IActivityFormValues>(new ActivityFormValues())

    useEffect(() => {
        const {activityId} = match.params
        if(activityId) {
            loadActivity(activityId).then(
                (activity) => {
                    console.log('loaded activity', activity)
                    setActivity(new ActivityFormValues(activity))
                }
            )
        }
    }, [
        loadActivity,
        match.params
    ])

    const handleFinalFormSubmit = (values: any) => {
        const startDateAndTime = combineDateAndTime(values.startDate, values.startTime)
        const endDateAndTime = combineDateAndTime(values.endDate, values.endTime)
        const {startDate, startTime, endDate, endTime, ...activity} = values
        activity.startDate = startDateAndTime
        activity.endDate = endDateAndTime
        console.log(activity)
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
                        initialValues={activity}
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
                                <FormGroup widths='equal'>
                                    <Field
                                        name='startDate'
                                        date={true}
                                        placeholder='Start Day'
                                        value={startDate}
                                        component={DateInput}/>
                                    <Field
                                        name='startTime'
                                        time={true}
                                        placeholder='Start Time'
                                        value={startDate}
                                        component={DateInput}/>
                                </FormGroup>
                                <FormGroup widths='equal'>
                                    <Field
                                        name='endDate'
                                        date={true}
                                        placeholder='End Day'
                                        value={endDate}
                                        component={DateInput}/>
                                    <Field
                                        name='endTime'
                                        time={true}
                                        placeholder='End Time'
                                        value={endDate}
                                        component={DateInput}/>
                                </FormGroup>
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
