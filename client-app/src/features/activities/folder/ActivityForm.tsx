import React from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'

interface IProps {    
    setEditMode: (editMode: boolean) => void
}

const ActivityForm: React.FC<IProps> = ({setEditMode}) => {
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Title'/>
                <Form.TextArea rows={3} placeholder='Description'/>
                <Form.Input placeholder='Category'/>
                <Form.Input type='date' placeholder='Start Date'/>
                <Form.Input placeholder='End Date'/>
                <Form.Input placeholder='City'/>
                <Form.Input placeholder='Venue'/>
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
