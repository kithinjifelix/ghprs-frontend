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
import { MdEdit } from "react-icons/md";
import { fetchAll } from "../actions/links";
import MaterialTable from 'material-table'

const type = [
  { id: 0, name: 'Dashboard' },
  { id: 1, name: 'Report' },
  { id: 2, name: 'Table' },
  { id: 3, name: 'External' },
]

const LinksPage = (props) => {

  useEffect(() => {
    props.fetchLinks();
  }, []);

  return (
    <Page
      className="DashboardPage"
      title="Links"
      breadcrumbs={[{ name: 'Links', active: true }]}
    >
      <Row>
        <Col xl={12} lg={12} md={12}>
          <Card>
            <CardBody>
              <Link to="/add-link">
                <Button
                  variant="contained"
                  color="primary"
                  className=" float-right mr-1"
                >
                  <span style={{ textTransform: "capitalize" }}>Add Link</span>
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
              { title: 'Name', field: 'name' },
              { title: 'URL', field: 'url' },
              { title: 'Link Type', field: 'type' },
              { title: 'Actions', field: 'actions' }
            ]}
            data={props.links.map((row) => ({
              name: row.name,
              url: row.url,
              type: type.find(o => o.id === row.linkType).name,
              actions: (
                <BSNavLink
                  id={`profile${row.id}`}
                  tag={NavLink}
                  to={`/link/${row.id}`}
                  activeClassName="active"
                  exact={true}
                >
                  <MdEdit size="15" />{" "}
                  <span style={{ color: "#000" }}>Edit</span>
                </BSNavLink>
              ),
            }))}
            title="Links"
          />
        </Col>
      </Row>
    </Page>
  );
}

const mapStateToProps = (state) => {
  return {
    links: state.links.list,
  };
};

const mapActionToProps = {
  fetchLinks: fetchAll,
};

export default connect(mapStateToProps, mapActionToProps)(LinksPage);