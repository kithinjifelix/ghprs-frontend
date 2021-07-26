import { connect } from "react-redux";
import { url } from "../api";
import React, { useEffect } from "react";
import Page from 'components/Page';
import {
  Card,
  CardHeader,
  CardBody,
  Col,
  Row,
} from 'reactstrap';
import { MdFileDownload } from "react-icons/md";
import { getByUser, getById } from "../actions/upload";
import MaterialTable from 'material-table'
import moment from 'moment';

const status = [
  { id: 0, name: 'Pending' },
  { id: 1, name: 'Approved' },
  { id: 2, name: 'Denied' },
  { id: 3, name: 'Over-Written' },
]

const SubmissionsPage = (props) => {

  useEffect(() => {
    props.fetchUploads();
  }, []);

  return (
    <Page
      className="DashboardPage"
    >
      <Row>
        <Col xl={12} lg={12} md={12}>
          <Card>
            <CardHeader>Submissions</CardHeader>
            <CardBody>
              Your filled out template submissions.
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
              { title: 'Submission Date', field: 'date' },
              { title: 'Period', field: 'period' },
              { title: 'Status', field: 'status' },
              { title: 'Comments', field: 'comments' },
              { title: 'Actions', field: 'actions' }
            ]}
            data={props.uploads.map((row) => ({
              name: row.name,
              user: row.user.userName,
              date: moment(row.createdAt).format('YYYY-MMM-DD'),
              period: `${moment(row.startDate).format('YYYY-MMM-DD') === '0001-Jan-01' ? '' : moment(row.startDate).format('YYYY-MMM-DD')} - ${moment(row.startDate).format('YYYY-MMM-DD') === '0001-Jan-01' ? '' : moment(row.endDate).format('YYYY-MMM-DD')}`,
              status: status.find(o => o.id === row.status).name,
              comments: row.comments,
              actions: (
                <div>
                  <a
                    href={`${url}uploads/download/${row.id}`} target="_blank" rel="noopener noreferrer"
                    id={`navItem-${row.name}-${row.id}`}
                  >
                    <MdFileDownload size="15" />{" "}
                    <span style={{ color: "#000" }}>Download</span>
                  </a>
                </div>
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
    uploads: state.uploads.list,
  };
};

const mapActionToProps = {
  fetchUploads: getByUser,
  getUpload: getById,
};

export default connect(mapStateToProps, mapActionToProps)(SubmissionsPage);
