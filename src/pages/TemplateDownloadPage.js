import { connect } from "react-redux";
import { url } from "../api";
import React, { useEffect } from "react";
import Page from 'components/Page';
import {
  Col,
  Row,
} from 'reactstrap';
import { MdFileDownload } from "react-icons/md";
import { fetchAll } from "../actions/template";
import MaterialTable from 'material-table'

const TemplateDownloadPage = (props) => {

  useEffect(() => {
    props.fetchTemplates();
  }, []);

  return (
    <Page
      className="DashboardPage"
      title="Downloads"
      breadcrumbs={[{ name: 'Dashboard', active: true }]}
    >
      <Row>
        <Col lg="12" md="12" sm="12" xs="12">
          <MaterialTable
            columns={[
              { title: 'Name', field: 'name' },
              { title: 'Description', field: 'description' },
              { title: 'Actions', field: 'actions' }
            ]}
            data={props.templates.map((row) => ({
              name: row.name,
              description: row.description,
              actions: (
                <a
                  href={`${url}templates/download/${row.id}`} target="_blank" rel="noopener noreferrer"
                  id={`navItem-${row.name}-${row.id}`}
                >
                  <MdFileDownload size="15" />{" "}
                  <span style={{ color: "#000" }}>Download</span>
                </a>
              ),
            }))}
            title="Users"
          />
        </Col>
      </Row>
    </Page>
  );
}

const mapStateToProps = (state) => {
  return {
    templates: state.templates.list,
  };
};

const mapActionToProps = {
  fetchTemplates: fetchAll,
};

export default connect(mapStateToProps, mapActionToProps)(TemplateDownloadPage);
