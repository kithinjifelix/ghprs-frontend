import React, { useEffect } from "react";
import { getAllFileUploads } from '../actions/upload';
import { connect } from 'react-redux';
import Page from '../components/Page';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import MaterialTable from 'material-table';
import moment from 'moment';

const FilesUploads = (props) => {
  useEffect(() => {
    props.fetchUploads();
  }, []);

  return (
    <Page className="DashboardPage">
      <Row>
        <Col xl={12} lg={12} md={12}>
          <Card>
            <CardHeader>Uploads</CardHeader>
            <CardBody>
              MER & Facility Data Uploads.
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg="12" md="12" sm="12" xs="12">
          <MaterialTable
            columns={[
              { title: 'Name', field: 'name' },
              { title: 'User', field: 'user' },
              { title: 'Upload Date', field: 'date' },
              { title: 'Status', field: 'status' },
              { title: 'Content Type', field: 'contentType' },
            ]}
            data={props.uploads.map((row) => ({
              name: row.name,
              user: row.user.userName,
              date: moment(row.createdAt).format('YYYY-MMM-DD'),
              status: row.status,
              contentType: row.contentType,
            }))}
            title="MER & Facility Data"
          />
        </Col>
      </Row>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    uploads: state.uploads.list,
  };
};

const mapActionToProps = {
  fetchUploads: getAllFileUploads,
};

export default connect(mapStateToProps, mapActionToProps)(FilesUploads);
