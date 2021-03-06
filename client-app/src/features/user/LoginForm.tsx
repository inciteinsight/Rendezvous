import React, { useContext } from 'react'
import {Form as FinalForm, Field} from 'react-final-form'
import { Form, Button, Header } from 'semantic-ui-react'
import TextInput from '../../app/utilities/form/TextInput'
import { RootStoreContext } from '../../app/stores/rootStore'
import { IUserFormValues } from '../../app/models/user'
import { FORM_ERROR } from 'final-form'
import {combineValidators, isRequired} from 'revalidate'
import ErrorMessage from '../../app/utilities/form/ErrorMessage'

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
                <Form onSubmit={handleSubmit} error>
                    <Header as='h2' content='Login to Rendezvous' color='teal' textAlign='center' />
                    <Field name='email' component={TextInput} placeholder='Email'/>
                    <Field name='password' component={TextInput} placeholder='Password' type='password'/>
                    <Button color='teal' loading={submitting} content='Login' disabled={(invalid && !dirtySinceLastSubmit) || pristine} fluid/>
                    <br/>
                    {submitError && !dirtySinceLastSubmit &&
                    <ErrorMessage error={submitError} text='Invalid email or password'/>}
                </Form>
            )}
            />
    )
}

export default LoginForm
