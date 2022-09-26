import { connect } from "react-redux";
import React, { useEffect, useState } from 'react';
import Page from 'components/Page';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  NavLink as BSNavLink,
} from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import { MdAccountCircle, MdDelete, MdAdd, MdArrowBack } from "react-icons/md";
import { fetchAll } from "../actions/organizations";
import MaterialTable from 'material-table'
import axios from "axios";
import { url } from "../api";
import { toast } from "react-toastify";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';


const status = [
  { id: 0, name: 'Active' },
  { id: 1, name: 'Archived' },
];

const OrganizationsPage = (props) => {
  const [open, setOpen] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [orgId, setOrgId] = useState();
  useEffect(() => {
    props.fetchOrganizations();
  }, []);

  function updateOrgunit(orgId) {
    try {
      axios.delete(`${url}organizations/` + orgId)
        .then((response) => {
          toast.success("User " + orgName + " Successfully DeActivated.");
          setTimeout(() => {
            props.fetchOrganizations();
          }, 2500);
        });
    } catch (e) {
      toast.error("Could not delete Organisation Unit.");
    }
  };

  const handleClickOpen = (org) => {
    setOrgId(org.id);
    setOrgName(org.name);
    setOpen(true);
  };

  const handleClose = (answer) => {
    if (answer === "Yes") {
      updateOrgunit(orgId);
    }
    setOpen(false);
  };


  return (
    <Page
      className="DashboardPage"
    >
      <Row>
        <Col xl={12} lg={12} md={12}>
          <Card>
            <CardHeader>
              Organizations
              <Link to="/administration">
            <Button
              variant="contained"
              color="link"
              className=" float-right mr-1"
            >
              <MdArrowBack size="15" />{" "}
              <span style={{ textTransform: "capitalize" }}>Back</span>
            </Button>
          </Link>
            </CardHeader>
            <CardBody>
              Manage organizations/partners who have access to the system.
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg="12" md="12" sm="12" xs="12">
          <MaterialTable
            columns={[
              { title: 'Name', field: 'organizationname' },
              { title: 'Short Name', field: 'shortName' },
              { title: 'Description', field: 'description' },
              { title: 'Status', field: 'status' },
              { title: 'Actions', field: 'actions' }
            ]}
            data={props.organizations.map((row) => ({
              organizationname: row.name,
              shortName: row.shortName,
              description: row.description,
              status: status.find(o => o.id === row.status).name,
              actions: (
                <>
                  <BSNavLink
                    id={`organization${row.id}`}
                    tag={NavLink}
                    to={`/organization/${row.id}`}
                    activeClassName="active"
                    exact={true}
                  >
                    <MdAccountCircle size="15" />{" "}
                    <span style={{ color: "#000" }}>View</span>
                  </BSNavLink>
                  <Button
                    color="link"
                    onClick={() => handleClickOpen(row)}
                    id={row.id}
                    name={row.name}
                  >
                    <MdDelete size="15" />{" "}
                    <span style={{ color: "#000" }}  >Delete</span>
                  </Button>
                </>
              ),
            }))}
            title={<Link to="/organization">
            <Button
              variant="contained"
              color="link"
              className=" float-right mr-1"
            >
              <MdAdd size="15" />{" "}
              <span style={{ textTransform: "capitalize" }}>Add Organization</span>
            </Button>
          </Link>}
          />
        </Col>
      </Row>
      <Dialog
        open={open}
        onClose={() => handleClose("No")}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Organization</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete {orgName}?.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose("No")} color="primary">
            No
          </Button>
          <Button onClick={() => handleClose("Yes")} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Page>
  );
}

const mapStateToProps = (state) => {
  return {
    organizations: state.organizations.list,
  };
};

const mapActionToProps = {
  fetchOrganizations: fetchAll,
};

export default connect(mapStateToProps, mapActionToProps)(OrganizationsPage);
