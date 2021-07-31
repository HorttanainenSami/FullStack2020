import React from 'react';
import { Formik, Field  } from 'formik';
import {  HealthCheckWithoutId, HealthCheckRating } from '../types';
import { Grid, Button } from 'semantic-ui-react';
import {NumberField, TextField} from '../AddPatientModal/FormField';

interface Props {
  onSubmit: (values: HealthCheckWithoutId) => void,
  onCancel: () => void,
}
const EntryForm = ({onSubmit, onCancel}: Props) => {
  return(
    <Formik
      enableReinitialize = {true}
      initialValues ={{
      type: 'HealthCheck',
      date:'',
      specialist:'',
      description: '',
      healthCheckRating: HealthCheckRating['LowRisk'] as HealthCheckRating,
      }}
      onSubmit={onSubmit}
    validate = {values => {
      const requiredError='Field is required';
      const errors: { [field:string]:string} = {};
      if(!values.healthCheckRating){
        errors.healthCheckRating = requiredError;
      }else if (values.healthCheckRating<0|| values.healthCheckRating>3){
        errors.healthCheckRating = 'value must be between 0 - 3';
      }
      if(!values.date || values.date.length === 0 || !/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(values.date)){
        errors.date = 'use correct format YYYY/MM/DD';
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
        <h1> Health Check </h1>
        <Field
          label="date"
          name="date"
          component={TextField}
          placeholder='YYYY/MM/DD'
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
        <Field
          label="healthCheckRating"
          name="healthCheckRating"
          component={NumberField}
          min={0}
          max={3}
          />
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
