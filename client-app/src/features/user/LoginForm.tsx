import React, { useContext } from 'react'
import {Form as FinalForm, Field} from 'react-final-form'
import { Form, Button, Label } from 'semantic-ui-react'
import TextInput from '../../app/utilities/form/TextInput'
import { RootStoreContext } from '../../app/stores/rootStore'
import { IUserFormValues } from '../../app/models/user'
import { FORM_ERROR } from 'final-form'
import {combineValidators, isRequired} from 'revalidate'

const validate = combineValidators({
    email: isRequired('email'),
    password: isRequired('password')
})

const LoginForm = () => {
    const rootStore = useContext(RootStoreContext)
    const { login } = rootStore.userStore
    return (
        <FinalForm
            onSubmit={(values: IUserFormValues) => login(values).catch(error => ({
                [FORM_ERROR]: error
            }))}
            validate={validate}
            render={({
                handleSubmit,
                submitting,
                submitError,
                invalid,
                pristine,
                dirtySinceLastSubmit
            }) => (
                <Form onSubmit={handleSubmit}>
                    <Field name='email' component={TextInput} placeholder='Email'/>
                    <Field name='password' component={TextInput} placeholder='Password' type='password'/>
                    <Button positive loading={submitting} content='Login' disabled={(invalid && !dirtySinceLastSubmit) || pristine}/>
                    <br/>
                    {submitError && !dirtySinceLastSubmit &&
                    <Label color='red' basic content={submitError.statusText} />}
                </Form>
            )}
            />
    )
}

export default LoginForm
