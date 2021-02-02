import { connect } from "react-redux";
import React, { useEffect } from "react";
import Page from 'components/Page';
import {
  Button,
  Card,
  CardBody,
  Col,
  Row,
  NavLink as BSNavLink,
} from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import { MdAccountCircle } from "react-icons/md";
import { fetchAll } from "../actions/organizations";
import MaterialTable from 'material-table'

const status = [
  { id: 0, name: 'Active' },
  { id: 1, name: 'Archived' },
];

const OrganizationsPage = (props) => {

  useEffect(() => {
    props.fetchOrganizations();
  }, []);

  return (
    <Page
      className="DashboardPage"
      title="Organizations"
      breadcrumbs={[{ name: 'Organizations', active: true }]}
    >
      <Row>
        <Col xl={12} lg={12} md={12}>
          <Card>
            <CardBody>
              <Link to="/organization">
                <Button
                  variant="contained"
                  color="primary"
                  className=" float-right mr-1"
                >
                  <span style={{ textTransform: "capitalize" }}>Add Organization</span>
                </Button>
              </Link>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg="12" md="12" sm="12" xs="12">
          <MaterialTable
            columns={[
              { title: 'Organization Name', field: 'organizationname' },
              { title: 'Description', field: 'description' },
              { title: 'Status', field: 'status' },
              { title: 'Actions', field: 'actions' }
            ]}
            data={props.organizations.map((row) => ({
              organizationname: row.name,
              description: row.description,
              status: status.find(o => o.id === row.status).name,
              actions: (
                <BSNavLink
                  id={`profile${row.id}`}
                  tag={NavLink}
                  to={`/profile/${row.id}`}
                  activeClassName="active"
                  exact={true}
                >
                  <MdAccountCircle size="15" />{" "}
                  <span style={{ color: "#000" }}>View Organization</span>
                </BSNavLink>
              ),
            }))}
            title="Organizations"
          />
        </Col>
      </Row>
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