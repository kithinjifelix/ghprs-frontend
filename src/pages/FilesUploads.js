import React, { useEffect, useState } from "react";
import { getAllFileUploads } from '../actions/upload';
import { connect } from 'react-redux';
import Page from '../components/Page';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  Row,
  NavLink as BSNavLink,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import MaterialTable from 'material-table';
import { MdFileDownload, MdModeEdit, MdRemoveRedEye } from "react-icons/md";
import { url } from "../api";
import moment from 'moment';
import classnames from 'classnames';

let userId = 0;

const FilesUploads = (props) => {
  const [activeTab, setActiveTab] = useState(0);
  const [modal, setModal] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("Processing");

  useEffect(() => {
    props.fetchUploads(uploadStatus);
  }, []);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const toggleReview = (id) => {
    userId = id;
    setModal(!modal);
    if (!modal) {
      props.getUpload(id);
    }
  };

  const fetchData = (s) => {
    setUploadStatus(s)
    props.fetchUploads(s);
  };

  return (
    <Page className="DashboardPage">
      <Row>
        <Col xl={12} lg={12} md={12}>
          <Card>
            <CardHeader>Uploads</CardHeader>
            <CardBody>
              MER & (Facility and Community) Data Uploads.
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
          <Col lg="12" md="12" sm="12" xs="12">
            <Nav tabs>
              <NavItem>
                <BSNavLink
                  id="nav-details"
                  className={classnames({ active: activeTab === 0 })}
                  onClick={() => { toggle(0); fetchData("Processing"); }}
                >
                  Processing
                </BSNavLink>
              </NavItem>
              <NavItem>
                <BSNavLink
                  id="nav-details"
                  className={classnames({ active: activeTab === 1 })}
                  onClick={() => { toggle(1); fetchData("Completed"); }}
                >
                  Completed
                </BSNavLink>
              </NavItem>
              <NavItem>
                <BSNavLink
                  id="nav-details"
                  className={classnames({ active: activeTab === 2 })}
                  onClick={() => { toggle(2); fetchData("Error"); }}
                >
                  Error
                </BSNavLink>
              </NavItem>
              <NavItem>
                <BSNavLink
                  id="nav-details"
                  className={classnames({ active: activeTab === 3 })}
                  onClick={() => { toggle(3); fetchData("Overwritten"); }}
                >
                  Over-Written
                </BSNavLink>
              </NavItem>
            </Nav>
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
                contentType: row.contentType == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ? '.xlsx' : row.contentType
              }))}
              title="Data Submissions"
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
