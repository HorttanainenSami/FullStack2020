import React from 'react';
import { Formik, Field  } from 'formik';
import { HospitalWithoutId } from '../types';
import { Grid, Button } from 'semantic-ui-react';
import { TextField, DiagnosisSelection} from '../AddPatientModal/FormField';
import { useStateValue } from '../state';

interface Props {
  onSubmit: (values: HospitalWithoutId) => void,
  onCancel: () => void,
}
const HospitalForm = ({onSubmit, onCancel}: Props) => {
  const [{diagnoses}, ] = useStateValue();
  return(
    <Formik
      initialValues ={{
        type:'Hospital',
        date:'',
        specialist:'',
        description: '',
        diagnosisCodes:[],
        discharge: {
          date:'',
          criteria:''
        },
      }}
      onSubmit={onSubmit}
    validate = {values => {
      const requiredError='Field is required';
      const errors: { [field:string]:string|Record<string, unknown>} = {};
      const dischargeErrors = {date:'', criteria:''};
      if(!values.diagnosisCodes || values.diagnosisCodes.length === 0){
        errors.diagnosisCodes = requiredError; 
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
      if(!values.discharge?.date){
        errors.discharge = requiredError;
      }else if(!/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(values.discharge?.date)){
        dischargeErrors.date= 'must be in YYYY/MM/DD form';
        errors.discharge = dischargeErrors;
      }
      if(!values.discharge?.criteria){
        dischargeErrors.criteria = requiredError;
        errors.discharge = dischargeErrors;
      }
      console.log(errors);
      return errors;
    }}
      >
    {({ dirty, isValid, handleSubmit,  setFieldValue, setFieldTouched }) => (
      <form onSubmit={handleSubmit}>
        <h1> Hospital </h1>
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
          label="date"
          name="discharge.date"
          component={TextField}
          placeholder='YYYY/MM/DD'
        />
        <Field
          label="criteria"
          name="discharge.criteria"
          component={TextField}
          placeholder='criteria'
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

export default HospitalForm;
