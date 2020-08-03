import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import { useHistory } from "react-router-dom";
import "./Home.css";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const columns = [{
  dataField: 'job_id',
  text: 'Job ID',
  align: 'left'
}, {
  dataField: 'job_location',
  text: 'Job Location',
  align: 'left'
}, {
  dataField: 'job_suburb',
  text: 'Job Suburb',
  align: 'left'
}, {
  dataField: 'job_town',
  text: 'Job Town',
  align: 'left'
}, {
  dataField: 'job_cfc',
  text: 'Job CFC',
  align: 'left'
}, {
  dataField: 'job_ffc',
  text: 'Job FFC',
  align: 'left'
}, {
  dataField: 'job_fault_date',
  text: 'Job Fault Date',
  align: 'left'
}, {
  dataField: 'job_plumber',
  text: 'Job Plumber',
  align: 'left'
}, {
  dataField: 'job_status',
  text: 'Job Status',
  align: 'left'
}];

export default function Home() {
  const history = useHistory();
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
    const rowEvents = {
      onClick: (e, row, rowIndex) => {
        history.push(`/jobcards/${row.job_id}`);
      }
    };

    return (
      <div>
        <LinkContainer key="new" to="/jobcards/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new job
            </h4>
          </ListGroupItem>
        </LinkContainer>
        <BootstrapTable keyField='job_id' data={ jobs } columns={ columns } striped={true} hover={true} search={true} rowEvents={ rowEvents } />
      </div>
    )
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Job Cards</h1>
        <p>A simple Job Card app</p>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
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