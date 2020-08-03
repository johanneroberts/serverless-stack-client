import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";
import "./NewJob.css";

export default function NewJob() {
  const history = useHistory();
  const [job_id, setjob_id] = useState('J' + Date.now().toString());
  const [job_location, setjob_location] = useState("");

  const [job_suburb, setjob_suburb] = useState("");
  const [job_town, setjob_town] = useState("");
  const [job_cfc, setjob_cfc] = useState("");
  const [job_ffc, setjob_ffc] = useState("");
  const [job_fault_date, setjob_fault_date] = useState("");
  const [job_plumber, setjob_plumber] = useState("");
  const [job_status, setjob_status] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return true;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await createjob({ job_id,
                        job_location,
                        job_suburb,
                        job_town,
                        job_cfc,
                        job_ffc,
                        job_fault_date,
                        job_plumber,
                        job_status });
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function createjob(job) {
    return API.post("jobcards", "/jobcards", {
      body: job
    });
  }

  return (
    <div className="NewJob">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="job_id">
          <ControlLabel>Job ID</ControlLabel>
          <FormControl disabled value={job_id} onChange={e => setjob_id(e.target.value)} type="text" />
        </FormGroup>
        <FormGroup controlId="job_location">
          <ControlLabel>Job Location</ControlLabel>
          <FormControl value={job_location} onChange={e => setjob_location(e.target.value)} type="text" />
        </FormGroup>
        <FormGroup controlId="job_suburb">
          <ControlLabel>Job Suburb</ControlLabel>
          <FormControl value={job_suburb} onChange={e => setjob_suburb(e.target.value)} type="text" />
        </FormGroup>
        <FormGroup controlId="job_town">
          <ControlLabel>Job Town</ControlLabel>
          <FormControl value={job_town} onChange={e => setjob_town(e.target.value)} type="text" />
        </FormGroup>
        <FormGroup controlId="job_cfc">
          <ControlLabel>Job CFC</ControlLabel>
          <FormControl value={job_cfc} onChange={e => setjob_cfc(e.target.value)} type="text" />
        </FormGroup>
        <FormGroup controlId="job_ffc">
          <ControlLabel>Job FFC</ControlLabel>
          <FormControl value={job_ffc} onChange={e => setjob_ffc(e.target.value)} type="text" />
        </FormGroup>
        <FormGroup controlId="job_fault_date">
          <ControlLabel>Job Fault Date</ControlLabel>
          <FormControl value={job_fault_date} onChange={e => setjob_fault_date(e.target.value)} type="datetime-local" />
        </FormGroup>
        <FormGroup controlId="job_plumber">
          <ControlLabel>Job Plumber</ControlLabel>
          <FormControl value={job_plumber} onChange={e => setjob_plumber(e.target.value)} type="text" />
        </FormGroup>
        <FormGroup controlId="job_status">
          <ControlLabel>Job Status</ControlLabel>
          <FormControl
            onChange={e => setjob_status(e.target.value)}
            componentClass="select">
            <option value="">select</option>
            <option value="logged">Logged</option>
            <option value="assigned">Assigned</option>
            <option value="inprogress">In Progress</option>
            <option value="completed">Completed</option>
          </FormControl>
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </form>
    </div>
  );
}