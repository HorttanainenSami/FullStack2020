import React from 'react';
import { Formik, Field  } from 'formik';
import { EntryWithoutId } from '../types';
import { Grid, Button } from 'semantic-ui-react';
import {NumberField, TextField} from '../AddPatientModal/FormField';
import { TypeOption, SelectField } from './FormField';

const typeOptions: TypeOption[] = [
  { value: 'OccupationalHealthcare', label: 'OccupationalHealthcare'},
  {value: 'Hospital', label: 'Hospital'}, {value: 'HealthCheck', label: 'HealthCheck'}
];
interface Props {
  onSubmit: (values: EntryWithoutId) => void,
  onCancel: () => void,
}
const HealthCheck = () => (
  <Field
    label="healthCheckRating"
    name="healthCheckRating"
    component={NumberField}
    min={0}
    max={3}
    />
);
const EntryForm = ({onSubmit, onCancel}: Props) => {
  const [value, setValue] = React.useState(typeOptions[0].value);
  const onChange = (value:TypeOption['value']) => {
    setValue(value);
  };
  return(
    <Formik
      initialValues ={{
        type:'HealthCheck',
        date:'',
        specialist:'',
        description: '',
        healthCheckRating:5 ,
      }}
      onSubmit={onSubmit}
    validate = {values => {
      const requiredError='Field is required';
      const errors: { [field:string]:string} = {};
      switch(values.type){
        case 'OccupationalHealthcare':
          break;
        case 'HealthCheck':
          if( !values.healthCheckRating|| values.healthCheckRating<0|| values.healthCheckRating>3){
            errors.healthCheckRating = requiredError;
          }
          break;
        case 'Hospital':
          break;
      }
      if(!values.date || values.date.length === 0 || !/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(values.date)){
        errors.date = requiredError;
      }
      if(!values.specialist || values.specialist.length === 0){
        errors.specialist = requiredError;
      }
      if(!values.description || values.description.length === 0){
        errors.description = requiredError;
      }
      return errors;
    }}
      >
    {({ dirty, isValid, handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <SelectField
          label="type"
          options={typeOptions}
          name="type"
          onChange={onChange}
        />
        <Field
          label="date"
          name="date"
          component={TextField}
          placeholder='YYYY-MM-DD'
        />
        <Field
          label="specialist"
          name="specialist"
          component={TextField}
          placeholder='specialist'
        />
        <Field
          label="description"
          name="description"
          component={TextField}
          placeholder='description'
        />
        { value ==='HealthCheck' && <HealthCheck />}
        <Grid>
          <Grid.Column floated="left" width={5}>
            <Button type="button" onClick={onCancel} color="red">
              Cancel
            </Button>
          </Grid.Column>
          <Grid.Column floated="right" width={5}>
            <Button
              type="submit"
              floated="right"
              color="green"
              disabled={!dirty || !isValid}
            >
              Add
            </Button>
        </Grid.Column>
      </Grid>
    </form>
    )}
    </Formik>
  );
};

export default EntryForm;
