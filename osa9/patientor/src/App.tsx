import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Diagnosis, Patient } from "./types";
import PatientPage from './PatientPage/PatientComponent';
import { setPatientList, setDiagnosisList } from './state/reducer';
import PatientListPage from "./PatientListPage";

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
    const fetchDiagnosisList = async() => {
      const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);

      dispatch(setDiagnosisList(diagnosisListFromApi));
    };

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList( patientListFromApi ));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchDiagnosisList();
    void fetchPatientList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path='/api/patients/:id'>
              <PatientPage /> 
            </Route>
            <Route path="/">
              <PatientListPage />
            </Route>
            
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
