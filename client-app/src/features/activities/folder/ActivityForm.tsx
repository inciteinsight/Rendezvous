import React, {useState, FormEvent} from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'

interface IProps {    
    setEditMode: (editMode: boolean) => void
    activity: IActivity
}

const ActivityForm: React.FC<IProps> = ({setEditMode, activity: initialFormState}) => {

    const initializeForm = () => {
        if(initialFormState){
            return initialFormState
        }
        else {
            return {
                id: '',
                title: '',
                category: '',
                description: '',
                startDate: '',
                endDate: '',
                city: '',
                venue: ''
            }
        }
    }

    const [activity, setActivity] = useState<IActivity>(initializeForm)

    const handleSubmmit = () => {
        console.log(activity)
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
                    type='date'
                    name='startDate'
                    placeholder='Start Date'
                    value={startDate}/>
                <Form.Input
                    onChange={handleChange}
                    type='date'
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
                    floated='right'
                    positive type='submit'
                    content='Submit'/>
                <Button
                    floated='right'
                    type='button'
                    content='Cancel'
                    onClick={()=> setEditMode(false)}/>
            </Form>
        </Segment>
    )
}

export default ActivityForm
