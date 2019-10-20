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
    username: isRequired('username'),
    displayName: isRequired('display name'),
    password: isRequired('password')
})

const RegisterForm = () => {
    const rootStore = useContext(RootStoreContext)
    const { register } = rootStore.userStore
    return (
        <FinalForm
            onSubmit={(values: IUserFormValues) => register(values).catch(error => ({
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
                    <Header as='h2' content='Sign Up to Rendezvous' color='teal' textAlign='center' />
                    <Field name='username' component={TextInput} placeholder='Username'/>
                    <Field name='displayName' component={TextInput} placeholder='Display Name'/>
                    <Field name='email' component={TextInput} placeholder='Email'/>
                    <Field name='password' component={TextInput} placeholder='Password' type='password'/>
                    <Button color='teal' loading={submitting} content='Register' disabled={(invalid && !dirtySinceLastSubmit) || pristine} fluid/>
                    <br/>
                    {submitError && !dirtySinceLastSubmit &&
                    <ErrorMessage error={submitError}/>}
                </Form>
            )}
            />
    )
}

export default RegisterForm
