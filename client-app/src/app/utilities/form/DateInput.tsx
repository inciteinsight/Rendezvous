import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { FormFieldProps, Form, Label } from 'semantic-ui-react'
import { DateTimePicker } from 'react-widgets'

interface IProps
    extends FieldRenderProps<Date, HTMLInputElement>,
        FormFieldProps {}

const DateInput: React.FC<IProps> = ({
    input,
    width,
    placeholder,
    date = false,
    time = false,
    meta: {touched, error}},
    ...rest) => {
    if(!input.value) {
        input.value = new Date(Date.now())
    }
    return (
        <Form.Field error={touched && !!error} width={width}>
            <DateTimePicker
                placeholder={placeholder}
                value={new Date(input.value)}
                onChange={input.onChange}
                date={date}
                time={time}
                {...rest}/>
            {touched && error && (
                <Label basic color='red'>
                    {error}
                </Label>
            )}
        </Form.Field>
    )
}

export default DateInput
