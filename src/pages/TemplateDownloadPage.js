import { connect } from "react-redux";
import React, { } from "react";
import Page from 'components/Page';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';

const TemplateDownloadPage = (props) => {

  return (
    <Page
      className="DashboardPage"
      title="Downloads"
      breadcrumbs={[{ name: 'Dashboard', active: true }]}
    >
      <Row>
        <Col lg="12" md="12" sm="12" xs="12">
          <Card>
            <CardHeader>
              Template Downloads
            </CardHeader>
            <CardBody>

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

export default connect(mapStateToProps, mapActionToProps)(TemplateDownloadPage);
