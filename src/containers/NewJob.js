import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";
import "./NewJob.css";

export default function NewJob() {
  const history = useHistory();
  const [job_id, setjob_id] = useState(Date.now().toString());
  const [job_location, setjob_location] = useState("");
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
      await createjob({ job_id, job_location, job_plumber, job_status });
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
        <FormGroup controlId="job_plumber">
          <ControlLabel>Job Plumber</ControlLabel>
          <FormControl value={job_plumber} onChange={e => setjob_plumber(e.target.value)} type="text" />
        </FormGroup>
        <FormGroup controlId="job_status">
          <ControlLabel>Job Status</ControlLabel>
          <FormControl value={job_status} onChange={e => setjob_status(e.target.value)} type="text" />
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