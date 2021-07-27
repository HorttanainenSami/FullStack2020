import React from 'react';
import { Field, Form, Formik} from 'formik';
import { Grid, Button } from 'semantic-ui-react';
import { EntryWithoutId } from '../types';
import { ArrayField, TypeOption, SelectField, TextField } from './FormField';

const assertNever = (values: never): never => {
  throw new Error(`unhandled discriminated union member: ${JSON.stringify(values)}`);
};
interface Props {
  onSubmit: (values: EntryWithoutId) => void,
  onCancel: () => void,
}

const typeOptions: TypeOption[] = [
  { value: 'OccupationalHealthcare', label: 'OccupationalHealthcare'},
  {value: 'Hospital', label: 'Hospital'}, {value: 'HealthCheck', label: 'HealthCheck'}
];
const OccupationalForm = () => (
  <>
    <Field
      label='Employer name'
      placeholder='Employer name'
      name='Name'
      component={TextField}
    />
    <ArrayField name='asd'
      label='asd'
     />
  </>
);
const HospitalForm = () => (
  <div> Hospital </div> 
);
const HealthCheckForm = () => (
  <div> HealthCheck </div> 
);

const EntryForm = ({onSubmit, onCancel}: Props) => {
  const [show, setShow] = React.useState<string>('OccupationalHealthcare');
  const onChange = (entry: any) => {
    //eslint-disable-next-line
    const selected = entry.target.options.selectedIndex;
    //eslint-disable-next-line
    setShow(typeOptions[selected].label);
  };
  return(
    <Formik
      initialValues={{
          type : 'OccupationalHealthcare', 
          date: '',
          specialist:'',
          description:'',
          employerName:'',
          diagnosisCodes:[]||undefined,
          sickLeave: {startDate:'', endDate:''}||undefined,
      }||{
          type: 'Hospital',
          date: '',
          specialist:'',
          description:'',
          diagnosisCodes:[],
          discharge: {date:'', criteria:''},
      }||{
          type: 'Hospital',
          date: '',
          specialist:'',
          description:'',
          healthCheckRating:'',
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        switch(values.type){
          case 'OccupationalHealthcare':
            if(!values.employerName) {
              errors.employerName = requiredError;
            }
            break;
          case 'Hospital':
            if(!values.diagnosisCodes){
              errors.diagnosisCodes = requiredError;
            }
            if(!values.discharge){
              errors.discharge = requiredError;
            }
            break;
          case 'HealthCheck':
            if(!values.healthCheckRating){
              errors.healthCheckRating = requiredError;
            }
            break;
          default:
            assertNever(values);
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label='Date'
              placeholder='MM/DD/YYYY'
              name='Date'
              component={TextField}
            />
            <Field
              label='Specilist'
              placeholder='eg. Dr. House'
              name='Specialist'
              component={TextField}
            />
            <Field
              label='Description'
              placeholder='Describe entry'
              name='Description'
              component={TextField}
            />
            <SelectField
              label="Type"
              options={typeOptions}
              name="Type"
              onChange={() =>onChange}
            />

          { show === 'Hospital' && <HospitalForm />}        
          { show === 'HealthCheck' && <HealthCheckForm />}
          { show === 'OccupationalHealthcare' && <OccupationalForm />}
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
          </Form>
        );
      }}
    </Formik>
  );
};

export default EntryForm;
