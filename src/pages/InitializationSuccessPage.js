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

const InitializationSuccessPage = (props) => {

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
              Template Initialized successfully
            </CardHeader>
            <CardBody>
            <CardText>
                Template initialized successfully. To access the Initialized templated head to the downloads section.
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

export default connect(mapStateToProps, mapActionToProps)(InitializationSuccessPage);
