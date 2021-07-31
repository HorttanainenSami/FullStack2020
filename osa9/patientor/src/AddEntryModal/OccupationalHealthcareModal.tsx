import React from 'react';
import { Formik, Field  } from 'formik';
import { OccupationalHealthcareWithoutId } from '../types';
import { Grid, Button } from 'semantic-ui-react';
import {TextField, DiagnosisSelection} from '../AddPatientModal/FormField';
import { useStateValue } from '../state';

interface Props {
  onSubmit: (values: OccupationalHealthcareWithoutId) => void,
  onCancel: () => void,
}
const OccupationalHealtCareForm = ({onSubmit, onCancel}: Props) => {
  const [{diagnoses}, ] = useStateValue();
  return(
    <Formik
      enableReinitialize = {true}
      initialValues ={{
        type:'OccupationalHealthcare', 
        date:'',
        specialist:'',
        description: '',
        employerName:'',
        diagnosisCodes:[],
        sickLeave:{
          startDate:'',
          endDate:''
        }}
      }
      onSubmit={onSubmit}
    validate = {values => {
      const requiredError='Field is required';
      const errors: { [field:string]:string|Record<string,unknown>} = {};
      const sickleaveErrors = {startDate:'', endDate:''};
      if(!values.employerName || values.employerName.length === 0){
        errors.employerName = requiredError;
      }
      if(!values.date || values.date.length === 0){
        errors.date = requiredError;
      }else if (!/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(values.date)){
        errors.date = 'use correct format YYYY/MM/DD';
      }
      
      if(!values.specialist || values.specialist.length === 0){
        errors.specialist = requiredError;
      }
      if(!values.description || values.description.length === 0){
        errors.description = requiredError;
      }
      if(!values.sickLeave?.startDate && values.sickLeave?.endDate){
        sickleaveErrors.startDate = requiredError;
        errors.sickLeave = sickleaveErrors;
      }
      if(values.sickLeave?.startDate && !values.sickLeave?.endDate){
        sickleaveErrors.endDate = requiredError;
        errors.sickLeave = sickleaveErrors;
      }
      if(values.sickLeave?.startDate && !/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(values.sickLeave.startDate)) {
        sickleaveErrors.startDate = 'use correct format YYYY/MM/DD';
        errors.sickLeave = sickleaveErrors;
      }
      if(values.sickLeave?.endDate && !/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(values.sickLeave.endDate)) {
        sickleaveErrors.endDate = 'use correct format YYYY/MM/DD';
        errors.sickLeave = sickleaveErrors;
      }
      return errors;
    }}
      >
    {({ dirty, isValid, handleSubmit,  setFieldValue, setFieldTouched }) => (
      
      <form onSubmit={handleSubmit}>
        <h1> Occupational Healthcare </h1>
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
        <DiagnosisSelection 
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
          diagnoses={diagnoses}
        />
        <Field
          label='Employer name'
          name='employerName'
          placeholder='Employer name'
          component={TextField}
        />
        <Field
          label="Sick date start"
          name="sickLeave.startDate"
          component={TextField}
          placeholder='YYYY/MM/DD'
        />
        <Field
          label="Sick date end"
          name="sickLeave.endDate"
          component={TextField}
          placeholder='YYYY/MM/DD'
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

export default OccupationalHealtCareForm;
