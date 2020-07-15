import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";


export default function Home() {
  const [jobs, setJobs] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const jobs = await loadJobs();
        setJobs(jobs);
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function loadJobs() {
    return API.get("jobcards", "/jobcards");
  }

  function renderJobsList(jobs) {
    return [{}].concat(jobs).map((job, i) =>
      i !== 0 ? (
        <LinkContainer key={job.job_id} to={`/jobcards/${job.job_id}`}>
          <ListGroup>
            <ListGroupItem header="Job ID">
              {job.job_id}
            </ListGroupItem>
            <ListGroupItem header="Job Location">
              {job.job_location}
            </ListGroupItem>
            <ListGroupItem header="Job Pluber">
              {job.job_plumber}
            </ListGroupItem>
            <ListGroupItem header="Job Status">
              {job.job_status}
            </ListGroupItem>
          </ListGroup>
        </LinkContainer>
      ) : (
        <LinkContainer key="new" to="/jobcards/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new job
            </h4>
          </ListGroupItem>
        </LinkContainer>
      )
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Job Cards</h1>
        <p>A simple job card app</p>
      </div>
    );
  }

  function renderJobs() {
    return (
      <div className="jobs">
        <PageHeader>Your Jobs</PageHeader>
        <ListGroup>
          {!isLoading && renderJobsList(jobs)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderJobs() : renderLander()}
    </div>
  );
}