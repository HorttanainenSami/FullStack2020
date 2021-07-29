import React from 'react';
import { Field, useField } from "formik";
import { Form } from "semantic-ui-react";
import { Entry } from '../types';

export type TypeOption= {
  value: Entry['type'];
  label: string;
};
interface SelectFieldProps {
  options: TypeOption[],
  label: string,
  name: string,
  onChange: (value: TypeOption['value']) => void,
}
export const SelectField = ({
  options,
  label,
  name,
  onChange,
}:SelectFieldProps) =>{
  const [ ,meta , ] = useField(name);
  React.useEffect(() => {
    onChange(meta.value);
  },[meta.value]);
    return(
    <Form.Field>
      <label>{label}</label>    
    <Field as='select' name={name} className='ui dropdown' >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </Field>
    </Form.Field>
  );
};
