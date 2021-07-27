import React from 'react';
import { FieldArray, Field, FieldProps, ErrorMessage} from "formik";
import { Form } from "semantic-ui-react";
import { Entry, DiagnosisCodes } from '../types';

interface TextFieldProps extends FieldProps {
  label: string,
  placeholder: string,
}
export const TextField = ({
  field,
  label,
  placeholder
}: TextFieldProps) => (
  <Form.Field>
    <label>{label}</label>
  <Field placeholder={placeholder} {...field}/>
  <div style={{ color:'red' }}>
    <ErrorMessage name={field.name} />
  </div>
  </Form.Field>
);
export type TypeOption= {
  value: Entry['type'];
  label: string;
};
interface SelectFieldProps {
  options: TypeOption[],
  label: string,
  name: string,
  onChange: (value:TypeOption[]) => void,
}
export const SelectField = ({
  options,
  label,
  name,
  onChange,
}:SelectFieldProps) =>(
  <Form.Field>
    <label>{label}</label>    
  <Field as='select' name={name} className='ui dropdown' onChange={onChange(options)}>
      {options.map(option => (
        <option key={option.label} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>

);

interface ArrayFieldProps {
  name: string,
  label: string,
}
export const ArrayField = ({
  name,
  label,
}: ArrayFieldProps) => (
  <Form.Field>
    <label> {label} </label>
    <FieldArray
      name={name}
      render={ arrayHelpers => {
        const list = arrayHelpers.form.values.diagnosisCodes as DiagnosisCodes;
        console.log(arrayHelpers); 
      return(
        <>
          {list.length !== 0 
          ?
            list.map((code, index) => {
              <>
                <label> {code} </label>
                  <button
                    onClick={()=> arrayHelpers.remove(index)}>
                remove
                </button>
              </>;
            })
            :
            <>
            <Field name={name} />
              <label>
                add new code
              </label>
            <button onClick={()=>arrayHelpers.push('')}> add </button>
                  
            </>
            
          }
        </>
      );
  }}/>
  </Form.Field> 
);
