import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Jobcards.css";

export default function Jobcards() {
  const { id } = useParams();
  const history = useHistory();
  const [job, setJob] = useState(null);
  const [job_id, setJob_id] = useState("");
  const [job_location, setJob_location] = useState("");

  const [job_suburb, setJob_suburb] = useState("");
  const [job_town, setJob_town] = useState("");
  const [job_cfc, setJob_cfc] = useState("");
  const [job_ffc, setJob_ffc] = useState("");
  const [job_fault_date, setJob_fault_date] = useState("");

  const [job_plumber, setJob_plumber] = useState("");
  const [job_status, setJob_status] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadJob() {
      return API.get("jobcards", `/jobcards/${id}`);
    }

    async function onLoad() {
      try {

        const job = await loadJob();
        const { job_id,
                job_location,
                job_suburb,
                job_town,
                job_cfc,
                job_ffc,
                job_fault_date,
                job_plumber,
                job_status } = job;
        setJob_id(job_id);
        setJob_location(job_location);
        setJob_suburb(job_suburb);
        setJob_town(job_town);
        setJob_cfc(job_cfc)
        setJob_ffc(job_ffc);
        setJob_fault_date(job_fault_date);
        setJob_plumber(job_plumber);
        setJob_status(job_status);
        setJob(job);

      } catch (e) {
        debugger;
        onError(e);
      }
    }

    onLoad();
  }, [id]);

  function validateForm() {
    return true;
  }

  function saveJob(job) {
    return API.put("jobcards", `/jobcards/${id}`, {
      body: job
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      await saveJob({
        job_id:job_id || job.job_id,
        job_location: job_location || job.job_location,
        job_suburn: job_suburb || job.suburb,
        job_town: job_town || job.job_town,
        job_cfc: job_cfc || job.job_cfc,
        job_ffc: job_ffc || job.job_ffc,
        job_fault_date: job_fault_date || job.job_fault_date,
        job_plumber:job_plumber || job.job_plumber,
        job_status:job_status || job.job_status
      });
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function deleteJob() {
    return API.del("jobcards", `/jobcards/${id}`);
  }

  async function handleDelete(event) {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteJob();
      history.push("/");
    } catch (e) {
      onError(e);
      setIsDeleting(false);
    }
  }

  return (
    <div className="Jobs">
      {job && (
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="job_id">
            <ControlLabel>Job ID</ControlLabel>
            <FormControl
              value={job_id}
              disabled
              type="text"
              onChange={e => setJob_id(e.target.value)}
            />
            <ControlLabel>Job Location</ControlLabel>
            <FormControl
              value={job_location}
              type="text"
              onChange={e => setJob_location(e.target.value)}
            />
            <ControlLabel>Job Suburb</ControlLabel>
            <FormControl
              value={job_suburb}
              type="text"
              onChange={e => setJob_suburb(e.target.value)}
            />
            <ControlLabel>Job Town</ControlLabel>
            <FormControl
              value={job_town}
              type="text"
              onChange={e => setJob_town(e.target.value)}
            />
            <ControlLabel>Job CFC</ControlLabel>
            <FormControl
              value={job_cfc}
              type="text"
              onChange={e => setJob_cfc(e.target.value)}
            />
            <ControlLabel>Job ffc</ControlLabel>
            <FormControl
              value={job_ffc}
              type="text"
              onChange={e => setJob_ffc(e.target.value)}
            />
            <ControlLabel>Job Fault Date</ControlLabel>
            <FormControl
              value={job_fault_date}
              type="date"
              onChange={e => setJob_fault_date(e.target.value)}
            />
            <ControlLabel>Job Plumber</ControlLabel>
            <FormControl
              value={job_plumber}
              type="text"
              onChange={e => setJob_plumber(e.target.value)}
            />
            <ControlLabel>Job Status</ControlLabel>
            <FormControl
              value={job_status}
              type="text"
              onChange={e => setJob_status(e.target.value)}
            />
          </FormGroup>
          <LoaderButton
            block
            type="submit"
            bsSize="large"
            bsStyle="primary"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Save
          </LoaderButton>
          <LoaderButton
            block
            bsSize="large"
            bsStyle="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </LoaderButton>
        </form>
      )}
    </div>
  );
}