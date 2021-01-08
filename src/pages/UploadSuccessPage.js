import { connect } from "react-redux";
import React, { } from "react";
import Page from 'components/Page';
import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  Col,
  Row,
} from 'reactstrap';

const UploadSuccessPage = (props) => {

  return (
    <Page
      className="DashboardPage"
      title="Template"
      breadcrumbs={[{ name: 'Dashboard', active: true }]}
    >
      <Row>
        <Col lg="12" md="12" sm="12" xs="12">
          <Card>
            <CardHeader>
              File Uploaded successfully
            </CardHeader>
            <CardBody>
            <CardText>
               File was uploaded successfully and is being processed. Once done and approved the data will be available for viewing in the Dashboard page.
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
}

const mapStateToProps = (state) => {
  return {

  };
};

const mapActionToProps = {

};

export default connect(mapStateToProps, mapActionToProps)(UploadSuccessPage);
